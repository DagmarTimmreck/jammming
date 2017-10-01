import React from 'react';
import PropTypes from 'prop-types';
import './Playlist.css';
import TrackList from '../../components/TrackList/TrackList';
import Track from '../TrackList/Track/Track';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }
  handleTitleChange(event) {
    this.props.onTitleChange(event.target.value);
  }
  render() {
    const action = {
      symbol: '-',
      func: this.props.onRemoveTrack,
    };
    return (
      <div className="Playlist">
        <input
          value={this.props.title}
          placeholder="Enter title"
          onChange={this.handleTitleChange}
        />
        <TrackList tracks={this.props.tracks} action={action} />
        <button className="Playlist-save" onClick={this.props.onSave} >SAVE TO SPOTIFY</button>
      </div>
    );
  }
}
Playlist.propTypes = {
  title: PropTypes.string.isRequired,
  tracks: PropTypes.arrayOf(Track.propTypes.track).isRequired,
  onRemoveTrack: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Playlist;
