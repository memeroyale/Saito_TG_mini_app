const DiddyMainTemplate = require('./main.template');
const DiddyStylesTemplate = require('./main.styles.template');
const SaitoOverlay = require('./../../../lib/saito/ui/saito-overlay/saito-overlay');

class DiddyMain {
  constructor(app, mod) {
    this.app = app;
    this.mod = mod;

    this.level = 0; // Tracks the player's level
    this.energy = 100; // Starting energy
    this.maxEnergy = 100;
    this.rechargeRate = 2000; // Initial recharge rate in milliseconds
    this.rechargeInterval = null;
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
      // Update count from diddy.js
      document.querySelector(".text-number").innerHTML = this.mod.diddy.count;

      // Update level from diddy.js
      const levelElement = document.getElementById('level');
      if (levelElement) {
        levelElement.innerHTML = `Level ${this.mod.diddy.level}`;
      }

      // Update energy (non-persistent)
      document.getElementById('energy').innerText = `${this.energy} / ${this.maxEnergy}`;
    } catch (err) {
      console.error("Error updating UI:", err);
    }

    this.attachEvents();
    this.startRecharge(); // Begin energy recharge
  }

  attachEvents() {
    const characterImage = document.getElementById("character-image");
    if (characterImage) {
      characterImage.onclick = () => this.clickCoinButton();
    }

    // Add an event listener for the new image button
    document.addEventListener('DOMContentLoaded', () => {
      let imageButton = document.getElementById('image-button');
      if (imageButton) {
        imageButton.onclick = () => {
          console.log("Image button clicked!");
          alert("Button clicked!");
          // Add your custom logic here
        };
      }
    });
  }

  async clickCoinButton() {
    console.log("Coin button clicked!");

    if (this.energy <= 0) {
      console.log("No energy left! Please wait for recharge.");
      alert("No energy left! Wait for recharge.");
      return;
    }

    this.mod.diddy.count += 1; // Increment the centralized count
    this.energy -= 1; // Decrease energy
    this.mod.recalculateState(); // Recalculate level in diddy.js

    // Update the count and level in the UI
    document.querySelector(".text-number").innerHTML = this.mod.diddy.count;

    const levelElement = document.getElementById('level');
    if (levelElement) {
      levelElement.innerHTML = `Level ${this.mod.diddy.level}`;
    }

    // Update energy in the UI
    document.getElementById('energy').innerText = `${this.energy} / ${this.maxEnergy}`;

    // Save updated count and level to backend
    this.mod.save();

    // Create and propagate a transaction every 20 clicks
    if (this.mod.diddy.count % 20 === 0) {
      const newtx = await this.mod.createClickTransaction();
      this.app.network.propagateTransaction(newtx);
      console.log("Transaction propagated for every 20 clicks.");
    }
  }

  updateUI() {
    // Update count in the UI
    document.querySelector('.text-number').innerText = this.mod.diddy.count;

    // Update level in the UI
    const levelElement = document.getElementById('level');
    if (levelElement) {
      levelElement.innerHTML = `Level ${this.mod.diddy.level}`;
    }

    // Update energy in the UI
    document.getElementById('energy').innerText = `${this.energy} / ${this.maxEnergy}`;

    // Update the energy bar dynamically
    const energyFill = document.getElementById('energy-fill');
    if (energyFill) {
      energyFill.style.width = (this.energy / this.maxEnergy) * 100 + '%';
    }
  }

  startRecharge() {
    if (this.rechargeInterval) {
      clearInterval(this.rechargeInterval); // Clear existing interval if any
    }

    this.rechargeInterval = setInterval(() => {
      if (this.energy < this.maxEnergy) {
        this.energy += 1;
        this.updateUI();
        console.log(`Recharging... Energy: ${this.energy}`);
      }
    }, this.rechargeRate);
  }

  stopRecharge() {
    if (this.rechargeInterval) {
      clearInterval(this.rechargeInterval);
      this.rechargeInterval = null;
    }
  }
}

module.exports = DiddyMain;
