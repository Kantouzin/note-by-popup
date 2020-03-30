import { parse } from 'url';
import browser from 'webextension-polyfill';

class Main {
  constructor(url) {
    this.textarea = document.getElementById("textarea");
    this.button = document.getElementById("button");
    this.url = url;
  }

  static async init() {
    const url = await browser.tabs.query({'active': true, 'lastFocusedWindow': true})
      .then(result => {
        return result[0].url;
      })
      .then(result => {
        return parse(result)["hostname"];
      });
    return new Main(url);
  }

  execute() {
    this.loadText(textarea);
    this.button.addEventListener("click", this.saveText.bind(this));
  }

  async loadText() {
    const text = await browser.storage.local.get(this.url)
      .then(result => {
        return Object.values(result)[0]
      });

    if (!text) {
      return;
    }

    this.textarea.value = text;
  }

  async saveText() {
    const text = this.textarea.value;
    await browser.storage.local.set({[this.url]: text});
  }
}

(async () => {
  const main = await Main.init();
  main.execute();
})();
