import React, { useState, useEffect } from 'react';
import { Loading } from 'react-loading-wrapper';
import 'react-loading-wrapper/dist/index.css';
import LoadingAnimation from './Loading';

const LoadingWrapper = (Component) => {
  return function WithLoadingComponent(props) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const handleLoad = () => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      };

      window.addEventListener('load', handleLoad);

      return () => {
        window.removeEventListener('load', handleLoad);
      };
    }, []);

    return (
      <Loading 
        loading={loading}
        fullPage
        size={100}
        speed='fast'
        loadingComponent={<LoadingAnimation />} 
      >
        <Component {...props} />
      </Loading>
    );
  };
};

export default LoadingWrapper;
