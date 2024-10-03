namespace Application;

public class Bot
{
    public const string NAME = "Singe-O'-Matix=>4DaW1N";

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

        // On doit trouver la position des ennemis | les ennemis ont des personnalités différentes : C'est quoi les différences ?
        // On doit savoir où sont les murs | on peut se déplacer à une position bien précise, comment l'utiliser
        // On doit connaitre les espaces libres autour de nous
        // Connaitre le chemin le plus court pour arriver à un ennemi? Je sais pas si sa peut être utile
        // On doit pouvoir savoir si un ennemi est en vie ou pas    

        return nextMoves;
    }
}
