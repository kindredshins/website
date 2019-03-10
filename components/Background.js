import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Background = ({ framesPerSecond, ...props }) => {
  const canvasRef = useRef();
  const drawDiffRef = useRef(Date.now());
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (images.length) return;

    const isLargerDevice = window.matchMedia('(min-width: 768px)');
    const framesPath = isLargerDevice.matches ? 'frames-medium' : 'frames';
    const preloadingImages = [...Array(525)]
      .map((_, index) => `/static/images/background/${framesPath}/${index}.jpg`)
      .map(preload);
    const hasLoaded = preloadingImages.map(image => {
      return new Promise(resolve => {
        image.addEventListener('load', resolve);
      });
    });

    Promise.all(hasLoaded.slice(0, 15)).then(() => {
      setImages(preloadingImages);
    });
  }, [images]);

  useEffect(() => {
    if (images.length) {
      const animationFrame = draw();
      return function cleanup() {
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [images]);

  function preload(image) {
    const preloader = new Image();

    // preload after other page resources
    // have completed to avoid blocking
    if (document.readyState === 'complete') {
      preloader.src = image;
    } else {
      window.addEventListener('load', () => {
        preloader.src = image;
      });
    }

    return preloader;
  }

  function draw(frame = 0) {
    const canvas = canvasRef.current;
    const interval = 1000 / framesPerSecond;
    const nextFrame = frame + 1;

    if (!canvas || !images.length) return;

    const image = images[frame];
    const context = canvas.getContext('2d', { alpha: false });
    const hasNextFrame = nextFrame < images.length - 1;

    return requestAnimationFrame(() => {
      const now = Date.now();
      const delta = now - drawDiffRef.current;

      if (delta > interval) {
        const imageRect = [0, 0, image.width, image.height];
        const canvasRect = [0, 0, canvas.width, canvas.height];
        drawDiffRef.current = now - (delta % interval);
        context.clearRect(...canvasRect);
        context.drawImage(image, ...imageRect, ...canvasRect);

        draw(hasNextFrame ? nextFrame : 0);
      } else {
        draw(frame);
      }
    });
  }

  return <Canvas ref={canvasRef} {...props} />;
};

Background.propTypes = {
  framesPerSecond: PropTypes.number,
};

Background.defaultProps = {
  framesPerSecond: 18,
};

const Canvas = styled.canvas`
  background: url('/static/images/background/background.jpg') no-repeat top left;
  background-size: 100% 100%;
`;
