import React from 'react';
import './App.css';
import SearchBar from '../components/SearchBar/SearchBar';
import SearchResults from '../components/SearchResults/SearchResults';
import Playlist from '../components/Playlist/Playlist';
import Playlists from '../components/Playlist/Playlists';
import Spotify from '../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: 'Search for a song, album or artist',
      searchResults: [],
      playlistTitle: 'Enter title',
      playlist: [],
      userplaylistId: undefined,
      userPlaylists: [],
    };
    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.search = this.search.bind(this);
    this.setPlaylistTitle = this.setPlaylistTitle.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    Spotify.getUserPlaylists().then(
      (playlists) => {
        console.log(`number of users playlists: ${playlists.length}`);
        this.setState({
          userPlaylists: playlists
        });
      },
    );
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
          searchTerm: 'Search for a song, album or artist',
          searchResults: result,
        });
      },
    );
  }
  save() {
    Spotify.save(this.state.playlistTitle, this.state.playlist);
    // .then(
    //   () => {
    //     this.setState({
    //       playlistTitle: 'Enter Title',
    //       playlist: [],
    //     });
    // },
    // );
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
        />
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
          <Playlists
            title="My stored Playlists"
            playlists={this.state.userPlaylists}
          />
        </div>
      </div>
    );
  }
}

export default App;
