import React from 'react';
import PropTypes from 'prop-types';
import './PlaylistEntry.css';

class PlaylistEntry extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onLoad(this.props.playlist);
  }

  render() {
    const number = this.props.playlist.numberOfTracks;
    return (
      <li className="PlaylistEntry" key={this.props.playlist.id}>
        <div className="PlaylistEntry-information">
          <h3>{this.props.playlist.title}</h3>
          <p>{number} {number !== 1 ? 'songs' : 'song'}</p>
        </div>
        <button className="PlaylistEntry-action" onClick={this.handleClick}>Edit</button>
      </li>
    );
  }
}

PlaylistEntry.propTypes = {
  playlist: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    numberOfTracks: PropTypes.number.isRequired,
  }).isRequired,
  onLoad: PropTypes.func.isRequired
};

export default PlaylistEntry;
