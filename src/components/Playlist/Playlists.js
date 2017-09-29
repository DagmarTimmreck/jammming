import React from 'react';
import PropTypes from 'prop-types';
import './Playlist.css';
import PlaylistEntry from './PlaylistEntry';

class Playlists extends React.Component {
  render() {
    return (
      <div className="MyPlaylists">
        <h2>My stored Playlists</h2>
        <ul className="Playlists">
          {this.props.playlists.map(playlist =>
            <PlaylistEntry key={playlist.id} playlist={playlist} onLoad={this.props.onLoadPlaylist} />
          )}
        </ul>
      </div>
    );
  }
}
Playlists.propTypes = {
  playlists: PropTypes.arrayOf(PlaylistEntry.propTypes.playlist).isRequired,
  onLoadPlaylist: PropTypes.func.isRequired,
};

export default Playlists;
