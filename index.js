const dotenv = require("dotenv");
dotenv.config();
const ig = require("./instagram");

(async () => {
  await ig.initialize();

  await ig.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

  await ig.searchUser("USERNAME_TO_SEARCH");

  await ig.sendMessage(
    "MESSAGE_CONTENT_TO_BE_SENT",
    "NUMBER_OF_MESSAGE_TO_BE_SENT"
  );

  await ig.close();
})();
