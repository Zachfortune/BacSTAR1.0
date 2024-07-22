class BaccaratSimulation {
    constructor() {
        this.bigRoad = [];
        this.currentStrategy = 'repeatLast';
        this.customSequence = 'BPBPPBBP';
        this.customSequenceIndex = 0;
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
        this.updateViews();
        this.updateCounters(result);
        this.updateRecommendedBet();
    }

    updateViews() {
        this.updateBigRoad();
        this.updateBigEyeBoy();
        this.updateSmallRoad();
        this.updateCockroachPig();
    }

    updateBigRoad() {
        const bigRoad = document.getElementById('bigRoad');
        bigRoad.innerHTML = '';

        let colIndex = 0;
        let rowIndex = 0;
        const maxRow = 6;

        this.bigRoad.forEach((result) => {
            if (rowIndex >= maxRow) {
                rowIndex = 0;
                colIndex++;
            }
            const cell = document.createElement('div');
            cell.className = `bigRoadCell ${result.toLowerCase()}`;
            cell.textContent = result.charAt(0);

            cell.style.gridRowStart = rowIndex + 1;
            cell.style.gridColumnStart = colIndex + 1;

            bigRoad.appendChild(cell);
            rowIndex++;
        });
    }

    updateBigEyeBoy() {
        const bigEyeBoy = document.getElementById('bigEyeBoy');
        bigEyeBoy.innerHTML = '';
    }

    updateSmallRoad() {
        const smallRoad = document.getElementById('smallRoad');
        smallRoad.innerHTML = '';
    }

    updateCockroachPig() {
        const cockroachPig = document.getElementById('cockroachPig');
        cockroachPig.innerHTML = '';
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
            this.incrementCustomSequence();
        }
    }

    resetStrategies() {
        this.customSequenceIndex = 0;
    }

    updateRecommendedBet() {
        const currentBet = this.getRecommendedBet();
        document.getElementById('recommendedBet').textContent = `Recommended Bet: ${currentBet}`;
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

    changeStrategy() {
        const strategy = document.getElementById('strategySelect').value;
        this.currentStrategy = strategy;
        this.resetStrategies();
        this.updateRecommendedBet();
    }

    changeViewMode() {
        const viewMode = document.getElementById('viewModeSelect').value;
        document.querySelectorAll('.viewContainer').forEach(view => {
            view.classList.remove('active');
        });
        document.getElementById(viewMode).classList.add('active');
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
}

function changeStrategy() {
    baccaratSimulation.changeStrategy();
}

function changeViewMode() {
    baccaratSimulation.changeViewMode();
}
