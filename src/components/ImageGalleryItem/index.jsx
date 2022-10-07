import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, onClick }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={webformatURL}
        data-url={largeImageURL}
        alt=""
        className={css.ImageGalleryItem__image}
        onClick={onClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
