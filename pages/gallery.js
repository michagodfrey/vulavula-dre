import React, { useState, useEffect } from "react";
import { PostWidget, Categories, Pages } from '../components';

import PhotoAlbum from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

import { getGalleries } from '../services'

const Gallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    getGalleries()
      .then((newGalleries) => setGalleries(newGalleries));
  }, []);

  const photos = [];

  galleries.forEach((gallery) => {
    gallery.images.forEach((image) => {
      const photo = {
        src: image.url,
        width: 400,
        height: 300,
      }
      photos.push(photo);
    })
  });

  const slides = photos.map(({ src, width, height }) => ({
    src,
    width,
    height,
  }));

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
            <PhotoAlbum
              layout="rows"
              photos={photos}
              onClick={({ index }) => setIndex(index)}
            />
            <Lightbox
              open={index >= 0}
              index={index}
              close={() => setIndex(-1)}
              slides={slides}
            />
          </div>
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget />
            <Pages />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery