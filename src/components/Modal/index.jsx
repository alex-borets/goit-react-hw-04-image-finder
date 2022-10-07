import { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export class Modal extends Component {
  handleKeyDown = evt => {
    if (evt.key === 'Escape') {
      this.props.onClick();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { url } = this.props;
    return (
      <div className={css.Overlay} onClick={() => this.props.onClick()}>
        <div className={css.Modal}>
          <img src={url} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
