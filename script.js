class BaccaratSimulation {
    constructor() {
        this.random = Math.random;
    }

    playGame() {
        // Simulate a Baccarat game result
        return this.random() > 0.5 ? "Player" : "Banker";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const statusText = document.getElementById('statusText');
    const betButton = document.getElementById('betButton');
    const baccaratSimulation = new BaccaratSimulation();

    let lastBet = "Player"; // Default initial bet
    let betCount = 0;

    betButton.addEventListener('click', () => {
        placeBet();
    });

    function placeBet() {
        let currentBet;

        if (betCount < 2) {
            currentBet = lastBet;
        } else {
            currentBet = lastBet === "Player" ? "Banker" : "Player";
        }

        const result = baccaratSimulation.playGame() === currentBet;
        lastBet = currentBet;
        betCount++;

        statusText.textContent = `Bet: ${currentBet} Result: ${result ? "Win" : "Lose"}`;

        if (result) {
            resetBetting();
        }
    }

    function resetBetting() {
        betCount = 0;
    }
});
