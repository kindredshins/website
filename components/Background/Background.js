import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import imagesJson from './images.json';

export const Background = ({ imageSources, framesPerSecond, ...props }) => {
  const canvasRef = useRef();
  const drawDiffRef = useRef(Date.now());
  const [images, setImages] = useState([]);

  useEffect(() => {
    const images = imageSources.map(preload);
    images.map(image => {
      image.addEventListener('load', () => setImages([...images, image]));
    });
  }, [imageSources]);

  useEffect(() => {
    if (images.length) {
      const animationFrame = draw();
      return function cleanup() {
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [images.length]);

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
