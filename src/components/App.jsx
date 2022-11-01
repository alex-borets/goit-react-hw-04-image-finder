import css from './App.module.css';
import { useState, useEffect } from 'react';
import { getApi } from '../services/imagesApi';

import { Button } from './Button';
import { ImageGallery } from './ImageGallery';
import { Loader } from './Loader';
import { Modal } from './Modal';
import { Searchbar } from './Searchbar';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [largeImgUrl, setLargeImgUrl] = useState(null);

  useEffect(() => {
    if (!query) return;

    async function getImages() {
      setIsLoading(true);
      try {
        const data = await getApi(page, query);

        if (!data.length) {
          alert('There is no images were found');
        }

        const filteredImagesArr = data.map(
          ({ id, largeImageURL, webformatURL }) => {
            return { id, largeImageURL, webformatURL };
          }
        );
        setImages(prevImages => [...prevImages, ...filteredImagesArr]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getImages();
  }, [query, page]);

  const handleSubmit = e => {
    e.preventDefault();
    const inputValue = e.currentTarget.elements[1].value;
    setPage(1);
    setQuery(inputValue);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleLargeImageUrl = evt => {
    setLargeImgUrl(evt.target.dataset.url);
  };

  const closeModal = () => {
    setLargeImgUrl('');
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} onClick={handleLargeImageUrl} />
      )}
      {images.length > 0 && <Button onClick={handleLoadMore} />}
      {isLoading && <Loader />}
      {largeImgUrl && <Modal url={largeImgUrl} onClick={closeModal} />}
    </div>
  );
};

export default App;
