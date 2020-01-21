import React from 'react';
import {SelectionTable} from './Stateless'

export class SubmitAndFilter extends React.Component {
    constructor(props) {
        super(props);
        let urls = [
            {name: 'fog', loc: 'towpath'},
            {name: 'END 45', loc: 'NYC'},
            {name: 'winter trees', loc: 'princeton campus'},
            {name: 'snowy Nassau Hall', loc: 'princeton campus'},
            {name: 'city dreams', loc: 'NYC'}
        ];

        this.state = {
            'urls': urls,
            'urlsMatched': urls,
            'filter': ''
        }
    }

    handleSubmit(event) {
        // prevent submission - aka prevent page reload
        event.preventDefault();
        this.filterUrls(this.state.filter);
    };

    setFilter(event) {
        console.log(event.target.value)
        this.setState({'filter': event.target.value});
    }

    filterUrls(filter) {
        if (filter) {
            this.setState({'urlsMatched': this.state.urls.filter(((elem) => elem.loc === filter))})
        } else {
            this.setState({'urlsMatched': this.state.urls});
        }
    }

    render() {
        return (
            <div className={'container-fluid'}>
                <div>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        Location:
                        <input type="text" name="loc" value={this.state.filter}  onChange={this.setFilter.bind(this)}/>
                            <button>Filter</button>
                    </form>
                </div>
                <div>
                    <SelectionTable headers={['loc', 'name']} data={this.state.urlsMatched}/>
                </div>
            </div>
        );
    }
}

