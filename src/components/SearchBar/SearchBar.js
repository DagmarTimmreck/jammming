import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleTermChange = this.handleTermChange.bind(this);
  }
  handleTermChange(event) {
    this.props.onTermChange(event.target.value);
  }
  render() {
    return (
      <div className="SearchBar">
        <input
          onChange={this.handleTermChange}
          value={this.props.term}
          placeholder="Search for album, artist or song"
        />
        <div>
          <button onClick={this.props.onSearch} className="searchButton">SEARCH</button>
          <button onClick={this.props.onClear} className="clearButton">Clear</button>
        </div>
      </div>
    );
  }
}
SearchBar.propTypes = {
  term: PropTypes.string.isRequired,
  onTermChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default SearchBar;
