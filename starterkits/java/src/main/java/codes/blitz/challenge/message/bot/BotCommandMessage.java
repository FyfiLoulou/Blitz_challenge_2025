package codes.blitz.challenge.message.bot;

import codes.blitz.challenge.generated.Action;
import codes.blitz.challenge.message.MessageType;
import java.util.List;

public record BotCommandMessage(MessageType type, Number tick, List<Action> actions) {
  public BotCommandMessage(Number tick, List<Action> actions) {
    this(MessageType.COMMAND, tick, actions);
  }
}
