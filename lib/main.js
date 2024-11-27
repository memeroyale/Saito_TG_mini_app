const DiddyMainTemplate = require('./main.template');
const DiddyStylesTemplate = require('./main.styles.template');
const SaitoOverlay = require('./../../../lib/saito/ui/saito-overlay/saito-overlay');

class DiddyMain {

  constructor(app, mod) {
    this.app = app;
    this.mod = mod;

    this.count = 0; // Use count to track total clicks
    this.level = 0;
    this.energy = 100; // Starting energy at level 1
    this.maxEnergy = 100; // Max energy depends on level
    this.rechargeRate = 2000; // Initial recharge rate in milliseconds (2 seconds)
    this.rechargeInterval = null; // Interval for recharging energy
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
    this.startRecharge(); // Start the energy recharge process
  }

  attachEvents() {
    let characterImage = document.getElementById("character-image");
    if (characterImage) {
        characterImage.onclick = (e) => {
            this.increaseCount();
        };
    }
}

  async clickCoinButton() {
    console.log("Coin button clicked!");
    this.increaseCount();

    // For every 20 clicks, propagate a transaction
    if (this.count % 20 === 0) { 
        let newtx = await this.mod.createClickTransaction();
        this.app.network.propagateTransaction(newtx);
        console.log("Transaction propagated for every 20 clicks.");
    }
  }

  increaseCount() {
    if (this.energy <= 0) {
      console.log("No energy left! Please wait for recharge.");
      alert("No energy left! Wait for recharge.");
      return;
    }

    this.count += 1; // Increment count by 1 per click
    this.energy -= 1; // Decrease energy by 1 per click
    this.updateUI();

    console.log(`Count: ${this.count}, Level: ${this.level}, Energy: ${this.energy}`);

    // Calculate the required clicks for the next level
    let requiredClicks = 100; // Base clicks for level 1
    for (let i = 1; i <= this.level; i++) {
        requiredClicks += 100 + (i - 1) * 10; // Incrementally increase clicks for each level
    }

    // Check if the count has reached the required clicks for the next level
    if (this.count >= requiredClicks) {
        this.level++;
        this.updateLevel();
    }
  }

  updateLevel() {
    // Update level, max energy, and recharge rate
    this.maxEnergy = 100 + this.level * 20; // Example: level 1 = 100, level 2 = 120, etc.
    this.rechargeRate = 2000 - this.level * 100; // Faster recharge: 1.9s at level 2, etc.
    this.energy = this.maxEnergy; // Refill energy on level-up
    document.getElementById('level').innerText = 'Level ' + this.level;

    console.log(`Level up! New level: ${this.level}, Max Energy: ${this.maxEnergy}, Recharge Rate: ${this.rechargeRate}ms`);
    this.updateUI();
  }

  updateUI() {
    document.querySelector('.text-number').innerText = this.count;
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
