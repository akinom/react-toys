

export class Problem {
    generate(generator) {
        generator.genProblem(this)
        this.answer = undefined
    }

    isCorrect() {
        if (this.answer === undefined) {
            return undefined
        } else {
            return this.answer === this.result
        }
    }

}

export default Problem
