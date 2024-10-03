/*
 * Copyright (c) Coveo Solutions Inc.
 */
package codes.blitz.challenge.message.bot;

import codes.blitz.challenge.message.MessageType;

public record BotRegistrationWithToken(MessageType type, String token) {
  public BotRegistrationWithToken(String token) {
    this(MessageType.REGISTER, token);
  }
}
