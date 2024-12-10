# **Telegram Encryption Bot 🚀**
This is a Telegram bot written in Node.js that supports 20 encryption methods. It allows users to encode and encrypt text using various algorithms and techniques directly through Telegram commands.

# **📌 Key Commands and Their Functionalities**
Here’s a list of the bot's commands along with a brief explanation of what they do:

# **🛠️ Core Commands**
/start
Welcomes the user and provides guidance on how to use the bot.

# **/help**
Lists all available commands with a description of each encryption method. This is the primary reference command for new users.

# **🔒 Encryption Methods**
# **/base64 <text>**
Encodes text into Base64 format, a commonly used encoding scheme for transferring data.

# **/base64url <text>**
Similar to Base64, but safe for URLs and file names by avoiding characters like + and /.

# **/md5 <text>**
Generates an MD5 hash of the input text, widely used for checksums and data integrity verification.

# **/sha256 <text>**
Produces a SHA256 hash, offering a higher level of cryptographic security than MD5.

# **/sha512 <text>**
Outputs a SHA512 hash for even greater cryptographic security.

/# **aes256 <text>**
Encrypts text using AES-256, one of the most secure encryption standards.
🔑 Default key: secretkey1234567.

🧩 Transformations and Fun
# **/caesar13 <text>**
Applies a Caesar cipher with a shift of 13, shifting each letter to the 13th position.

# **/rot13 <text>**
Similar to the Caesar cipher but specifically shifts letters by 13 positions.

# **/reverse <text>**
Reverses the input text. For example, "Hello" becomes "olleH".

# **/hex <text>**
Encodes text into hexadecimal format.

# **/binary <text>**
Converts text into binary representation.

# **/atbash <text>**
Implements the Atbash cipher, which mirrors the alphabet (e.g., "A" becomes "Z").

# **/morse <text>**
Converts text into Morse code. For example, "SOS" becomes ... --- ....

# **/url <text>**
Encodes text into URL-safe format using encodeURIComponent.

# **/vigenere <text>**
Encrypts text using the Vigenère cipher with a default key of KEY.

# **/railFence <text>**
Applies the Rail Fence cipher, commonly used for transposition encoding.

# **/leet <text>**
Converts text into leet speak. For example, "elite" becomes 3l1t3.

🚀 How to Use the Bot
Installation and Setup
To run this project locally:

Clone this repository:

bash
Copy code
git clone https://github.com/your-username/telegram-encryption-bot.git
Navigate to the project folder:

bash
Copy code
cd telegram-encryption-bot
Install the required dependencies:

bash
Copy code
npm install

