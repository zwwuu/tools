import zxcvbn from "zxcvbn";

import { CHARACTERS, Options } from "~/app/t/password-generator/data";

self.onmessage = (message: MessageEvent<{ options: { [key in Options]: boolean }; length: number }>) => {
  const { options, length } = message.data;
  let password = "";
  let charPool = "";

  if (options.includeLowercase) {
    password += CHARACTERS.lowercase[Math.floor(Math.random() * CHARACTERS.lowercase.length)];
    charPool += CHARACTERS.lowercase;
  }
  if (options.includeUppercase) {
    password += CHARACTERS.uppercase[Math.floor(Math.random() * CHARACTERS.uppercase.length)];
    charPool += CHARACTERS.uppercase;
  }
  if (options.includeNumber) {
    password += CHARACTERS.number[Math.floor(Math.random() * CHARACTERS.number.length)];
    charPool += CHARACTERS.number;
  }
  if (options.includeSymbol) {
    password += CHARACTERS.symbol[Math.floor(Math.random() * CHARACTERS.symbol.length)];
    charPool += CHARACTERS.symbol;
  }

  if (charPool.length > 0) {
    for (let i = password.length; i < length; i++) {
      password += charPool[Math.floor(Math.random() * charPool.length)];
    }

    password = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  }

  const strength = zxcvbn(password);
  postMessage({
    value: password,
    score: strength.score,
    crackTimes: strength.crack_times_display.offline_slow_hashing_1e4_per_second.toString(),
  });
};

export {};
