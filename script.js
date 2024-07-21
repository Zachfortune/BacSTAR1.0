class BaccaratSimulation {
    constructor() {
        this.bigRoad = [];
        this.lastBet = '';
        this.betCount = 0;
        this.currentStrategy = 'repeatLast';
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
        let currentBet = '';
        
        switch (this.currentStrategy) {
            case 'repeatLast':
                currentBet = this.getRepeatLastBet();
                break;
            case 'alternate':
                currentBet = this.getAlternateBet();
                break;
            case 'trend':
                currentBet = this.getTrendBet();
                break;
        }

        this.lastBet = currentBet;

        const recommendedBetText = document.getElementById('recommendedBet');
        recommendedBetText.textContent = `Recommended Bet: ${currentBet}`;
    }

    getRepeatLastBet() {
        if (this.bigRoad.length === 0) {
            return 'Player';
        }
        return this.bigRoad[this.bigRoad.length - 1];
    }

    getAlternateBet() {
        if (this.bigRoad.length === 0) {
            return 'Player';
        }
        return this.bigRoad[this.bigRoad.length - 1] === 'Player' ? 'Banker' : 'Player';
    }

    getTrendBet() {
        if (this.bigRoad.length === 0) {
            return 'Player';
        }
        const lastResult = this.bigRoad[this.bigRoad.length - 1];
        const trendCount = this.bigRoad.reduceRight((count, result) => {
            return result === lastResult ? count + 1 : 0;
        }, 0);
        return trendCount % 2 === 0 ? lastResult : (lastResult === 'Player' ? 'Banker' : 'Player');
    }

    changeStrategy(strategy) {
        this.currentStrategy = strategy;
        this.updateRecommendedBet();
    }
}

const baccaratSimulation = new BaccaratSimulation();

function recordResult(result) {
    baccaratSimulation.recordResult(result);
}

function changeStrategy() {
    const strategy = document.getElementById('strategySelect').value;
    baccaratSimulation.changeStrategy(strategy);
}
