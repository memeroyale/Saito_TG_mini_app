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

    /* Wallet Button Container - Now Relative to Main Container */
    .wallet-button-container {
        position: relative;
        margin-top: 20px; /* Adjust to position below other elements */
        text-align: center; /* Center align content within */
    }

    .wallet-style {
        display: inline-flex; /* Inline for better alignment */
        justify-content: center;
        align-items: center;
        background: linear-gradient(45deg, #FFD700, #FFA500); /* Gold gradient */
        border-radius: 10px;
        padding: 10px 20px;
        color: white; /* White text */
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* Add shadow for depth */
    }

    .wallet-style:hover {
        opacity: 0.9; /* Slight hover effect */
    }

    /* Body Styling */
    body {
        display: flex;
        justify-content: center;
        align-items: center;
        background: radial-gradient(circle, #555, #333); /* Updated to a lighter grey gradient */
        height: 100vh;
        overflow: hidden;
        padding: 20px;
    }

    /* Overlay Bar Styling */
    .overlay-bar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 60px;
        background-color: #222; /* Grey background */
        z-index: 10000; /* Ensure it covers the header */
    }

    /* Main Container Styling */
    .main-container {
        text-align: center;
        max-width: 400px;
        width: 100%;
        background-color: #222;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }

    /* Lightning Icon - Match Text Size */
    .lightning-icon img {
        width: 1.5rem; /* Match the text size */
        height: 1.5rem; /* Match the text size */
        object-fit: contain; /* Ensures proper scaling */
        margin-right: 5px; /* Adds spacing between the icon and text */
        vertical-align: middle; /* Aligns icon with the text */
    }

    /* Top Bar Styling */
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

    /* Top Bar Text Styling */
    .top-bar-label {
        text-align: left;
        color: #FFD700;
    }

    .game-name {
        font-weight: bold;
        display: block;
    }

    .level {
        font-size: 2rem; /* Increase the size */
        font-weight: bold; /* Make the text bold */
        text-shadow: 0px 0px 5px rgba(255, 215, 0, 0.8); /* Add a glowing effect */
    }

    /* Per Tap Button */
    .per-tap-button {
        background: #444;
        border-radius: 10px;
        padding: 5px 10px;
        color: #FFD700;
        font-weight: bold;
    }

    /* Game Stats Section */
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

    /* Character Image */
    .character-image {
        width: 300px;
        height: 300px;
        border-radius: 50%;
        object-fit: cover;
        cursor: pointer;
        display: block;
        margin: 20px auto;
    }

    /* Score Bar */
    .score-bar {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        color: #FFD700;
        margin-top: 10px;
    }

    /* Currency Section */
    .currency {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 15px;
    }

    .coin-icon {
        width: 40px; /* Adjust size as needed */
        height: 40px;
        object-fit: contain;
    }

    #message-wrapper {
        display: none !important;
    }

    </style>
    <div class="overlay-bar"></div>

    `;
};
