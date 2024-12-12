const DiddyMainTemplate = require('./main.template');
const DiddyStylesTemplate = require('./main.styles.template');
const SaitoOverlay = require('./../../../lib/saito/ui/saito-overlay/saito-overlay');

class DiddyMain {
  constructor(app, mod) {
    this.app = app;
    this.mod = mod;

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
      // Log energy values for debugging
      console.log("Rendering DiddyMain...");
      console.log("Energy from backend:", this.mod.diddy.energy, "/", this.mod.diddy.maxEnergy);

      // Update count from diddy.js
      document.querySelector(".text-number").innerHTML = this.mod.diddy.count;

      // Update level from diddy.js
      const levelElement = document.getElementById('level');
      if (levelElement) {
        levelElement.innerHTML = `Level ${this.mod.diddy.level}`;
      }

      // Update energy from diddy.js
      const energyElement = document.getElementById("energy");
      if (energyElement) {
        energyElement.innerText = `${this.mod.diddy.energy} / ${this.mod.diddy.maxEnergy}`;
      } else {
        console.error("#energy element not found in the DOM.");
      }
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

    if (this.mod.diddy.energy <= 0) {
      console.log("No energy left! Please wait for recharge.");
      alert("No energy left! Wait for recharge.");
      return;
    }

    // Increment count and decrement energy
    this.mod.diddy.count += 1; // Increment the centralized count
    this.mod.diddy.energy -= 1; // Decrease energy
    this.mod.recalculateState(); // Recalculate level in diddy.js

    // Update the UI
    this.updateUI();

    // Save updated count and energy to backend
    this.mod.save();

    // Create and propagate a transaction every 20 clicks
    if (this.mod.diddy.count % 20 === 0) {
      const newtx = await this.mod.createClickTransaction();
      this.app.network.propagateTransaction(newtx);
      console.log("Transaction propagated for every 20 clicks.");
    }
  }

  updateUI() {
    console.log(`Updating UI: Energy = ${this.mod.diddy.energy}, Max Energy = ${this.mod.diddy.maxEnergy}`);

    // Update count
    document.querySelector('.text-number').innerText = this.mod.diddy.count;

    // Update level
    const levelElement = document.getElementById('level');
    if (levelElement) {
      levelElement.innerHTML = `Level ${this.mod.diddy.level}`;
    }

    // Update energy
    const energyElement = document.getElementById("energy");
    if (energyElement) {
      energyElement.innerText = `${this.mod.diddy.energy} / ${this.mod.diddy.maxEnergy}`;
    }

    // Update the energy bar dynamically
    const energyFill = document.getElementById('energy-fill');
    if (energyFill) {
      energyFill.style.width = (this.mod.diddy.energy / this.mod.diddy.maxEnergy) * 100 + '%';
    }
  }

  startRecharge() {
    if (this.rechargeInterval) {
      clearInterval(this.rechargeInterval); // Clear existing interval if any
    }

    // Track fractional recharge progress
    let fractionalEnergy = 0;

    this.rechargeInterval = setInterval(() => {
      if (this.mod.diddy.energy < this.mod.diddy.maxEnergy) {
        // Increment fractional progress
        fractionalEnergy += this.mod.diddy.rechargeRate;

        // Add whole energy points when fractionalEnergy reaches 1 or more
        const wholeRecharge = Math.floor(fractionalEnergy);
        if (wholeRecharge > 0) {
          this.mod.diddy.energy += wholeRecharge;

          // Cap energy at maxEnergy
          if (this.mod.diddy.energy > this.mod.diddy.maxEnergy) {
            this.mod.diddy.energy = this.mod.diddy.maxEnergy;
          }

          // Remove used fractional energy
          fractionalEnergy -= wholeRecharge;
        }

        this.updateUI();
        console.log(`Recharging... Energy: ${this.mod.diddy.energy}`);
      }

      // Save the updated energy and timestamp to ensure persistence
      this.mod.diddy.lastUpdated = Date.now();
      this.mod.save();
    }, 1000); // Recharge every second
  }

  stopRecharge() {
    if (this.rechargeInterval) {
      clearInterval(this.rechargeInterval);
      this.rechargeInterval = null;
    }
  }
}

module.exports = DiddyMain;
