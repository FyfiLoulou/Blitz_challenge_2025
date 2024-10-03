/*
 * Copyright (c) Coveo Solutions Inc.
 */
package codes.blitz.challenge.message.bot;

import codes.blitz.challenge.message.MessageType;

public record BotRegistrationWithoutToken(MessageType type, String teamName) {
  public BotRegistrationWithoutToken(String teamName) {
    this(MessageType.REGISTER, teamName);
  }
}
