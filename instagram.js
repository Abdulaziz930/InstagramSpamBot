const puppeteer = require("puppeteer");

class Instagram {
  static get #baseUrl() {
    return "https://www.instagram.com/";
  }

  static get #dmUrl() {
    return "https://www.instagram.com/direct/inbox/";
  }

  #browser = null;
  #page = null;

  initialize = async () => {
    this.#browser = await puppeteer.launch({
      headless: false,
    });

    this.#page = await this.#browser.newPage();

    await this.#page.goto(Instagram.#baseUrl, { waitUntil: "networkidle2" });
  };

  login = async (username, password) => {
    await this.#page.goto(Instagram.#baseUrl, { waitUntil: "networkidle2" });

    await this.#page.type("input[name='username']", username, {
      delay: 50,
    });
    await this.#page.type("input[name='password']", password, {
      delay: 50,
    });

    if (password.length < 6)
      throw new Error("password must be 6 characters or more");

    await this.#page.click("button[type='submit']");

    await this.#page.waitForTimeout(15000);
    await this.#page.waitForSelector("a[href='/direct/inbox/']");
  };

  searchUser = async (user) => {
    await this.#page.goto(Instagram.#dmUrl, { waitUntil: "networkidle2" });
    await this.#page.waitForTimeout(5000);
    let notNowBtn = await this.#page.$x(
      '//button[contains(text(), "Not Now")]'
    );
    await notNowBtn[0].click();
    await this.#page.waitForTimeout(1500);

    await this.#page.click("._aa4m._aa4p button[type='button']");
    await this.#page.waitForTimeout(1500);

    await this.#page.type("input[name='queryBox']", user, {
      delay: 50,
    });
    await this.#page.waitForTimeout(5500);
    let userBox = await this.#page.$x(
      "//div/div/div/div/div[2]/div/div/div[1]/div/div[2]/div/div/div/div/div[2]/div/div[2]/div[2]/div[1]"
    );
    await userBox[0].click();

    await this.#page.waitForTimeout(2500);
    let nextBtn = await this.#page.$x('//button/div[contains(text(), "Next")]');
    nextBtn[0].click();
  };

  sendMessage = async (message, count) => {
    await this.#page.waitForTimeout(5000);

    while (parseInt(count) > 0) {
      await this.#page.type("textarea:not([aria-hidden])", message, {
        delay: 50,
      });
      await this.#page.waitForTimeout(1500);
      let sendBtn = await this.#page.$x('//button[contains(text(), "Send")]');
      sendBtn[0].click();
      count--;
      await this.#page.waitForTimeout(2500);
    }
  };

  close = async () => {
    await this.#page.waitForTimeout(1500);
    await this.#browser.close();
  };
}

module.exports = new Instagram();
