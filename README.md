# JS Discord Assignment

This project is a demonstration of the Discord.js library for COMP2068, JS Frameworks. See a hosted version at [https://discordassignment.onrender.com/](https://discordassignment.onrender.com/)

Render's free hosting speed leaves something to be desired, and the server will spin-down with inactivity. If the page load seems slow, please allow a minute for the server to spin back up. Subsequent requests should be faster.

## Installation

1. Clone this repository in a location of your choosing
2. Open a terminal in that location and run "npm install"
3. Create a .env file in the directory, and add the following keys:
    - DISCORD_TOKEN
    - DISCORD_CLIENT
    - DISCORD_CHANNEL_ID
    - OPENAI_API_KEY
    - CONNECTION_STRING_MONGODB
    (The last two are optional, and can be ignored if you do not intend to use the scheduling or AI response features)
4. Run the project with "nodemon"

## Usage

There are a few different functions demonstrated with this project, mapped to various urls. They can be navigated using the menu at the top level url. 

### Chat

The chat function serves to demonstrate some of the various functions available in Discord.js. You can:
- Send a message from the bot account.
- View past messages

The chat window also allows you to monitor chat activity in the Discord server to which the bot belongs. 

### Schedule a message

Allows you to schedule a message for the bot to send at some regular interval. Demonstrates the message-sending functionality, as well as providing a simple use-case for this application beyond merely making a bot.

### View Scheduled Messages

Allows you to view, edit, or delete existing scheduled messages.

## Bot Responses

In addition to the functions above accessed through the menu, there are background functions running to demonstrate some other bot functionality. These include an auto-response from the bot when a message is sent, another auto-response when a user reacts to a cached message, and lastly and AI chat function that makes use of the OpenAI API. All messages (sent by users, not bots) that begin with "Prompt" are interpreted as an AI prompt and passed to a GPT, before the response is returned and sent to the chat by the bot.

This code cannot be demonstrated with the hosted example, as this bot is configured not to respond to it's own messages. I recommend using your own API key and adding your implementation of the bot to a Discord server of your own to test this feature.

For example:

> "Prompt: Tell me a fact about penguins"

Will return a GPT response:

> "Penguins have a special gland near their tails that helps them excrete excess salt from the seawater they drink."