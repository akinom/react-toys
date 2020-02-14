import React from 'react';
import './App.css'
import {TimesTable} from './NumbersPractice'

export class App extends React.Component {
    render() {
        return (
            <div className={'container'}>
                <div id={'title'} className={'row'}>
                    <h1>
                        Arithmetic Practice
                    </h1>
                </div>
                <div className={'row'}>
                    <div className={'container'}>
                        <div className={'row'}>
                            <div className='col-12 toyComponent'>
                                <TimesTable />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
