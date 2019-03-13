import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Background = ({ framesPerSecond, ...props }) => {
  const canvasRef = useRef();
  const reqAnimFrameRef = useRef();
  const currentFrameRef = useRef(0);
  const drawDiffRef = useRef(Date.now());
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (images.length) return;

    const isLargerDevice = window.matchMedia('(min-width: 768px)');
    const framesPath = isLargerDevice.matches ? 'frames-medium' : 'frames';
    const preloadingImages = [...Array(525)]
      .map((_, index) => `/static/images/background/${framesPath}/${index}.jpg`)
      .map(preload);
    const hasLoaded = preloadingImages.slice(0, 15).map(image => {
      return new Promise(resolve => {
        image.addEventListener('load', resolve);
      });
    });

    Promise.all(hasLoaded).then(() => {
      setImages(preloadingImages);
    });
  }, [images, setImages]);

  useEffect(() => {
    if (images.length) {
      draw();
      return stop;
    }
  }, [images, draw, stop]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const isDrawing = Boolean(reqAnimFrameRef.current);

      if (document.hidden) {
        stop();
      } else if (!isDrawing) {
        draw();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return function cleanup() {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      stop();
    };
  }, [draw, stop]);

  const draw = useCallback(
    function draw(frame = currentFrameRef.current) {
      const canvas = canvasRef.current;
      if (!canvas || !images.length) return;

      reqAnimFrameRef.current = requestAnimationFrame(() => {
        const now = Date.now();
        const delta = now - drawDiffRef.current;
        const interval = 1000 / framesPerSecond;

        if (delta > interval) {
          const nextFrame = frame + 1;
          const image = images[frame];
          const context = canvas.getContext('2d', { alpha: false });
          const imageRect = [0, 0, image.width, image.height];
          const canvasRect = [0, 0, canvas.width, canvas.height];
          const hasNextFrame = nextFrame < images.length - 1;
          drawDiffRef.current = now - (delta % interval);
          context.clearRect(...canvasRect);
          context.drawImage(image, ...imageRect, ...canvasRect);
          currentFrameRef.current = hasNextFrame ? nextFrame : 0;

          draw(currentFrameRef.current);
        } else {
          draw(frame);
        }
      });
    },
    [images, framesPerSecond]
  );

  function stop() {
    cancelAnimationFrame(reqAnimFrameRef.current);
    reqAnimFrameRef.current = undefined;
  }

  return <Canvas ref={canvasRef} {...props} />;
};

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
