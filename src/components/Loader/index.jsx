import { Triangle } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
  <div className={css.Loader}>
    <Triangle
      height="80"
      width="80"
      color="#3f51b5"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  </div>;
};
