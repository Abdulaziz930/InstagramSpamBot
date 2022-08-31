# InstagramSpamBot

## Installation
```bash
git clone https://github.com/Abdulaziz930/InstagramSpamBot.git
```

```cpp
npm install or npm i
```

## Configuration

1. Create a `.env` file
2. Add these lines to the `.env` file  
   IG_USERNAME='YOUR_USERNAME'<br>
   IG_PASSWORD='YOUR_PASSWORD'

## Usage

In `index.js` file

Replace 'USERNAME_TO_SEARCH' with the username of the account you will spamming.

```js
await ig.searchUser("USERNAME_TO_SEARCH");
```

Replace 'MESSAGE_CONTENT_TO_BE_SENT' with the message you will send and also replace 'NUMBER_OF_MESSAGE_TO_BE_SENT' with the message count you will send

```js
await ig.sendMessage(
  "MESSAGE_CONTENT_TO_BE_SENT",
  "NUMBER_OF_MESSAGE_TO_BE_SENT"
);
```

## Run

1. open terminal
2. cd InstagramSpamBot

And run the following command

```
npm run spam
```
