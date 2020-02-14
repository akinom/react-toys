import React from 'react';

export class TimesTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: new ProblemList({}),
            problem: this.newProblem(),
            stats: new AnswerStats(),
            input: ''
        }
    }

    newProblem() {
        let p = new Problem({})
        p.state = p.seedState();
        return p
    }

    trackInput(event) {
        this.setState({input: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        let updatedProblem = this.state.problem;
        updatedProblem.state.answer = parseInt(this.state.input)
        updatedProblem.state.showResult = true
        this.state.history.addProblem(updatedProblem)
        this.state.stats.countAnswer(updatedProblem.isCorrect())

        this.setState({
            problem: this.newProblem(),
            history: this.state.history,
            stats: this.state.stats,
            input: '',
        })
    }

    render() {
        let modulo = 3
        let congrats = ''
        if (this.state.stats.ncorrect % modulo === 0 && this.state.stats.ncorrect > 0) {
            congrats = (<span className={'alert alert-primary'}> Yes !! {this.state.ncorrect} Correct Answers  </span>)
        }
        let percent = (this.state.stats.ncorrect % modulo ) * (100 /modulo)
        return <div>
            <div className='offset container-sm'>
                <div className={'row'}>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        {this.state.problem.render()} &nbsp; =
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
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" style={{width: percent + '%'}}
                                 aria-valuenow="25"
                                 aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                </div>
                <div className={'row'} id={'congrats'}>
                    {congrats}
                </div>
                <div className={'row'}>
                    {this.state.history.render()}
                </div>
            </div>
        </div>;
    }
}


class ProblemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { problems : []}
    }

    addProblem(problem) {
        this.state.problems.push(problem)
    }

    render() {
        const KLS_SELECTION = {undefined: '', true: 'alert list-group-item list-group-item-success', false: 'alert list-group-item list-group-item-danger'}
        //let showResult = this.state.mode ==='showResults'
        let display = []
        for (let i = this.state.problems.length -1; i >= 0; i--) {
            let problem = this.state.problems[i]
            let kls = KLS_SELECTION[problem.isCorrect()]
            display.push(  <li key={i} className={kls}> {problem.render() }</li> )
        }

        return (
            <ul className="list-group problemList">
                { display }
            </ul>
        )
    }

}

class Problem extends React.Component {
    seedState() {
        let left = Math.floor(Math.random() * 10) + 2
        let right = Math.floor(Math.random() * 10) + 1
        return {
            left: left,
            right: right,
            op: '*',
            result: left * right,
            showResult: false
        };
    }

    isCorrect() {
        if (this.state.answer === undefined) {
            return undefined
        } else {
            return  this.state.answer === this.state.result
        }
    }

    render() {
        let problem = this.state;
        let withResult = ''
        if ( this.state.showResult)  {
            withResult = (<span> = {this.state.result}</span>)
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
    }

    countAnswer(correct) {
        if (correct) {
            this.ncorrect += 1
        } else {
            this.nwrong += 1
        }
    }

}
