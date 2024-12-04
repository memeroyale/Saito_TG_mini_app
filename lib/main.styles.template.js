module.exports = () => {

        return `

	<style class="main-styles-container">

/* General Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
    color: #fff;
}

/* Wallet Button at the Yellow Cross Location */
.wallet-button-container {
    position: absolute; /* Position the container */
    top: 65%; /* Adjust percentage to align with the yellow cross */
    right: 10%; /* Adjust as necessary to match the location */
    z-index: 1000; /* Ensure it's on top of other elements */
}

.image-button {
    width: 50px; /* Set button size */
    height: auto;
    cursor: pointer; /* Make it look like a clickable button */
    object-fit: contain; /* Ensure the image is scaled correctly */
}
.image-button:hover {
    opacity: 0.8; /* Add a hover effect */
}

/* Body styling */
body {
    display: flex;
    justify-content: center;
    align-items: center;
    background: radial-gradient(circle, #333, #000); /* Dark grey to black gradient */
    height: 100vh;
    overflow: hidden;
    padding: 20px;
}

/* Main Container styling */
.main-container {
    text-align: center;
    max-width: 400px;
    width: 100%;
    background-color: #222;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

/* Top Bar styling */
.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #333;
    border-radius: 20px;
    padding: 10px;
    margin-bottom: 15px;
}

/* Top Bar Coin Icon */
.top-bar-coin-icon {
    width: 50px; /* Adjust size as needed */
    height: 50px;
    object-fit: contain;
}

/* Top bar text styling */
.top-bar-label {
    text-align: left;
    color: #FFD700;
}

.game-name {
    font-weight: bold;
    display: block;
}

.level {
    font-size: 0.8rem;
    color: #ccc;
}

/* Per Tap Button */
.per-tap-button {
    background: #444;
    border-radius: 10px;
    padding: 5px 10px;
    color: #FFD700;
    font-weight: bold;
}

/* Game stats section with SoloCoin */
.game-stats {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 10px;
}

.coin-display {
    width: 50px; /* Adjust size as needed */
    height: 50px;
    object-fit: contain;
    margin-bottom: 5px;
}

.text-number {
    font-size: 2rem;
    color: #FFD700;
    text-shadow: 0px 0px 5px rgba(255, 215, 0, 0.8);
    font-weight: bold;
}

/* Character Image - Only Clickable Element */
.character-image {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
    display: block;
    margin: 20px auto; /* Centers the image without adding clickable area */
}

/* Score Bar */
.score-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    color: #FFD700;
    margin-top: 10px;
}

.lightning-icon {
    font-size: 1.5rem;
    margin-right: 5px;
}

/* Currency Section */
.currency {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
}

/* Coin Icon (coin.png) */
.coin-icon {
    width: 40px;  /* Adjust size as needed */
    height: 40px;
    object-fit: contain;  /* Ensures the icon scales well */
}

#message-wrapper { display: none !important; }

	</style>

	`;

}
