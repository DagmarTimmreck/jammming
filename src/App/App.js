import React from 'react';
import './App.css';
import SearchBar from '../components/SearchBar/SearchBar';
import MessageBox from '../components/MessageBox/MessageBox';
import SearchResults from '../components/SearchResults/SearchResults';
import Playlist from '../components/Playlist/Playlist';
import Playlists from '../components/Playlists/Playlists';
import Spotify from '../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
      playlistTitle: '',
      playlist: [],
      userPlaylists: [],
      message: '',
    };
    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.search = this.search.bind(this);
    this.loadUserPlaylists = this.loadUserPlaylists.bind(this);
    this.setPlaylistTitle = this.setPlaylistTitle.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.save = this.save.bind(this);
    this.onClearSearch = this.onClearSearch.bind(this);
    this.loadPlaylist = this.loadPlaylist.bind(this);
    this.removePlaylist = this.removePlaylist.bind(this);
  }

  componentDidMount() {
    this.loadUserPlaylists();
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

  loadUserPlaylists() {
    Spotify.getUserPlaylists().then(
      (playlists) => {
        this.setMessage(`number of users playlists: ${playlists.length}`);
        this.setState({
          userPlaylists: playlists,
        });
      },
    );
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
        this.loadUserPlaylists();
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

  addTracks(tracks) {
    const currentTrackIds = this.state.playlist.map(track => track.id);
    const newTracks = tracks.filter(track => !currentTrackIds.includes(track.id));
    if (newTracks) {
      this.setState({
        playlist: this.state.playlist.concat(newTracks),
      });
      this.setMessage(`updated ${newTracks.length} songs in new playlist`);
    }
  }

  removeTrack(track) {
    this.setState({
      playlist: this.state.playlist.filter(playlistTrack =>
        playlistTrack.id !== track.id,
      ),
    });
  }

  loadPlaylist(playlist) {
    this.setMessage(`should load playlist '${playlist.title}'`);
    Spotify.loadTracks(playlist.id).then(
      (tracks) => {
        this.setMessage(`loaded ${tracks.length} songs from the playlist.`);
        // no default title => don't overwrite
        if (this.state.playlistTitle === 'Enter title') {
          this.setPlaylistTitle(`Copy of ${playlist.title}`);
        }
        // update the list of tracks
        this.addTracks(tracks);
      },
    );
  }

  removePlaylist(playlist) {
    this.setMessage(`should remove playlist '${playlist.title}'`);
    Spotify.remove(playlist.id).then(
      () => this.loadUserPlaylists());
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
          <Playlists
            title="My stored Playlists"
            playlists={this.state.userPlaylists}
            onLoadPlaylist={this.loadPlaylist}
            onRemovePlaylist={this.removePlaylist}
          />
        </div>
      </div>
    );
  }
}

export default App;
