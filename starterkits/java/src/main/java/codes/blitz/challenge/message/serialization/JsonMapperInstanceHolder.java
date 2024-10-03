/*
 * Copyright (c) Coveo Solutions Inc.
 */
package codes.blitz.challenge.bot.message.serialization;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.json.JsonMapper;

public final class JsonMapperInstanceHolder {
  private static JsonMapper instance;

  public static synchronized JsonMapper getInstance() {
    if (instance == null) {
      instance =
          JsonMapper.builder()
              .serializationInclusion(JsonInclude.Include.NON_NULL)
              .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
              .build();
    }
    return instance;
  }
}
