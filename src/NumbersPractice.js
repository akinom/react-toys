import React  from 'react';
var AnswerStats = require('./models/AnswerStats')
var LeveledProblemGenerator = require('./models/LeveledProblemGenerator')
var Problem = require('./models/Problem')
var helper = require('./models/helper')

export class PresentPracticeProblems extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [],
            problem: null,
            stats: new AnswerStats(),
            problemGenerator: new LeveledProblemGenerator(),
            leveledUp : false,
            topLevelRounds: 1,
            test: true
        }
        this.state.problem = this.newProblem()
        if (this.state.test) {
            this.state.levelUpThreshold = 2
        } else {
            this.state.levelUpThreshold = 12
        }
        console.log('PresentPracticeProblems created state ' + JSON.stringify(this.state))
    }

    newProblem() {
        let p = new Problem()
        p.generate(this.state.problemGenerator);
        console.log('PresentPracticeProblems created problem' + JSON.stringify(p))
        return p
    }

    handleSubmit() {
        let updateProblem = this.state.problem
        console.log('PresentPracticeProblems handleSubmit ' + JSON.stringify(updateProblem))
        let leveledUp = false;
        this.state.history.push( (<ProblemComponent problem={updateProblem} mode={'solution'} highlight={! updateProblem.isCorrect()}/> ) )
        this.state.stats.countAnswer(updateProblem.isCorrect())
        if ((this.state.stats.nConsecCorrect % this.state.levelUpThreshold ) === 0 && this.state.stats.nConsecCorrect > 0) {
            let levelDescr = this.state.problemGenerator.getLevelDescription();
            if (this.state.problemGenerator.atTopLevel()) {
                this.state.topLevelRounds += 1
            }
            leveledUp = true;
            this.state.problemGenerator.changeLevelBy(1)
            this.state.history.push( (<Message message={'Finished ' + levelDescr} /> ) )
        }
        console.log(JSON.stringify(this.state.stats))
        this.setState({
            problem: this.newProblem(),
            history: this.state.history,
            stats: this.state.stats,
            leveledUp: leveledUp
        })
    }

    render() {
        console.log('< PresentPracticeProblems render.return ' + JSON.stringify(this.state))
        let levelDescr = this.state.problemGenerator.getLevelDescription();
        let feedbackMsg = ''
        if (this.state.topLevelRounds > 1) {
            feedbackMsg = helper.ordinal_str(this.state.topLevelRounds) + ' Time '
        }
        feedbackMsg += 'Working on ' + levelDescr
        return (
            <div className='container-sm'>
                <div className={'row'}>
                     <h2>  Practice {levelDescr} </h2>
                </div>
                <div className={'row theProblem'}>
                    <ProblemComponent problem={this.state.problem} mode='form' callback={this.handleSubmit.bind(this)} />
                </div>

                <div className={'row'}>
                    <div className={'col alert alert-success shortCol'}>
                        <span> {this.state.stats.ncorrect} correct </span>
                    </div>
                    <div className={'col alert'}>
                        <Feedback stats={this.state.stats} limit={this.state.levelUpThreshold} message={feedbackMsg}/>
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
        console.log('> render ' + JSON.stringify(this.props))
        let events = this.props.history

        const KLS_SELECTION = {
            undefined: 'alert list-group-item list-group-item-primary',
            false: 'alert list-group-item list-group-item-success',
            true: 'alert list-group-item list-group-item-danger'
        }
        //let showResult = this.state.mode ==='showResults'
        let display = []
        for (let i = events.length - 1; i >= 0; i--) {
            let event = events[i]
            display.push(<li key={i} className={KLS_SELECTION[event.props.highlight]}>{event}</li>)
        }

        console.log('< render.return ' + JSON.stringify(this.props))
        return (
            <ul className="list-group problemList">
                {display}
            </ul>
        )
    }
}

class ProblemComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = { input :  '' }
    }

    trackInput(event) {
        this.setState( { input: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.problem.answer = parseInt(this.state.input)
        this.setState({input: ''})
        this.props.callback()
    }

    render() {
        console.log('< render ' + JSON.stringify(this.props))
        if (this.props.mode === 'solution') {
            return this.renderSolution()
        } else {
            return this.renderForm()
        }
    }

    renderSolution() {
        let problem = this.props.problem
        console.log('< render.solution ' + JSON.stringify(this.props)  + ' ' + JSON.stringify(this.state))
        return (  <span>
                {problem.left} {problem.op} {problem.right} = {problem.result}
            </span> )
    }

    renderForm() {
        console.log('< render.form ' + JSON.stringify(this.props)  + ' ' + JSON.stringify(this.state))
        let problem = this.props.problem
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="input-group">
                    <div className="input-group-prepend">
                                    <span className="input-group-text">
                                         {problem.left} {problem.op} {problem.right} &nbsp; =
                                    </span>
                    </div>
                    <input type="number" className="form-control" value={this.state.input}
                           onChange={this.trackInput.bind(this)}/>
                    <input type="submit" style={{display: 'none'}}/>
                </div>
            </form>
        )
    }
}

class Message extends React.Component {
    constructor(props) {
        super(props)
        this.state = { message : props.message}
    }

    render() {
        return (<span>{this.state.message}   </span>)
    }
}

