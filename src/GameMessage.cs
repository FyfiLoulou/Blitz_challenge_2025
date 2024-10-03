using System.Text.Json.Serialization;

namespace Application;

/// <summary>
/// Represents the current state of the game for a team.
/// </summary>
/// <param name="Type">The type of the game state.</param>
/// <param name="Tick">The current tick of the game.</param>
/// <param name="CurrentTickNumber">The current tick number.</param>
/// <param name="LastTickErrors">An array of errors from the last tick.</param>
/// <param name="Constants">Game constants.</param>
/// <param name="YourCharacter">Information about the player's character.</param>
/// <param name="Threats">An array of threats in the game.</param>
/// <param name="Map">The game map.</param>
public record TeamGameState(
    string Type,
    int Tick,
    int CurrentTickNumber,
    string[] LastTickErrors,
    Constants Constants,
    YourCharacter YourCharacter,
    Threat[] Threats,
    GameMap Map
);

/// <summary>
/// Represents the constants used in the game.
/// </summary>
public record Constants();

/// <summary>
/// Represents a threat in the game.
/// </summary>
/// <param name="Position">The position of the threat.</param>
/// <param name="Direction">The direction the threat is facing or moving.</param>
/// <param name="Personality">The personality type of the threat.</param>
/// <param name="Style">The style or behavior of the threat.</param>
public record Threat(Position Position, string Direction, string Personality, string Style);

/// <summary>
/// Represents the player's character in the game.
/// </summary>
/// <param name="Id">The unique identifier of the character.</param>
/// <param name="TeamId">The identifier of the team the character belongs to.</param>
/// <param name="Position">The current position of the character.</param>
/// <param name="Alive">Indicates whether the character is alive.</param>
/// <param name="SpawnPoint">The spawn point of the character.</param>
/// <param name="Distances">A 2D array representing distances to various points.</param>
public record YourCharacter(
    string Id,
    string TeamId,
    Position Position,
    bool Alive,
    Position SpawnPoint,
    int?[][] Distances
);

/// <summary>
/// Represents the game map.
/// </summary>
/// <param name="Width">The width of the map.</param>
/// <param name="Height">The height of the map.</param>
/// <param name="Tiles">A 2D array representing the tiles of the map.</param>
public record GameMap(int Width, int Height, TileType[][] Tiles);

/// <summary>
/// Represents a position on the game map.
/// </summary>
/// <param name="X">The X coordinate.</param>
/// <param name="Y">The Y coordinate.</param>
public record Position(int X, int Y);

/// <summary>
/// Represents the types of tiles in the game map.
/// </summary>
[JsonConverter(typeof(JsonStringEnumMemberConverter))]
public enum TileType
{
    /// <summary>
    /// Represents an empty tile.
    /// </summary>
    [JsonPropertyName("EMPTY")]
    Empty,

    /// <summary>
    /// Represents a wall tile.
    /// </summary>
    [JsonPropertyName("WALL")]
    Wall,
}

/// <summary>
/// Base class for all actions in the game.
/// </summary>
/// <param name="type">The type of the action.</param>
[JsonDerivedType(typeof(MoveLeftAction))]
[JsonDerivedType(typeof(MoveRightAction))]
[JsonDerivedType(typeof(MoveUpAction))]
[JsonDerivedType(typeof(MoveDownAction))]
[JsonDerivedType(typeof(MoveToAction))]
public abstract record Action(ActionType type);

/// <summary>
/// Represents the types of actions available in the game.
/// </summary>
[JsonConverter(typeof(JsonStringEnumMemberConverter))]
public enum ActionType
{
    /// <summary>
    /// Move the character to the left.
    /// </summary>
    [JsonPropertyName("MOVE_LEFT")]
    MoveLeft,

    /// <summary>
    /// Move the character to the right.
    /// </summary>
    [JsonPropertyName("MOVE_RIGHT")]
    MoveRight,

    /// <summary>
    /// Move the character upwards.
    /// </summary>
    [JsonPropertyName("MOVE_UP")]
    MoveUp,

    /// <summary>
    /// Move the character downwards.
    /// </summary>
    [JsonPropertyName("MOVE_DOWN")]
    MoveDown,

    /// <summary>
    /// Move the character to a specific position.
    /// </summary>
    [JsonPropertyName("MOVE_TO")]
    MoveTo,
}

/// <summary>
/// Represents an action to move the character to the left.
/// </summary>
public record MoveLeftAction() : Action(ActionType.MoveLeft);

/// <summary>
/// Represents an action to move the character to the right.
/// </summary>
public record MoveRightAction() : Action(ActionType.MoveRight);

/// <summary>
/// Represents an action to move the character upwards.
/// </summary>
public record MoveUpAction() : Action(ActionType.MoveUp);

/// <summary>
/// Represents an action to move the character downwards.
/// </summary>
public record MoveDownAction() : Action(ActionType.MoveDown);

/// <summary>
/// Represents an action to move the character to a specific position.
/// </summary>
/// <param name="Position">The target position to move to.</param>
public record MoveToAction(Position Position) : Action(ActionType.MoveTo);
