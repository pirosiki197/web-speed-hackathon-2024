import { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

const _Wrapper = styled.div`
  aspect-ratio: 16 / 9;
  width: 100%;
`;

const _Image = styled.img`
  display: inline-block;
  width: 100%;
`;

export const HeroImage: React.FC = () => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  const updateImage = useCallback(({ height, src, width }: { height: number; src: string; width: number }) => {
    const image = imageRef.current;
    if (image == null) {
      return;
    }
    image.width = width;
    image.height = height;
    image.src = src;
  }, []);

  useEffect(() => {
    const image = imageRef.current;
    if (image == null) {
      return;
    }

    const dpr = window.devicePixelRatio;
    const width = 4096 / dpr;
    const height = (width / 16) * 9;
    const imageWidth = image.clientWidth;
    const imageHeight = (imageWidth / 16) * 9;

    const cyberToonImage = '1c7027b8-eeb3-4f86-ad67-bba20e2c3e81.webp';

    updateImage({
      height: imageHeight,
      src: `/images/${cyberToonImage}?height=${height}&width=${width}`,
      width: imageWidth,
    });
  }, [imageRef, updateImage]);

  useEffect(() => {
    const resize = () => {
      const image = imageRef.current;
      if (image == null) {
        return;
      }

      const width = image.clientWidth;
      const height = (image.clientWidth / 16) * 9;

      updateImage({
        height,
        src: image.src, // Re-use the existing src
        width,
      });
    };

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [updateImage]);

  return (
    <_Wrapper>
      <_Image ref={imageRef} alt="Cyber TOON" />
    </_Wrapper>
  );
};
