
function pickOneOf(arr) {
    let pick = Math.floor(Math.random() * arr.length)
    return arr[pick]
}

function simpleAddition(ths) {
    let left = Math.floor(Math.random() * 100)
    let right = pickOneOf([2, 3, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 9, 9, 9, 11, 11])
    ths['left'] = left;
    ths['right'] = right;
    ths['op'] = '+';
    ths['result'] = left + right;
}


function simpleSubtraction(ths) {
    let left = Math.floor(Math.random() * 80) + 20
    let right = pickOneOf([2, 3, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 9, 9, 9, 11, 11])
    ths['left'] = left;
    ths['right'] = right;
    ths['op'] = '-';
    ths['result'] = left - right;
}


function simpleTimes(ths)  {
    let left = pickOneOf([2, 3, 4, 4, 5, 6, 6, 7, 7, 8, 8, 9, 9, 11])
    let right = pickOneOf([4, 5, 6, 7, 8, 9, 11])
    ths['left'] = left;
    ths['right'] = right;
    ths['op'] = '*';
    ths['result'] = left * right;
};

function simpleDivision(ths)  {
    let f1 = pickOneOf([2, 3, 4, 4, 5, 6, 6, 7, 7, 8, 8, 9, 9, 11])
    let f2 = pickOneOf([4, 5, 6, 7, 8, 9])
    ths['left'] = f1 * f2
    ths['right'] = f2
    ths['op'] = '/';
    ths['result'] = f1;
}

function mediumLeftRight(ths)  {
    let left = pickOneOf([2, 3, 4, 4, 5, 6, 6, 7, 7, 8, 8, 9, 9, 11])
    let right = pickOneOf([4, 5, 6, 7, 8, 9, 11])
    if (Math.random() < .5) {
        left = 10 * left
    } else if (Math.random() < .5) {
        right = 10 * right
    }

    ths['left'] = left;
    ths['right'] = right;
    ths['op'] = '*';
    ths['result'] = left * right;

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
            [simpleDivision],
            [simpleAddition],
            [simpleSubtraction],
            [simpleTimes, simpleDivision, mediumTimes, mediumDivision],
            [mediumTimes],
            [mediumDivision],
            [simpleTimes, simpleDivision, mediumTimes, mediumDivision, mediumTimes, mediumDivision]
        ];
    }

    changeLevelBy(delta) {
        this.level += delta
        if (this.level < 0) {
            this.level = 0
        }
    }

    genProblem(problem) {
        let theLevel = this.level < this.problemLevels.length ?  this.level :  this.problemLevels.length -1
        let nchoices = this.problemLevels[theLevel].length
        let choice = Math.floor(Math.random() * nchoices)
        this.problemLevels[theLevel][choice](problem)
    }
}

if (false) {
    for (let n = 0; n < 100; n++) {
        let o = {}
        JSON.stringify(simpleSubtraction(o))
        console.log(JSON.stringify(o))
    }
}
