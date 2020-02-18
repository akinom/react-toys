
module.exports = class LeveledProblemGenerator {
    constructor() {
        this.simpleTimes = (ths) => {
            let left = Math.floor(Math.random() * 9) + 2
            let right = Math.floor(Math.random() * 10) + 2
            ths['left'] = left;
            ths['right'] = right;
            ths['op'] = '*';
            ths['result'] = left * right;
        };

        this.simpleDivision = (ths) => {
            let left = Math.floor(Math.random() * 9) + 2
            let right = Math.floor(Math.random() * 10) + 2
            ths['left'] = left * right
            ths['right'] = right;
            ths['op'] = '/';
            ths['result'] = left;
        }

        this.mediumLeftRight = (ths) => {
            let left = Math.floor(Math.random() * 9) + 2
            let right = Math.floor(Math.random() * 10) + 2
            if (Math.random() < .5) {
                left = 10 * left
            }
            if (Math.random() < .25) {
                right = 10 * right
            }
            ths['left'] = left;
            ths['right'] = right;
            return ths
        }

        this.mediumTimes = (ths) => {
            this.mediumLeftRight(ths)
            ths['op'] = '*';
            ths['result'] = ths['left'] * ths['right'];
        }

        this.mediumDivision = (ths) => {
            let lr = this.mediumLeftRight({})
            ths['op'] = '/';
            ths['left'] = lr.left * lr.right
            ths['right'] = lr.right
            ths['result'] = lr.left
            ths['left'] = ths['result'] * ths['right']
        }

        this.level = 0
        this.problenLevels = [
            [this.simpleTimes],
            [this.simpleTimes, this.simpleDivision],
            [this.mediumTimes, this.mediumDivision]
        ];

        console.log('created ' + JSON.stringify(this.state))
    }

    levelUp() {
        this.level += 1
    }

    genProblem(problem) {
        let nchoices = this.problenLevels[this.level].length
        let choice = Math.floor(Math.random() * nchoices)
        this.problenLevels[this.level][choice](problem)
    }
}

