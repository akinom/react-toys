import React from 'react';

export class PresentPracticeProblems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [],
            problem: null,
            stats: new AnswerStats(),
            problemGenerator: new LeveledProblemGenerator(),
            leveledUp : false,
            input: '',
            test: false
        }
        this.state.problem = this.newProblem()
        if (this.state.test) {
            this.state.levelUpThreshold = 3
        } else {
            this.state.levelUpThreshold = 12
        }
    }

    newProblem() {
        let p = new Problem()
        p.state = p.seedState(this.state.problemGenerator);
        return p
    }

    trackInput(event) {
        this.setState({input: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        let leveledUp = false;
        let updatedProblem = this.state.problem;
        updatedProblem.answer = parseInt(this.state.input)
        this.state.history.push(updatedProblem)
        this.state.stats.countAnswer(updatedProblem.isCorrect())
        if ((this.state.stats.nConsecCorrect % this.state.levelUpThreshold ) === 0 && this.state.stats.nConsecCorrect > 0) {
            this.state.problemGenerator.levelUp()
            leveledUp = true;
            this.state.history.push(new Message('You reached level ' + (this.state.problemGenerator.level + 1)))
        }
        console.log(JSON.stringify(this.state.stats))
        this.setState({
            problem: this.newProblem(),
            history: this.state.history,
            stats: this.state.stats,
            leveledUp: leveledUp,
            input: '',
        })
    }

    renderForm() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="input-group">
                    <div className="input-group-prepend">
                                    <span className="input-group-text">
                                         <ReactProblem problem={this.state.problem} showResult={false}/> &nbsp; =
                                    </span>
                    </div>
                    <input type="number" className="form-control" value={this.state.input}
                           onChange={this.trackInput.bind(this)}/>
                    <input type="submit" style={{display: 'none'}}/>
                </div>
            </form>
        )
    }

    render() {
        return (
            <div className='container-sm'>
                <div className={'row'}>
                     <h2>  Practice Level: {this.state.problemGenerator.level +1} </h2>
                </div>
                <div className={'row theProblem'}>
                    {this.renderForm()}
                </div>

                <div className={'row'}>
                    <div className={'col alert alert-success shortCol'}>
                        <span> {this.state.stats.ncorrect} correct  </span>
                    </div>
                    <div className={'col alert'}>
                        <Feedback stats={this.state.stats} limit={this.state.levelUpThreshold} message={"Progress to Next Level"}/>
                    </div>
                </div>
                <div className={'row'}>
                    <History history={this.state.history}/>
                </div>
            </div>)
    }
}


class Feedback extends React.Component {
    displayPercent(stats, limit) {
        return (stats.nConsecCorrect % limit) * (100 / limit)
    }
    render() {
        let stats = this.props.stats
        let percent = this.displayPercent(stats, this.props.limit)
        let feedback = (percent < 1) ? this.props.message : ''
        if (feedback === '') {
            feedback = (
                <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{width: percent + '%'}}
                         aria-valuenow={percent}
                         aria-valuemin="0" aria-valuemax="100"></div>
                </div>)
        } else {
            feedback = (<span className={'alert alert-primary'}> {feedback}   </span>)
        }
        return feedback
    }
}

class History extends React.Component {
    render() {
        let events = this.props.history

        const KLS_SELECTION = {
            undefined: 'alert list-group-item list-group-item-primary',
            true: 'alert list-group-item list-group-item-success',
            false: 'alert list-group-item list-group-item-danger'
        }
        //let showResult = this.state.mode ==='showResults'
        let display = []
        for (let i = events.length - 1; i >= 0; i--) {
            let event = events[i]
            let kls = undefined
            if (event.isCorrect !== undefined)
                kls = event.isCorrect()
            display.push(<li key={i} className={KLS_SELECTION[kls]}>{event.render()}</li>)
        }

        return (
            <ul className="list-group problemList">
                {display}
            </ul>
        )
    }
}


class LeveledProblemGenerator {
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

class Problem {
    seedState(generator) {
        generator.genProblem(this)
        this.showResult = false
    }

    isCorrect() {
        if (this.answer === undefined) {
            return undefined
        } else {
            return this.answer === this.result
        }
    }

    render(showresult) {
        return ( <ReactProblem problem={this} showresult={showresult} />)
    }
}

class Message {
    constructor(msg) {
        this.state = { message : msg}
    }

    render(showresult) {
        return (<span>{this.state.message}   </span>)
    }
}

class ReactProblem extends React.Component {
    render() {
        let problem = this.props.problem;
        let withResult = ''
        if (this.props.showResult) {
            withResult = (<span> = {problem.result}</span>)
        }
        return (
            <span>
                {problem.left} {problem.op} {problem.right} {withResult}
            </span>
        )
    }
}



class AnswerStats {
    constructor() {
        this.ncorrect = 0
        this.nwrong = 0
        this.nConsecCorrect = 0
        this.lastCorrect = false
    }

    countAnswer(correct) {
        if (correct) {
            this.ncorrect += 1
            this.nConsecCorrect += 1
        } else {
            this.nwrong += 1
            this.nConsecCorrect = 0
        }
        this.lastCorrect = correct
    }

}
