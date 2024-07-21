class BaccaratSimulation {
    constructor() {
        this.random = Math.random;
        this.bigRoad = [];
        this.lastBet = '';
        this.betCount = 0;
    }

    playGame() {
        // Simulate a Baccarat game result
        return this.random() > 0.5 ? "Player" : "Banker";
    }

    recordResult(result) {
        this.bigRoad.push(result);
        this.updateBigRoad();
        this.updateRecommendedBet();
    }

    updateBigRoad() {
        const bigRoad = document.getElementById('bigRoad');
        bigRoad.innerHTML = '';

        let col = document.createElement('div');
        col.className = 'bigRoadRow';

        this.bigRoad.forEach((result, index) => {
            if (index % 6 === 0 && index !== 0) {
                bigRoad.appendChild(col);
                col = document.createElement('div');
                col.className = 'bigRoadRow';
            }
            const cell = document.createElement('div');
            cell.className = `bigRoadCell ${result.toLowerCase()}`;
            cell.textContent = result.charAt(0);
            col.appendChild(cell);
        });

        bigRoad.appendChild(col);
    }

    updateRecommendedBet() {
        let currentBet;

        if (this.betCount < 2) {
            currentBet = this.lastBet;
        } else {
            currentBet = this.lastBet === "Player" ? "Banker" : "Player";
        }

        this.lastBet = currentBet;
        this.betCount++;

        const recommendedBetText = document.getElementById('recommendedBet');
        recommendedBetText.textContent = `Recommended Bet: ${currentBet}`;
    }

    resetBetting() {
        this.betCount = 0;
    }
}

const baccaratSimulation = new BaccaratSimulation();

function recordResult(result) {
    baccaratSimulation.recordResult(result);
}

function placeBet(bet) {
    baccaratSimulation.placeBet(bet);
}
