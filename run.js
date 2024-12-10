const TelegramBot = require('node-telegram-bot-api');
const crypto = require('crypto');
const base64url = require('base64url');

const BOT_TOKEN = "YOUR_BOT_TOKEN";
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

const encryptions = {
  base64: (text) => Buffer.from(text).toString('base64'),
  base64url: (text) => base64url.encode(text),
  md5: (text) => crypto.createHash('md5').update(text).digest('hex'),
  sha256: (text) => crypto.createHash('sha256').update(text).digest('hex'),
  sha512: (text) => crypto.createHash('sha512').update(text).digest('hex'),
  caesar13: (text) =>
    text.replace(/[a-zA-Z]/g, (char) =>
      String.fromCharCode(
        char.charCodeAt(0) + (char.toLowerCase() < "n" ? 13 : -13)
      )
    ),
  reverse: (text) => text.split('').reverse().join(''),
  rot13: (text) =>
    text.replace(/[a-zA-Z]/g, (char) =>
      String.fromCharCode(
        char.charCodeAt(0) + (char.toLowerCase() < 'n' ? 13 : -13)
      )
    ),
  hex: (text) => Buffer.from(text).toString('hex'),
  binary: (text) =>
    text
      .split('')
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(' '),
  atbash: (text) =>
    text.replace(/[a-zA-Z]/g, (char) =>
      String.fromCharCode(
        char >= 'a' ? 219 - char.charCodeAt(0) : 155 - char.charCodeAt(0)
      )
    ),
  morse: (text) => {
    const morseCode = {
      a: '.-', b: '-...', c: '-.-.', d: '-..', e: '.', f: '..-.',
      g: '--.', h: '....', i: '..', j: '.---', k: '-.-', l: '.-..',
      m: '--', n: '-.', o: '---', p: '.--.', q: '--.-', r: '.-.',
      s: '...', t: '-', u: '..-', v: '...-', w: '.--', x: '-..-',
      y: '-.--', z: '--..', '1': '.----', '2': '..---', '3': '...--',
      '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
      '9': '----.', '0': '-----', ' ': '/'
    };
    return text
      .toLowerCase()
      .split('')
      .map((char) => morseCode[char] || char)
      .join(' ');
  },
  url: (text) => encodeURIComponent(text),
  vigenere: (text, key = 'KEY') => {
    let result = '';
    for (let i = 0, j = 0; i < text.length; i++) {
      const c = text.charCodeAt(i);
      if (c >= 65 && c <= 90) {
        result += String.fromCharCode(((c - 65 + key.charCodeAt(j % key.length) - 65) % 26) + 65);
        j++;
      } else if (c >= 97 && c <= 122) {
        result += String.fromCharCode(((c - 97 + key.charCodeAt(j % key.length) - 65) % 26) + 97);
        j++;
      } else {
        result += text[i];
      }
    }
    return result;
  },
  railFence: (text, rails = 3) => {
    const fence = [...Array(rails)].map(() => []);
    let rail = 0;
    let direction = 1;
    for (const char of text) {
      fence[rail].push(char);
      rail += direction;
      if (rail === 0 || rail === rails - 1) direction *= -1;
    }
    return fence.flat().join('');
  },
  aes256: (text, key = 'secretkey1234567') => {
    const cipher = crypto.createCipheriv('aes-256-cbc', crypto.scryptSync(key, 'salt', 32), Buffer.alloc(16, 0));
    return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
  },
  leet: (text) =>
    text.replace(/[aegiost]/g, (char) =>
      ({ a: '4', e: '3', g: '6', i: '1', o: '0', s: '5', t: '7' }[char])
    ),
};

Object.keys(encryptions).forEach((method) => {
  bot.onText(new RegExp(`/${method} (.+)`), (msg, match) => {
    const chatId = msg.chat.id;
    const input = match[1];
    try {
      const result = encryptions[method](input);
      bot.sendMessage(chatId, `Encrypted (${method}):\n${result}`);
    } catch (err) {
      bot.sendMessage(chatId, `Error: ${err.message}`);
    }
  });
});

// Help command
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const commandDescriptions = `
Available commands:
- /base64 <text>: Encode text in Base64
- /base64url <text>: Encode text in Base64 URL format
- /md5 <text>: Generate MD5 hash
- /sha256 <text>: Generate SHA256 hash
- /sha512 <text>: Generate SHA512 hash
- /caesar13 <text>: Apply Caesar cipher with a shift of 13
- /reverse <text>: Reverse the text
- /rot13 <text>: Apply ROT13 cipher
- /hex <text>: Encode text in hexadecimal format
- /binary <text>: Convert text to binary
- /atbash <text>: Apply Atbash cipher
- /morse <text>: Encode text in Morse code
- /url <text>: URL encode text
- /vigenere <text>: Encode using Vigenère cipher
- /railFence <text>: Encode using Rail Fence cipher
- /aes256 <text>: Encrypt with AES-256
- /leet <text>: Convert text to leetspeak
  `;
  bot.sendMessage(chatId, commandDescriptions);
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Welcome! Type /help to see available commands.");
});

console.log('Bot is running!');
