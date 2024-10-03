namespace Application;

public class Bot
{
    public const string NAME = "My cool C# bot";

    /// <summary>
    /// This method should be use to initialize some variables you will need throughout the game.
    /// </summary>
    public Bot()
    {
        Console.WriteLine("Initializing your super mega bot!");
    }

    /// <summary>
    /// Here is where the magic happens, for now the moves are random. I bet you can do better ;)
    /// </summary>
    public IEnumerable<Action> GetNextMoves(TeamGameState gameMessage)
    {
        Action[] possibleActions =
        [
            new MoveUpAction(),
            new MoveRightAction(),
            new MoveDownAction(),
            new MoveLeftAction(),
        ];

        // You can clearly do better than the random actions above. Have fun!!
        var nextMoves = Random.Shared.GetItems(possibleActions, 1);

        return nextMoves;
    }
}
