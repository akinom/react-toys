import React from 'react';

export class ChooseOneDivs extends React.Component {
    constructor(props) {
        super(props);
        this.stdProps = Object.assign({}, props)
        delete this.stdProps['callback']
        delete this.stdProps['choices']
        delete this.stdProps['active']
    }

    render() {
        let handler = (e) => {
            return this.props.callback(this.props.choices[e.currentTarget.id])
        }
        return (<div {...this.stdProps}>
            {this.props.choices.map((choice, index) =>
                (<div className={(choice === this.props.active) ? 'active' : 'not-active'}
                      key={index} id={index}
                      onClick={handler}>{choice}
                </div>))}
        </div>)
    }
}

export class SelectionTable extends React.Component {
    constructor(props) {
        super(props);
        console.log('create SelectionTable');
        this.stdProps = Object.assign({}, props)
        delete this.stdProps['data']
        delete this.stdProps['headers']
        delete this.stdProps['callback']
        delete this.stdProps['selectedRow']
    }

    handleClick(e) {
        this.props.callback(parseInt(e.currentTarget.id))
    }

    render() {
        console.log('render SelectionTable');
        let lst = this.props.data;
        let hrds = this.props.headers;
        let rowProps = (this.props.callback) ? {onClick: this.handleClick.bind(this)} : {}
        return (
            <table {...this.stdProps} className={['selectionTable', 'table', this.props.className].join(' ')}>
                <thead>
                <tr>
                    {hrds.map((h, index) => <th scope='col' key={index}>{h}</th>)}
                </tr>
                </thead>
                <tbody>
                {
                    lst.map((info, index) => {
                        let prps = {id: index, key: index}
                        if (index === this.props.selectedRow) {
                            prps['className'] = 'selected'
                        }
                        return (<tr {...prps} onClick={rowProps.onClick}>
                                {hrds.map((h, index) => <td key={index}>{info[h]}</td>)}
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>)
    }
}
