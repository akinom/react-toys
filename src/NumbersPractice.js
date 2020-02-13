import React from 'react';

export class TimesTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [],
            problem: this.newProblem(),
            ncorrect: 0,
            nwrong: 0,
            input: ''
        }

    }

    newProblem() {
        let left = Math.floor(Math.random() * 10) + 2
        let right = Math.floor(Math.random() * 10) + 1
        return {
            left: left,
            right: right,
            op: '*',
            result: left * right,
            correct: undefined
        };
    }

    trackInput(event) {
        this.setState({input: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this)
        let prob = this.state.problem
        prob.correct = (this.state.input.trim() === prob.result.toString());
        if (prob.correct) {
            this.setState({ncorrect: this.state.ncorrect + 1})
        } else {
            this.setState({nwrong: this.state.nwrong + 1})
        }
        this.state.history.push(this.state.problem)
        this.setState({
            history: this.state.history,
            problem: this.newProblem(),
            input: '',
        })
    }

    render() {
        let modulo = 3
        let h_len = this.state.history.length
        let hist = this.state.history
        let history_lis = hist.map((prob, i) => (<HistoricProblem problem={hist[h_len - i - 1]}/>))
        let congrats = ''
        if (this.state.ncorrect % modulo === 0 && this.state.ncorrect > 0) {
            congrats = (<span className={'alert alert-primary'}> Yes !! {this.state.ncorrect} Correct Answers  </span>)
        }
        let percent = (this.state.ncorrect % modulo ) * (100 /modulo)
        return (
            <div>
                <div className='offset container'>
                    <div className={'row'}>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        {this.state.problem.left} {this.state.problem.op} {this.state.problem.right} =
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
                            <span> {this.state.ncorrect} correct  </span>
                        </div>
                        <div className={'col alert'} id={'progress'}>
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{width: percent + '%'}} aria-valuenow="25"
                                     aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>
                    <div className={'row'} id={'congrats'}>
                    {congrats}
                    </div>
                    {history_lis}
                </div>
            </div>
        );
    }
}

class HistoricProblem extends React.Component {
    render() {
        let prob = this.props.problem
        let kls = prob.correct ? 'alert-success' : 'alert-danger'
        return (
            <div className={'row alert ' + kls} role={'alert'} id={'history'}>
            <span>
                {prob.left} {prob.op} {prob.right} = {prob.result}
            </span>
            </div>
        )
    }
}


class HistoricProblem extends React.Component {
    render() {
        let prob = this.props.problem
        let kls = prob.correct ? 'alert-success' : 'alert-danger'
        return (
            <div className={'row alert ' + kls} role={'alert'} id={'history'}>
            <span>
                {prob.left} {prob.op} {prob.right} = {prob.result}
            </span>
            </div>
        )
    }
}
