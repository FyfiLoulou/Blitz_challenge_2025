package codes.blitz.challenge.message.serialization;

import codes.blitz.challenge.bot.message.serialization.JsonMapperInstanceHolder;
import codes.blitz.challenge.generated.TeamGameState;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.json.JsonMapper;
import jakarta.websocket.DecodeException;
import jakarta.websocket.Decoder;

public class MessageDecoder implements Decoder.Text<TeamGameState> {
  private static final JsonMapper jsonMapper = JsonMapperInstanceHolder.getInstance();

  @Override
  public TeamGameState decode(String message) throws DecodeException {
    try {
      return jsonMapper.readValue(message, TeamGameState.class);
    } catch (JsonProcessingException e) {
      throw new DecodeException(message, e.getMessage(), e);
    }
  }

  @Override
  public boolean willDecode(String s) {
    return (s != null);
  }
}
