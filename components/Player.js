import React, { useState, useEffect, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { rem, rgba } from 'polished';
import slugify from 'slugify';
import ConditionalWrap from 'conditional-wrap';
import { usePlayer } from '@/hooks/usePlayer';
import { visuallyHidden } from '@/styles/mixins';
import { theme } from '@/styles/theme';
import { get } from '@/utils/get';
import { Link } from '@/components/Link';
import { Icon } from '@/components/Icon';
import { Button, IconButton } from '@/components/Button';
import lyrics from '@/data/lyrics.json';

const slugifyOpts = { lower: true, remove: /[*+~.()'"!:@]/g };

const Player = props => {
  const {
    player,
    playlist,
    activeTrackIndex,
    isLoading,
    isPlaying,
    isBlocked,
    onPlay,
    onPause,
    onNext,
    onPrevious,
  } = usePlayer();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const title = get(['tracks', activeTrackIndex, 'title'], playlist);
  const lyricsSlug = title && slugify(title, slugifyOpts);
  const hasLyricsPage = lyrics.tracks.some(track => track.slug === lyricsSlug);
  const playButtonRef = useRef();

  useEffect(() => {
    if (!player) return;

    player.on('ended', onNext);
    return function cleanup() {
      player.off('ended', onNext);
    };
  }, [player]);

  useEffect(() => {
    if (isBlocked) {
      setIsModalOpen(true);
    }
  }, [isBlocked]);

  function handlePermissionGranted() {
    onPlay();
    setIsModalOpen(false);
  }

  return (
    <>
      <section {...props}>
        <Title>Now playing</Title>
        <ConditionalWrap
          condition={hasLyricsPage}
          wrap={children => (
            <Link href={`/lyrics/${lyricsSlug}`}>{children}</Link>
          )}
        >
          <Track>{title}</Track>
        </ConditionalWrap>

        <Controls>
          <PlayerButton onClick={onPrevious} disabled={isLoading}>
            <Icon type="previous-track" />
          </PlayerButton>
          {isPlaying ? (
            <LargePlayerButton onClick={onPause} disabled={isLoading}>
              <Icon type="pause" />
            </LargePlayerButton>
          ) : (
            <LargePlayerButton
              onClick={() => onPlay()}
              ref={playButtonRef}
              disabled={isLoading}
            >
              <Icon type="play" style={{ marginLeft: 6 }} />
            </LargePlayerButton>
          )}
          <PlayerButton onClick={onNext} disabled={isLoading}>
            <Icon type="next-track" />
          </PlayerButton>
        </Controls>
      </section>
      {isModalOpen && (
        <AutoPlayPermission>
          <AutoPlayPermissionModal>
            <h2 style={{ marginBottom: 5 }}>
              Can we autoplay our music for you?
            </h2>
            <p>
              We&apos;d like to give you the full Kindred Shins experience but
              you can play it manually later if you prefer.
            </p>
            <Button onClick={handlePermissionGranted}>Sure, go ahead</Button>
            <Button hasMargin onClick={() => setIsModalOpen(false)}>
              No thanks
            </Button>
          </AutoPlayPermissionModal>
        </AutoPlayPermission>
      )}
    </>
  );
};

const Title = styled.div`
  ${visuallyHidden};
`;

const Track = styled.a`
  margin: 0;
  position: absolute;
  white-space: nowrap;
  font-size: ${rem(14)};
  color: ${rgba(theme.foreground, 0.5)};
  text-decoration: none;

  &[href] {
    cursor: pointer;
    transition: color 200ms;

    &:hover,
    &:focus {
      color: ${theme.foreground};
    }
  }

  @media (max-width: 684px) {
    right: 100%;
    top: 5px;
    margin-right: 10px;
    max-width: 110px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (min-width: 685px) {
    top: -0.5em;
    left: 50%;
    right: auto;
    transform: translate(-50%, -100%);
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
`;

const PlayerButton = styled(IconButton)`
  &:disabled {
    cursor: wait;

    ${Icon} {
      display: none;
    }
  }
`;

const LargePlayerButton = styled(PlayerButton)`
  margin: 0 5px;

  @media (min-width: 685px) {
    width: 62px;
    height: 62px;

    ${Icon} {
      width: 26px;
      height: 26px;
    }
  }
`;

const fadeIn = keyframes`
  0% {opacity: 0 }
  100% { opacity: 1 }
`;

const AutoPlayPermission = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${rgba(theme.background, 0.9)};
  animation: ${fadeIn} 200ms;
`;

const AutoPlayPermissionModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${theme.foreground};
  color: ${theme.background};
  padding: 20px;
  border-radius: 3px;
  max-width: 500px;
  min-width: 300px;
`;

export { Player };
