package codes.blitz.challenge.bot;

import codes.blitz.challenge.generated.Action;
import codes.blitz.challenge.generated.MoveDownAction;
import codes.blitz.challenge.generated.MoveLeftAction;
import codes.blitz.challenge.generated.MoveRightAction;
import codes.blitz.challenge.generated.MoveUpAction;
import codes.blitz.challenge.generated.TeamGameState;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Bot {
  Random random = new Random();

  public Bot() {
    System.out.println("Initializing your super duper mega bot.");
  }

  /*
   * Here is where the magic happens. I bet you can do better ;)
   */
  public List<Action> getActions(TeamGameState gameMessage) {
    List<Action> actions = new ArrayList<>();

    List<Action> possibleActions =
        List.of(
            new MoveUpAction(), new MoveRightAction(), new MoveDownAction(), new MoveLeftAction());

    Action randomlyPickedAction = possibleActions.get(random.nextInt(possibleActions.size()));
    actions.add(randomlyPickedAction);

    // You can clearly do better than the random actions above. Have fun!!
    return actions;
  }
}
