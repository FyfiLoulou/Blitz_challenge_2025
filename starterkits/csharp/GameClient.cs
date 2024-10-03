using System.Buffers;
using System.Net.WebSockets;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Application;

public class GameClient
{
    private readonly Bot _bot;
    private readonly JsonSerializerOptions _jsonSerializerOptions;

    public static async Task RunAsync(string name, CancellationToken cancellationToken = default)
    {
        await new GameClient().StartGameClientAsync(name, cancellationToken: cancellationToken);
    }

    private GameClient()
    {
        _bot = new Bot();
        _jsonSerializerOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            PropertyNameCaseInsensitive = true,
            Converters = { new JsonStringEnumMemberConverter() },
        };
    }

    private async Task StartGameClientAsync(
        string name,
        string address = "127.0.0.1:8765",
        CancellationToken cancellationToken = default
    )
    {
        using var webSocket = new ClientWebSocket();
        var serverUri = new Uri($"ws://{address}");
        await webSocket.ConnectAsync(serverUri, cancellationToken);

        var token = Environment.GetEnvironmentVariable("TOKEN");
        var registerPayload =
            token == null
                ? JsonSerializer.SerializeToUtf8Bytes(new { type = "REGISTER", teamName = name })
                : JsonSerializer.SerializeToUtf8Bytes(new { type = "REGISTER", token });

        await webSocket.SendAsync(
            registerPayload,
            WebSocketMessageType.Text,
            true,
            cancellationToken
        );

        while (webSocket.State == WebSocketState.Open)
        {
            var gameMessage = await ReadGameMessageAsync(webSocket, cancellationToken);

            if (gameMessage == null)
            {
                continue;
            }

            Console.WriteLine($"Playing tick '{gameMessage.CurrentTickNumber}'.");
            var actions = Enumerable.Empty<Action>();

            // Just so your bot doesn't completely crash. ;)
            try
            {
                actions = _bot.GetNextMoves(gameMessage);
            }
            catch (Exception exception)
            {
                Console.WriteLine($"Exception while getting next moves:\n{exception}");
            }

            var serializedCommand = JsonSerializer.SerializeToUtf8Bytes(
                new
                {
                    type = "COMMAND",
                    actions = actions,
                    tick = gameMessage.CurrentTickNumber,
                },
                _jsonSerializerOptions
            );

            await webSocket.SendAsync(
                serializedCommand,
                WebSocketMessageType.Text,
                true,
                cancellationToken
            );
        }
    }

    private async Task<TeamGameState?> ReadGameMessageAsync(
        WebSocket client,
        CancellationToken cancellationToken = default
    )
    {
        using var memoryStream = new MemoryStream();
        var buffer = ArrayPool<byte>.Shared.Rent(1024);
        WebSocketReceiveResult receiveResult;
        do
        {
            receiveResult = await client.ReceiveAsync(buffer, cancellationToken);
            memoryStream.Write(buffer, 0, receiveResult.Count);
        } while (!receiveResult.EndOfMessage);

        ArrayPool<byte>.Shared.Return(buffer);

        if (memoryStream.Length == 0)
        {
            return null;
        }

        memoryStream.Position = 0;

        return JsonSerializer.Deserialize<TeamGameState>(memoryStream, _jsonSerializerOptions);
    }
}
