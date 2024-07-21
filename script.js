class BaccaratSimulation {
    constructor() {
        this.bigRoad = [];
        this.currentStrategy = 'repeatLast';
        this.customSequence = 'BPBPPBBP';
        this.customSequenceIndex = 0;
    }

    recordResult(result) {
        this.bigRoad.push(result);
        this.updateBigRoad();
        this.updateRecommendedBet();
    }

    updateBigRoad() {
        const bigRoad = document.getElementById('bigRoad');
        bigRoad.innerHTML = '';

        let colIndex = 0;
        let rowIndex = 0;
        let maxRow = 6; // Typically Big Road has 6 rows

        this.bigRoad.forEach((result, index) => {
            if (rowIndex >= maxRow) {
                rowIndex = 0;
                colIndex++;
            }
            const cell = document.createElement('div');
            cell.className = `bigRoadCell ${result.toLowerCase()}`;
            cell.textContent = result.charAt(0);

            // Position the cell in the grid
            cell.style.gridRowStart = rowIndex + 1;
            cell.style.gridColumnStart = colIndex + 1;

            bigRoad.appendChild(cell);
            rowIndex++;
        });
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
            case 'reverseTrend':
                currentBet = this.getReverseTrendBet();
                break;
            case 'zachSecretSauce':
                currentBet = this.getZachSecretSauceBet();
                break;
        }

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
        if (this.bigRoad.length < 4) {
            return this.getRepeatLastBet();
        }

        const lastFour = this.bigRoad.slice(-4);
        const playerCount = lastFour.filter(result => result === 'Player').length;
        const bankerCount = lastFour.filter(result => result === 'Banker').length;

        if (playerCount > bankerCount) {
            return 'Player';
        } else if (bankerCount > playerCount) {
            return 'Banker';
        } else {
            return this.bigRoad[this.bigRoad.length - 1];
        }
    }

    getReverseTrendBet() {
        if (this.bigRoad.length < 4) {
            return this.getAlternateBet();
        }

        const lastFour = this.bigRoad.slice(-4);
        const playerCount = lastFour.filter(result => result === 'Player').length;
        const bankerCount = lastFour.filter(result => result === 'Banker').length;

        if (playerCount > bankerCount) {
            return 'Banker';
        } else if (bankerCount > playerCount) {
            return 'Player';
        } else {
            return this.bigRoad[this.bigRoad.length - 1] === 'Player' ? 'Banker' : 'Player';
        }
    }

    getZachSecretSauceBet() {
        const sequenceChar = this.customSequence[this.customSequenceIndex];
        const oppositeBet = sequenceChar === 'B' ? 'Player' : 'Banker';
        
        this.customSequenceIndex = (this.customSequenceIndex + 1) % this.customSequence.length;
        
        return oppositeBet;
    }

    changeStrategy(strategy) {
        this.currentStrategy = strategy;
        this.customSequenceIndex = 0; // Reset sequence index when strategy changes
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
