using System.Buffers;
using System.Net.WebSockets;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Application;

public class GameClient
{
    // An instance of the Bot class used to generate game moves
    private readonly Bot _bot;
    // Options for JSON serialization/deserialization
    private readonly JsonSerializerOptions _jsonSerializerOptions;

    // Main entry point for the game client
    public static async Task RunAsync(string name, CancellationToken cancellationToken = default)
    {
        // Create a new GameClient instance and start the game client
        await new GameClient().StartGameClientAsync(name, cancellationToken: cancellationToken);
    }

    // Constructor for GameClient
    private GameClient()
    {
        // Initialize the bot and JSON serializer options
        _bot = new Bot();
        _jsonSerializerOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            PropertyNameCaseInsensitive = true,
            Converters = { new JsonStringEnumMemberConverter() },
        };
    }

    // Method to start the game client
    private async Task StartGameClientAsync(
        string name,
        string address = "127.0.0.1:8765",
        CancellationToken cancellationToken = default
    )
    {
        // Create a new WebSocket client
        using var webSocket = new ClientWebSocket();
        var serverUri = new Uri($"ws://{address}");
        await webSocket.ConnectAsync(serverUri, cancellationToken);

        // Register the bot with the game server
        var token = Environment.GetEnvironmentVariable("TOKEN");
        var registerPayload =
            token == null
                ? JsonSerializer.SerializeToUtf8Bytes(new { type = "REGISTER", teamName = name })
                : JsonSerializer.SerializeToUtf8Bytes(new { type = "REGISTER", token });

        // Send the registration payload to the server
        await webSocket.SendAsync(
            registerPayload,
            WebSocketMessageType.Text,
            true,
            cancellationToken
        );

        // Main loop to handle game messages and send commands
        while (webSocket.State == WebSocketState.Open)
        {
            var gameMessage = await ReadGameMessageAsync(webSocket, cancellationToken);

            // Check if the game message is null and continue if it is
            if (gameMessage == null)
            {
                continue;
            }

            // Log the current tick number
            Console.WriteLine($"Playing tick '{gameMessage.CurrentTickNumber}'.");

            // Initialize an empty list of actions
            var actions = Enumerable.Empty<Action>();

            // Just so your bot doesn't completely crash. ;)
            try
            {
                // Get the next moves from the bot
                actions = _bot.GetNextMoves(gameMessage);
            }
            catch (Exception exception)
            {
                // Log any exceptions that occur while getting the next moves
                Console.WriteLine($"Exception while getting next moves:\n{exception}");
            }

            // Serialize the actions to JSON
            var serializedCommand = JsonSerializer.SerializeToUtf8Bytes(
                new
                {
                    type = "COMMAND",
                    actions = actions,
                    tick = gameMessage.CurrentTickNumber,
                },
                _jsonSerializerOptions
            );

            // Send the serialized command to the server
            await webSocket.SendAsync(
                serializedCommand,
                WebSocketMessageType.Text,
                true,
                cancellationToken
            );
        }
    }

    // Method to read a game message from the WebSocket client
    private async Task<TeamGameState?> ReadGameMessageAsync(
        WebSocket client,
        CancellationToken cancellationToken = default
    )
    {
        // Create a new MemoryStream to store the received data
        using var memoryStream = new MemoryStream();
        // Rent a buffer from the shared array pool
        var buffer = ArrayPool<byte>.Shared.Rent(1024);
        WebSocketReceiveResult receiveResult;
        do
        {
            // Receive data from the WebSocket client
            receiveResult = await client.ReceiveAsync(buffer, cancellationToken);
            // Write the received data to the MemoryStream
            memoryStream.Write(buffer, 0, receiveResult.Count);
        } while (!receiveResult.EndOfMessage);

        // Return the rented buffer to the shared array pool
        ArrayPool<byte>.Shared.Return(buffer);

        // Check if the memory stream is empty
        if (memoryStream.Length == 0)
        {
            // Return null if the memory stream is empty
            return null;
        }

        // Reset the position of the memory stream to the start
        memoryStream.Position = 0;

        // Deserialize the TeamGameState object from the memory stream
        return JsonSerializer.Deserialize<TeamGameState>(memoryStream, _jsonSerializerOptions);
    }
}
