namespace Application;

public static class Application
{
    public static async Task Main()
    {
        var cts = new CancellationTokenSource();
        Console.CancelKeyPress += (_, e) =>
        {
            e.Cancel = true;
            cts.Cancel();
        };

        await GameClient.RunAsync(Bot.NAME, cts.Token);
    }
}
