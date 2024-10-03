using System.Text.Json.Serialization;

namespace Application;

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

public record Constants();

public record Threat(Position Position, string Direction, string Personality, string Style);

public record YourCharacter(
    string Id,
    string TeamId,
    Position Position,
    bool Alive,
    Position SpawnPoint,
    int?[][] Distances
);

public record GameMap(int Width, int Height, TileType[][] Tiles);

public record Position(int X, int Y);

[JsonConverter(typeof(JsonStringEnumMemberConverter))]
public enum TileType
{
    [JsonPropertyName("EMPTY")]
    Empty,

    [JsonPropertyName("WALL")]
    Wall,
}

[JsonDerivedType(typeof(MoveLeftAction))]
[JsonDerivedType(typeof(MoveRightAction))]
[JsonDerivedType(typeof(MoveUpAction))]
[JsonDerivedType(typeof(MoveDownAction))]
[JsonDerivedType(typeof(MoveToAction))]
public abstract record Action(ActionType type);

[JsonConverter(typeof(JsonStringEnumMemberConverter))]
public enum ActionType
{
    [JsonPropertyName("MOVE_LEFT")]
    MoveLeft,

    [JsonPropertyName("MOVE_RIGHT")]
    MoveRight,

    [JsonPropertyName("MOVE_UP")]
    MoveUp,

    [JsonPropertyName("MOVE_DOWN")]
    MoveDown,

    [JsonPropertyName("MOVE_TO")]
    MoveTo,
}

public record MoveLeftAction() : Action(ActionType.MoveLeft);

public record MoveRightAction() : Action(ActionType.MoveRight);

public record MoveUpAction() : Action(ActionType.MoveUp);

public record MoveDownAction() : Action(ActionType.MoveDown);

public record MoveToAction(Position Position) : Action(ActionType.MoveTo);
