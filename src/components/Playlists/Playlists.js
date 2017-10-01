import React from 'react';
import PropTypes from 'prop-types';
import './Playlists.css';
import PlaylistEntry from './PlaylistEntry';

class Playlists extends React.Component {
  render() {
    return (
      <div className="PlaylistsContainer">
        <h2>My stored Playlists</h2>
        <ul className="Playlists">
          {this.props.playlists.map(playlist =>
            (<PlaylistEntry
              key={playlist.id}
              playlist={playlist}
              onLoad={this.props.onLoadPlaylist}
              onRemove={this.props.onRemovePlaylist} />
            )
          )}
        </ul>
      </div>
    );
  }
}
Playlists.propTypes = {
  playlists: PropTypes.arrayOf(PlaylistEntry.propTypes.playlist).isRequired,
  onLoadPlaylist: PropTypes.func.isRequired,
  onRemovePlaylist: PropTypes.func.isRequired,
};

export default Playlists;
