package codes.blitz.challenge.generated;


public record MoveLeftAction(ActionType type) implements Action {
  public MoveLeftAction() {
    this(ActionType.MOVE_LEFT);
  }
}
