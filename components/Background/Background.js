import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import imagesJson from './images.json';

export const Background = ({ imageSources, framesPerSecond, ...props }) => {
  const canvasRef = useRef(null);
  const drawRef = useRef(Date.now());
  const imagesRef = useRef([]);
  const [isLoadingImages, setIsLoadingImages] = useState(true);

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
    const images = imagesRef.current;
    const image = images[frame];
    const interval = 1000 / framesPerSecond;
    const context = canvas.getContext('2d', { alpha: false });
    const nextFrame = frame + 1;
    const hasNextFrame = nextFrame < images.length - 1;

    return requestAnimationFrame(() => {
      const now = Date.now();
      const delta = now - drawRef.current;

      if (delta > interval) {
        drawRef.current = now - (delta % interval);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
          0,
          0,
          canvas.width,
          canvas.height
        );

        draw(hasNextFrame ? nextFrame : 0);
      } else {
        draw(frame);
      }
    });
  }

  useEffect(() => {
    const images = imageSources.map(preload);
    const hasLoaded = images.map(image => {
      return new Promise(resolve => {
        image.addEventListener('load', resolve);
      });
    });

    setIsLoadingImages(true);
    Promise.all(hasLoaded).then(() => setIsLoadingImages(false));
    imagesRef.current = images;
  }, [imageSources]);

  useEffect(() => {
    if (!isLoadingImages) {
      const animationFrame = draw();
      return function cleanup() {
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [isLoadingImages]);

  return <Canvas ref={canvasRef} background={imageSources[0]} {...props} />;
};

Background.propTypes = {
  imageSources: PropTypes.arrayOf(PropTypes.string),
  framesPerSecond: PropTypes.number,
};

Background.defaultProps = {
  imageSources: imagesJson.frames,
  framesPerSecond: 18,
};

const Canvas = styled.canvas`
  background: url(${props => props.background}) no-repeat top left;
  background-size: 100% 100%;
`;
