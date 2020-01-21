import React from 'react';
import {ChooseOneDivs} from  './Stateless'

export default class ThemedComponent extends React.Component {
    static Maintext = ['Esse eiusmod et qui officia esse ullamco ipsum deserunt irure. In mollit ' +
        'deserunt excepteur consectetur labore laboris aliquip anim. Labore sint dolore laboris qui ' +
        'ut qui dolor duis aliquip in aliquip commodo duis. Est minim aliqua culpa eiusmod.',
        'Elit dolor proident ipsum labore pariatur veniam do ea ullamco aliqua laboris do. Ut nulla dolor ' +
        'qui dolore sunt non sunt laboris. Nostrud magna velit culpa sunt aute ea ad cupidatat quis. '
        ]

    constructor(props) {
        super(props);
        let availableThemes = {'Light Theme': 'light', 'Dark Theme': 'dark'}
        this.state = {
            'themeList': availableThemes,
            'activeTheme': 'Light Theme'
        }
    }

    themeChange(theme) {
        this.setState({'activeTheme' : theme } )
    }

    render() {
        return (
            <div className={this.state.themeList[this.state.activeTheme] + ' container'}>
                <div className={'row'}>
                    <ChooseOneDivs id='themeChoice'  choices={Object.keys(this.state.themeList)}  active={this.state.activeTheme} callback={this.themeChange.bind(this)} />
                </div>

                <div className={'row'}>
                    {ThemedComponent.Maintext.map((line, index) => (<p key={index}>{line}</p>))}
                </div>
            </div>
        );
    }
}

