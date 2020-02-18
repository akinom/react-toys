

function simpleTimes(ths)  {
    let left = Math.floor(Math.random() * 9) + 2
    let right = Math.floor(Math.random() * 10) + 2
    ths['left'] = left;
    ths['right'] = right;
    ths['op'] = '*';
    ths['result'] = left * right;
};

function simpleDivision(ths)  {
    let left = Math.floor(Math.random() * 9) + 2
    let right = Math.floor(Math.random() * 10) + 2
    ths['left'] = left * right
    ths['right'] = right;
    ths['op'] = '/';
    ths['result'] = left;
}

function mediumLeftRight(ths)  {
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

function mediumTimes(ths)  {
    mediumLeftRight(ths)
    ths['op'] = '*';
    ths['result'] = ths['left'] * ths['right'];
}

function mediumDivision(ths)  {
    let lr = mediumLeftRight({})
    ths['op'] = '/';
    ths['left'] = lr.left * lr.right
    ths['right'] = lr.right
    ths['result'] = lr.left
    ths['left'] = ths['result'] * ths['right']
}


module.exports = class LeveledProblemGenerator {
    constructor() {
        this.level = 0
        this.problemLevels = [
            [simpleTimes],
            [simpleTimes, simpleDivision],
            [mediumTimes, mediumDivision]
        ];
    }

    levelUp() {
        this.level += 1
    }

    genProblem(problem) {
        let theLevel = this.level < this.problemLevels.length ?  this.level :  this.problemLevels.length -1
        let nchoices = this.problemLevels[theLevel].length
        let choice = Math.floor(Math.random() * nchoices)
        this.problemLevels[theLevel][choice](problem)
    }
}

