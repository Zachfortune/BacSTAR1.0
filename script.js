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
        document.getElementById('bettingButtons').style.display = 'block';
    }

    updateBigRoad() {
        const bigRoad = document.getElementById('bigRoad');
        bigRoad.innerHTML = '';
        let row = document.createElement('div');
        row.className = 'bigRoadRow';

        this.bigRoad.forEach((result, index) => {
            if (index % 6 === 0 && index !== 0) {
                bigRoad.appendChild(row);
                row = document.createElement('div');
                row.className = 'bigRoadRow';
            }
            const cell = document.createElement('div');
            cell.className = `bigRoadCell ${result.toLowerCase()}`;
            cell.textContent = result.charAt(0);
            row.appendChild(cell);
        });

        bigRoad.appendChild(row);
    }

    placeBet(bet) {
        let currentBet = bet;

        if (this.betCount < 2) {
            currentBet = this.lastBet;
        } else {
            currentBet = this.lastBet === "Player" ? "Banker" : "Player";
        }

        const result = this.playGame() === currentBet;
        this.lastBet = currentBet;
        this.betCount++;

        const statusText = document.getElementById('statusText');
        statusText.textContent = `Bet: ${currentBet} Result: ${result ? "Win" : "Lose"}`;

        if (result) {
            this.resetBetting();
        }
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
