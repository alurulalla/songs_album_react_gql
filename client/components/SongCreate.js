import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {Link, hashHistory} from 'react-router';
import query from '../queries/fetchSongs'

class SongCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {title: ''};
    }

    addSong(event) {
        event.preventDefault();

        this.props.mutate({
            variables: {
                title: this.state.title
            },
            refetchQueries: [{
                query
            }]
        }).then(() => hashHistory.push('/'))
        .catch((error) => console.log(error))

    }

    render () {
        return (
            <div>
                <Link to='/'>Back</Link>
                <h3>Create a New Song</h3>
                <form onSubmit={this.addSong.bind(this)}>
                    <label>Song Title:</label>
                    <input type='text'
                    value={this.state.value}
                     onChange={event => this.setState({title: event.target.value})}/>
                </form>
            </div>
        )
    }
};

const mutation = gql`
mutation AddSong($title: String){
    addSong(title: $title) {
        title
    }
}
`;

export default graphql(mutation)(SongCreate);