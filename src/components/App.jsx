import css from './App.module.css';
import { Component } from 'react';
import { getApi } from '../services/imagesApi';

import { Button } from './Button';
import { ImageGallery } from './ImageGallery';
import { Loader } from './Loader';
import { Modal } from './Modal';
import { Searchbar } from './Searchbar';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    queryName: '',
    isLoading: false,
    largeImgUrl: '',
  };

  componentDidUpdate(_, prevState) {
    if (
      (!prevState.images || prevState.queryName !== this.state.queryName) &&
      !this.state.isLoading
    ) {
      this.getImages();
    } else if (prevState.page < this.state.page && !this.state.isLoading) {
      this.getMoreImages();
    }
  }

  getImages = () => {
    const { queryName } = this.state;

    this.setState({ isLoading: true });

    getApi(1, queryName)
      .then(data => {
        if (!data.length) {
          alert('There is no images were found');
        }

        const filteredImagesArr = data.map(
          ({ id, largeImageURL, webformatURL }) => {
            return { id, largeImageURL, webformatURL };
          }
        );
        this.setState({
          images: filteredImagesArr,
          page: 1,
        });
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  getMoreImages = () => {
    const { page, queryName } = this.state;
    this.setState({ isLoading: true });
    getApi(page, queryName)
      .then(data => {
        if (!data.length) {
          alert('No more images were found');
        }
        const filteredImagesArr = data.map(
          ({ id, largeImageURL, webformatURL }) => {
            return { id, largeImageURL, webformatURL };
          }
        );
        this.setState(prevState => ({
          images: [...prevState.images, ...filteredImagesArr],
        }));
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const inputValue = evt.currentTarget.elements[1].value;
    this.setState({
      queryName: inputValue,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleLargeImageUrl = evt => {
    this.setState({
      largeImgUrl: evt.target.dataset.url,
    });
  };

  closeModal = () =>
    this.setState({
      largeImgUrl: '',
    });

  render() {
    const { images, isLoading, largeImgUrl } = this.state;
    const { handleSubmit, handleLoadMore, handleLargeImageUrl } = this;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={handleSubmit} />
        {images.length > 0 && (
          <ImageGallery images={images} onClick={handleLargeImageUrl} />
        )}
        {images.length > 0 && <Button onClick={handleLoadMore} />}
        {isLoading && <Loader />}
        {largeImgUrl && <Modal url={largeImgUrl} onClick={this.closeModal} />}
      </div>
    );
  }
}
