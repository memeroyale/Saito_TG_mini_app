module.exports = () => {
    return `
    <style class="main-styles-container">
        /* General Styles */
        .main-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
        }

        .top-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding: 1rem 2rem;
            background-color: #333;
            color: white;
        }

        .top-bar-coin-icon {
            width: 3rem;
            height: 3rem;
        }

        .top-bar-label {
            display: flex;
            flex-direction: column;
            text-align: center;
        }

        .game-name {
            font-size: 2rem;
            font-weight: bold;
        }

        .level {
            font-size: 1.2rem;
        }

        .per-tap-button {
            background-color: #007bff;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        /* Game Stats Section */
        .game-stats {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 2rem 0;
        }

        .coin-display {
            width: 5rem;
            height: 5rem;
            margin-bottom: 1rem;
        }

        .text-number {
            font-size: 3rem;
            font-weight: bold;
        }

        /* Character Icon */
        .character-image {
            width: 10rem;
            height: auto;
            margin: 2rem 0;
            cursor: pointer;
        }

        /* Score Bar Section */
        .score-bar {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 80%;
            padding: 0.5rem;
            background-color: #444;
            color: white;
            border-radius: 0.5rem;
        }

        .lightning-icon {
            margin-right: 0.5rem;
            font-size: 1.5rem;
        }

        /* Currency Section */
        .currency {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 2rem;
        }

        .coin-icon {
            width: 3rem;
            height: auto;
        }

        #saito-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px; /* Adjust to your header height */
    background: var(--saito-arcade-header-background, #333); /* Default background */
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.saito-header-logo {
    height: 40px;
    width: auto;
}

#saito-header nav {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

#saito-header nav a {
    color: white;
    text-decoration: none;
    font-size: 14px;
    font-weight: bold;
}

#saito-header-menu-toggle {
    cursor: pointer;
    color: white;
    font-size: 18px;
}     
    </style>
    `;
};
