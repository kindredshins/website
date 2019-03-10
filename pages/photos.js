import React, { useEffect, useState } from 'react';
import getConfig from 'next/config';
import fetch from 'fetch-jsonp';
import styled from 'styled-components';
import { Page, PageSidebar, PageBody } from '@/components/Page';
import { Loader } from '@/components/Loader';

const { publicRuntimeConfig: config } = getConfig();
const { INSTAGRAM_USER_ID, INSTAGRAM_TOKEN } = config;
const PHOTO_URI = `https://api.instagram.com/v1/users/${INSTAGRAM_USER_ID}/media/recent?access_token=${INSTAGRAM_TOKEN}`;

const Photos = () => {
  const [photos, setPhotos] = useState();
  const isLoading = !photos;

  useEffect(() => {
    if (photos) return;

    fetch(PHOTO_URI)
      .then(response => response.json())
      .then(res => {
        const photos = res.data.map(photo => ({
          src: photo.images.low_resolution.url,
          caption: photo.caption.text,
          url: photo.link,
        }));

        setPhotos(photos);
      });
  }, [photos]);

  return (
    <Page>
      <PageSidebar title="Photos" />
      <PageBody>
        {isLoading ? (
          <Loader>Loading&hellip;</Loader>
        ) : (
          <Gallery>
            {photos.map(photo => (
              <GalleryItem key={photo.src}>
                <GalleryLink href={photo.url} target="_blank">
                  <Photo src={photo.src} alt={photo.caption} />
                </GalleryLink>
              </GalleryItem>
            ))}
          </Gallery>
        )}
      </PageBody>
    </Page>
  );
};

const Gallery = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const GalleryItem = styled.article`
  flex: 0 0 50%;

  @media (min-width: 600px) {
    flex: 0 0 33%;
  }

  @media (min-width: 768px) and (max-width: 900px) {
    flex: 0 0 50%;
  }
`;

const GalleryLink = styled.a`
  display: block;
`;

const Photo = styled.img`
  margin: 0;
  display: block;
  max-width: 100%;
`;

export default Photos;
