package codes.blitz.challenge.generated;


public record MoveToAction(ActionType type, Position position) implements Action {
  public MoveToAction(Position position) {
    this(ActionType.MOVE_TO, position);
  }
}
