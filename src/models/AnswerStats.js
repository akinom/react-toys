
export class AnswerStats {
    constructor() {
        this.ncorrect = 0
        this.nwrong = 0
        this.nConsecCorrect = 0
        this.points = 0
        this.lastCorrect = false
    }

    countAnswer(correct) {
        if (correct) {
            this.ncorrect += 1
            this.nConsecCorrect += 1
            this.points += 1
        } else {
            this.nwrong += 1
            this.nConsecCorrect = 0
            this.points -= 3
            if (this.points < 0) {
                this.points = 0;
            }
        }
        this.lastCorrect = correct
    }
}

export default AnswerStats;
