import React from 'react';
import './App.css';
import SearchBar from '../components/SearchBar/SearchBar';
import MessageBox from '../components/MessageBox/MessageBox';
import SearchResults from '../components/SearchResults/SearchResults';
import Playlist from '../components/Playlist/Playlist';
import Spotify from '../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
      playlistTitle: '',
      playlist: [],
      message: '',
    };
    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.search = this.search.bind(this);
    this.setPlaylistTitle = this.setPlaylistTitle.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.save = this.save.bind(this);
    this.onClearSearch = this.onClearSearch.bind(this);
  }

  onClearSearch() {
    this.setSearchTerm('');
  }
  setMessage(newMessage) {
    this.setState({
      message: newMessage,
    });
  }
  setSearchTerm(term) {
    this.setState({
      searchTerm: term,
    });
  }
  setPlaylistTitle(title) {
    this.setState({
      playlistTitle: title,
    });
  }
  search() {
    Spotify.search(this.state.searchTerm).then(
      (result) => {
        this.setState({
          searchTerm: '',
          searchResults: result,
        });
        if (result.length === 0) {
          this.setMessage('No matching tracks found.');
        }
      },
    ).catch(
      (error) => {
        this.setMessage(`${error}`);
      },
    );
  }
  save() {
    const playlistTitle = this.state.playlistTitle;
    const playlist = this.state.playlist;
    Spotify.save(playlistTitle, playlist).then(
      () => {
        this.setMessage(`successfully saved ${playlist.length} songs to playlist ${playlistTitle}`);
        this.setState({
          playlistTitle: '',
          playlist: [],
        });
      },
    ).catch(
      (error) => {
        this.setMessage(`${error}`);
      },
    );
  }
  addTrack(track) {
    const notInPlaylist = this.state.playlist.every(playlistTrack =>
      playlistTrack.id !== track.id);
    if (notInPlaylist) {
      this.setState({
        playlist: this.state.playlist.concat([track]),
      });
    }
  }
  removeTrack(track) {
    this.setState({
      playlist: this.state.playlist.filter(playlistTrack =>
        playlistTrack.id !== track.id,
      ),
    });
  }

  render() {
    return (
      <div className="App">
        <SearchBar
          term={this.state.searchTerm}
          onTermChange={this.setSearchTerm}
          onSearch={this.search}
          onClear={this.onClearSearch}
        />
        <MessageBox message={this.state.message} />
        <div className="App-playlist">
          <SearchResults
            tracks={this.state.searchResults}
            onAddTrack={this.addTrack}
          />
          <Playlist
            title={this.state.playlistTitle}
            tracks={this.state.playlist}
            onRemoveTrack={this.removeTrack}
            onTitleChange={this.setPlaylistTitle}
            onSave={this.save}
          />
        </div>
      </div>
    );
  }
}

export default App;
