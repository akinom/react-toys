import React from 'react';
import './App.css'
import {ChooseOneDivs} from "./Stateless";
import ThemedComponent from "./ThemedToy";
import {TwoSelectTables, SelectAndShow} from './TablesToys'
import {SubmitAndFilter} from './FormToy'

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'toys': { 'theme chooser' : (<ThemedComponent/>),
                'two tables' : (<TwoSelectTables/>),
                'choose image' : (<SelectAndShow/>),
                'filter table' : (<SubmitAndFilter/>),
                'undefined' : (<div> TODO </div>)},
            'toy_choice': 'theme chooser'
        }
    }

    chooseToy(toy) {
        this.setState({'toy_choice' : toy })
    }

    render() {
        let com = this.state.toys[this.state.toy_choice]
        return (
            <div>
                <div className={'container'}>
                    <h1>
                        Toy React Components
                    </h1>
                </div>
                <div className={'container'}>
                    <ChooseOneDivs id='toyChoice' choices={Object.keys(this.state.toys)} active={this.state.toy_choice}
                                   callback={this.chooseToy.bind(this)} />
                </div>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className='col-12 toyComponent'>
                            { com }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
