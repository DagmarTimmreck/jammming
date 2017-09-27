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
        <input value={this.props.term} onChange={this.handleTermChange} onFocus={this.props.onFocus} onBlur={this.props.onBlur} />
        <button onClick={this.props.onSearch}>SEARCH</button>
      </div>
    );
  }
}
SearchBar.propTypes = {
  term: PropTypes.string.isRequired,
  onTermChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
