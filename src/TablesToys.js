import React from 'react';
import {SelectionTable} from './Stateless'

export class TwoSelectTables extends React.Component {
    constructor(props) {
        super(props);
        console.log('create TwoSelectTables');
        this.state = {
            tables: TwoSelectTables.TableData,
            active: [undefined, undefined]
        }
    }

    static TableData = [[{name: 'fog', loc: 'towpath'}, {name: 'END 45', loc: 'NYC'}, { name: 'city dreams', loc: 'NYC' }],
        [{city: 'Bonn', country: 'Germany'}, {city: 'Paris', country: 'France'},
            { city: 'London', country: 'Great Britain' }, {city: 'Moscow', country: 'Russia'}]];

    handleTableClick(table, index) {
        let act = this.state.active.slice()
        act[table] = index
        this.setState({'active': act})
    }

    renderTable(indx) {
        let tblData = this.state.tables[indx]
        let hdler = (rowIndx) => {
            this.handleTableClick(indx, rowIndx)
        }
        return <SelectionTable data={tblData} headers={Object.keys(tblData[indx])} selectedRow={this.state.active[indx]}
                               callback={hdler.bind(this)}/>
    }

    render() {
        console.log("render TwoSelectTables");
        return <div className={'container'}>
            <div className={'row'}>
                <em> select and highlight a row </em>
            </div>
            <div className={'row'}>
                <div className={'col-6'}>
                    {this.renderTable(0)}
                </div>
                <div className={'col-6'}>
                    {this.renderTable(1)}
                </div>
            </div>
        </div>
    }
}



export class SelectAndShow extends React.Component {
    constructor(props) {
        super(props);
        let urls = [
            {
                name: 'fog',
                loc: 'towpath',
                url: 'https://66.media.tumblr.com/fd0d93bbabc48cd939cd3129dfeb34a0/954c8a1bb6a7a0d9-22/s500x750/b334544e0efb62a0d5862b42c41df60ad932b244.jpg'
            },
            {
                name: 'END 45',
                loc: 'NYC',
                url: 'https://66.media.tumblr.com/8b1482e618c08b3a8ad28167bee52fea/98f281bc4a3449fa-2a/s500x750/a014e86c9ff68d47d45617a0f9dee77fcae8c56e.jpg'
            },
            {
                name: 'winter trees',
                loc: 'princeton campus',
                url: 'https://66.media.tumblr.com/dda2f790b9f47a0cb0c73f348af8f8fc/279e1fd78ba20e3d-8c/s500x750/809430757e396e0eff3d3592452ea25f7442addd.jpg'
            },
            {
                name: 'snowy Nassau Hall',
                loc: 'princeton campus',
                url: 'https://66.media.tumblr.com/65519c7d867662af44a7931a1fb3006e/f460322e5804fc9e-07/s500x750/84bec3ca8fff79d3b477b42915701b302cdf9ada.jpg'
            },
            {
                name: 'city dreams',
                loc: 'NYC',
                url: 'https://66.media.tumblr.com/b983e0d9ed1a12846c4e88d98fd6eaab/38d3ca1479da7024-57/s500x750/b54fec8000c795639789abc9f8f5888763e58dcf.jpg'
            }
        ];

        this.state = {
            'urls': urls,
            'urlPick': null
        }
    }

    urlPick(infoId) {
        console.log(this.state.urls[infoId])
        let url = this.state.urls[infoId]
        this.setState({'urlPick': url});
    }

    render() {
        console.log('render SelectAndShow');
        let image = this.state.urlPick ?
            <img src={this.state.urlPick.url}
                 alt={'Image showing ' + this.state.urlPick.name + ' near ' + this.state.urlPick.loc}/> :
            <p>Please select something </p>
        return (<div {...this.props} className={'container'}>
            <div className={'row'}>
                <em> click on row and see related image </em>
            </div>
            <div className={'row'}>
                <div className={'col-6'}>
                    <SelectionTable headers={['name', 'loc']} data={this.state.urls} callback={this.urlPick.bind(this)}/>
                </div>
                <div className={'col-6'}>
                    {image}
                </div>
            </div>
        </div>)
    }
}
