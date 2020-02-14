import React from 'react';

export class TimesTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [],
            problem: this.newProblem(),
            stats: new AnswerStats(),
            input: ''
        }
    }

    newProblem() {
        let p = new Problem()
        p.state = p.seedState();
        return p
    }

    trackInput(event) {
        this.setState({input: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        let updatedProblem = this.state.problem;
        updatedProblem.answer = parseInt(this.state.input)
        this.state.history.push(updatedProblem)
        this.state.stats.countAnswer(updatedProblem.isCorrect())

        this.setState({
            problem: this.newProblem(),
            history: this.state.history,
            stats: this.state.stats,
            input: '',
        })
    }

    render() {
        return <div>
            <div className='offset container-sm'>
                <div className={'row'}>
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
                </div>
            </div>

            <div className='container-sm'>
                <div className={'row'} id={'stats'}>
                    <div className={'col alert alert-success'} id={'correct'}>
                        <span> {this.state.stats.ncorrect} correct  </span>
                    </div>
                    <div className={'col alert'} id={'progress'}>
                        <Feedback stats={this.state.stats} test={true} />
                    </div>
                </div>
                <div className={'row'}>
                    <ProblemList  problems={this.state.history} />
                </div>
            </div>
        </div>;
    }
}


class Feedback extends React.Component {
    render() {
        let modulo = this.props.test ? 3 : 10
        let stats = this.props.stats
        let feedback = ''
        if (stats.nConsecCorrect % modulo === 0 && stats.nConsecCorrect > 0) {
            feedback = (<span className={'alert alert-primary'}> Yes !! {stats.nConsecCorrect} Consecutive Correct Answers  </span>)
        } else {
            let percent = (stats.nConsecCorrect % modulo) * (100 / modulo)
            feedback = (
                <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{width: percent + '%'}}
                         aria-valuenow={percent}
                         aria-valuemin="0" aria-valuemax="100"></div>
                </div>)
        }
        return feedback
    }
}

class ProblemList extends React.Component {
    render() {
        let problems = this.props.problems

        const KLS_SELECTION = {undefined: '', true: 'alert list-group-item list-group-item-success', false: 'alert list-group-item list-group-item-danger'}
        //let showResult = this.state.mode ==='showResults'
        let display = []
        for (let i =problems.length -1; i >= 0; i--) {
            let problem =  problems[i]
            let kls = KLS_SELECTION[problem.isCorrect()]
            display.push(  <li key={i} className={kls}> <ReactProblem problem={problem} showResult={true} /> </li> )
        }

        return (
            <ul className="list-group problemList">
                { display }
            </ul>
        )
    }
}

class Problem {
    seedState() {
        let left = Math.floor(Math.random() * 10) + 2
        let right = Math.floor(Math.random() * 10) + 1
        this.left = left;
        this.right = right;
        this.op = '*';
        this.result = left * right;
        this.showResult = false

    }

    isCorrect() {
        if (this.answer === undefined) {
            return undefined
        } else {
            return this.answer === this.result
        }
    }
}


class ReactProblem extends React.Component {
    render() {
        let problem = this.props.problem;
        let withResult = ''
        if ( this.props.showResult)  {
            withResult = (<span> = {problem.result}</span>)
        }
        return (
            <span>
                {problem.left} {problem.op} {problem.right} {withResult}
            </span>
        )
    }
}


class AnswerStats  {
    constructor() {
        this.ncorrect  = 0
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
        window.console.log(JSON.stringify(this))
    }

}
