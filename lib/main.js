const DiddyMainTemplate = require('./main.template');
const DiddyStylesTemplate = require('./main.styles.template');
const SaitoOverlay = require('./../../../lib/saito/ui/saito-overlay/saito-overlay');

class DiddyMain {

  constructor(app, mod) {

    this.app = app;
    this.mod = mod;

    this.score = 0;
    this.level = 0;
    this.energy = 0;
    this.onCooldown = false;

  }

  render() {

    if (document.querySelector('.main-container')) {
      this.app.browser.replaceElementBySelector(DiddyMainTemplate(), '.main-container');
      this.app.browser.replaceElementBySelector(DiddyStylesTemplate(), '.main-styles-container');
    } else {
      this.app.browser.addElementToDom(DiddyMainTemplate());
      this.app.browser.addElementToDom(DiddyStylesTemplate());
    }

    try {
      document.querySelector(".text-number").innerHTML = this.mod.diddy.count;
    } catch (err) {}

    this.attachEvents();
    this.checkCooldown();
  }

  attachEvents() {
    let coinbtn = document.querySelector(".currency");
    if (coinbtn) { coinbtn.onclick = (e) => { this.clickCoinButton(); } }
  }

  async clickCoinButton() {
    console.log("Coin button clicked!");

    // Locate the score element
    let obj = document.querySelector(".text-number");
    if (obj) { 
        // Increment the score
        let count = parseInt(obj.innerHTML) + 1;
        obj.innerHTML = count;

        // Save updated count
        this.mod.diddy.count = count;
        this.mod.save();

        // For every 20 clicks, propagate a transaction
        if (count % 20 === 0) { 
            let newtx = await this.mod.createClickTransaction();
            this.app.network.propagateTransaction(newtx);
            console.log("Transaction propagated for every 20 clicks.");
        }
    }
  }

  checkCooldown() {
    const cooldownTimestamp = localStorage.getItem("cooldownTimestamp");
    if (cooldownTimestamp) {
      const currentTime = Date.now();
      if (currentTime - cooldownTimestamp < COOLDOWN_DURATION) {
        this.onCooldown = true;
        document.getElementById("energy").innerText = "Cooldown active";
      } else {
        // Cooldown has expired
        this.onCooldown = false;
        localStorage.removeItem("cooldownTimestamp");
        this.energy = 0;
        document.getElementById("energy").innerText = "0 / 1,000,000";
      }
    }
  }

  increaseScore() {

    if (this.onCooldown) {
      alert("Cooldown active! Try again in 24 hours.");
      return;
    }

    // Add pop animation class
    const characterImage = document.getElementById("character-image");
    characterImage.classList.add("pop-animation");

    // Remove pop animation class after animation ends
    setTimeout(() => {
      characterImage.classList.remove("pop-animation");
    }, 200); // Match the duration of the CSS animation

    this.score += 9999;
    this.energy += 9999;

    document.getElementById('score').innerText = this.score;
    document.getElementById('energy').innerText = this.energy + ' / 1,000,000';

    // Check if the score or energy has reached 1 million
    if (this.score >= (this.level + 1) * 1000000) {
      this.level++;
      document.getElementById('level').innerText = 'Level ' + this.level;
    }

    if (this.energy >= 1000000) {

      this.onCooldown = true;
      document.getElementById('energy').innerText = "Cooldown active";

      // Set cooldown timestamp in localStorage
      localStorage.setItem("cooldownTimestamp", Date.now());

      setTimeout(() => {
        this.onCooldown = false;
        this.energy = 0;
        document.getElementById('energy').innerText = "0 / 1,000,000";
        localStorage.removeItem("cooldownTimestamp"); // Remove cooldown after 24 hours
      }, COOLDOWN_DURATION); // 24 hours
    }
  }

}

module.exports = DiddyMain;
