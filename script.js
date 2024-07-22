class BaccaratSimulation {
    constructor() {
        this.bigRoad = [];
        this.currentStrategy = 'repeatLast';
        this.customSequence = 'BPBPPBBP';
        this.customSequenceIndex = 0;
        this.lastRecommendedBet = '';
        this.potentialResult = '';
        this.winCount = 0;
        this.lossCount = 0;
        this.playerCount = 0;
        this.bankerCount = 0;
    }

    setPotentialResult(result) {
        this.potentialResult = result;
        document.getElementById('statusText').textContent = `Potential Result: ${result}`;
    }

    confirmResult() {
        if (this.potentialResult) {
            this.recordResult(this.potentialResult);
            this.potentialResult = '';
            document.getElementById('statusText').textContent = 'Enter the last result!';
        }
    }

    recordResult(result) {
        this.bigRoad.push(result);
        this.updateBigRoad();
        this.updateCounters(result);
        this.updateRecommendedBet();
    }

    updateBigRoad() {
        const bigRoad = document.getElementById('bigRoad');
        bigRoad.innerHTML = '';

        let colIndex = 0;
        let rowIndex = 0;
        const maxRow = 6; // Typically Big Road has 6 rows

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

    updateCounters(result) {
        if (result === 'Player') {
            this.playerCount++;
        } else if (result === 'Banker') {
            this.bankerCount++;
        }
        document.getElementById('playerCount').textContent = this.playerCount;
        document.getElementById('bankerCount').textContent = this.bankerCount;
    }

    recordWin() {
        if (this.potentialResult) {
            this.winCount++;
            document.getElementById('winCount').textContent = this.winCount;
            this.confirmResult();
            this.resetStrategies();
        }
    }

    recordLoss() {
        if (this.potentialResult) {
            this.lossCount++;
            document.getElementById('lossCount').textContent = this.lossCount;
            this.confirmResult();
        }
    }

    resetStrategies() {
        this.customSequenceIndex = 0; // Reset custom sequence index
        // Add other strategy resets here if needed
    }

    updateRecommendedBet() {
        const currentBet = this.getRecommendedBet();
        this.lastRecommendedBet = currentBet;

        const recommendedBetText = document.getElementById('recommendedBet');
        recommendedBetText.textContent = `Recommended Bet: ${currentBet}`;
    }

    getRecommendedBet() {
        switch (this.currentStrategy) {
            case 'repeatLast':
                return this.getRepeatLastBet();
            case 'alternate':
                return this.getAlternateBet();
            case 'trend':
                return this.getTrendBet();
            case 'reverseTrend':
                return this.getReverseTrendBet();
            case 'zachSecretSauce':
                return this.getZachSecretSauceBet();
            default:
                return 'Player';
        }
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
        return oppositeBet;
    }

    changeStrategy(strategy) {
        this.currentStrategy = strategy;
        this.resetStrategies(); // Reset strategies when changing
        this.updateRecommendedBet();
    }

    incrementCustomSequence() {
        this.customSequenceIndex = (this.customSequenceIndex + 1) % this.customSequence.length;
    }
}

const baccaratSimulation = new BaccaratSimulation();

function setPotentialResult(result) {
    baccaratSimulation.setPotentialResult(result);
}

function recordWin() {
    baccaratSimulation.recordWin();
}

function recordLoss() {
    baccaratSimulation.recordLoss();
    baccaratSimulation.incrementCustomSequence(); // Continue sequence on loss
}

function changeStrategy() {
    const strategy = document.getElementById('strategySelect').value;
    baccaratSimulation.changeStrategy(strategy);
}
