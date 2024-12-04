module.exports = () => {
    return `
    <div class="main-container">
        <!-- Top Bar with Coin Icon Image, Game Name, Level, and Per Tap Button -->
        <div class="top-bar">
            <img src="img/coins.png" alt="Coins Icon" class="top-bar-coin-icon">
            <div class="top-bar-label">
                <span class="game-name">$SLAPDIDDY</span>
                <span class="level" id="level">Level 1</span>
            </div>
            <div class="per-tap-button">
                <span>Per tap</span>
                <span>+1</span>
            </div>
        </div>

        <!-- Game Stats Section with SoloCoin Image -->
        <section class="game-stats">
            <img src="img/solocoin.png" alt="Solo Coin Icon" class="coin-display">
            <h1 class="text-number" id="score">0</h1>
        </section>

        <!-- Character Icon - Only Image is Clickable -->
        <img src="img/Untitled design (17).png" alt="Character Icon" class="character-image" id="character-image">

        <!-- Energy/Score Bar Section -->
        <section class="score-bar">
            <div class="lightning-icon">⚡</div>
            <span id="energy">0 / 1,000,000</span>
        </section>

        <!-- Currency Section with Coin Image -->
        <section class="currency">
            <img src="img/coin.png" alt="Coin Icon" class="coin-icon">
        </section>

        <!-- Wallet Button Moved to Bottom -->
        <div class="bottom-right-button-container">
            <img src="img/connectwallet.png" alt="Button" id="image-button" class="image-button">
        </div>
    </div>
    `;
};
