import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

class LyricCreate extends  Component {
    constructor( props) {
        super(props);
        this.state = {content: ''}
    }

    addLyric(event) {
        event.preventDefault();

        this.props.mutate({
            variables: {
                id: this.props.songId,
                content: this.state.content
            }
        }).then(() => {
            console.log('Successfully Lyric added to the song');
            this.setState({content: ''})});

    }

    render() {
        return (
            <form onSubmit={this.addLyric.bind(this)}>
                <label>Add a lyric</label>
                <input value={this.state.content} onChange={e => this.setState({content: e.target.value})}/>
            </form>
        )
    }
}

const mutation = gql`
mutation AddLyric($id: ID, $content: String) {
    addLyricToSong(songId: $id, content: $content) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);