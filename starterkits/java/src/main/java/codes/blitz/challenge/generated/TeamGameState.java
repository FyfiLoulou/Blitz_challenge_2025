package codes.blitz.challenge.generated;

import java.util.List;

public record TeamGameState(
    String type,
    int tick,
    int currentTickNumber,
    List<String> lastTickErrors,
    Constants constants,
    YourCharacter yourCharacter,
    List<Threat> threats,
    GameMap map) {}
