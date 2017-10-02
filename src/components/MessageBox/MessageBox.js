import React from 'react';
import PropTypes from 'prop-types';
import './MessageBox.css';

function MessageBox({ message }) {
  return (
    <div className="MessageBox">{message}</div>
  );
}
MessageBox.propTypes = {
  message: PropTypes.string,
};
MessageBox.defaultProps = {
  message: '',
};

export default MessageBox;
