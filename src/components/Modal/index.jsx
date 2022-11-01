import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ url, onClick }) => {
  const handleKeydown = evt => {
    if (evt.key === 'Escape') {
      onClick();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      console.log('Unmount');
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return (
    <div className={css.Overlay} onClick={() => onClick()}>
      <div className={css.Modal}>
        <img src={url} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
