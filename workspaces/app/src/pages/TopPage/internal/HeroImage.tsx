// import { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
// import { Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, TextureLoader, WebGLRenderer } from 'three';

const _Wrapper = styled.div`
  aspect-ratio: 16 / 9;
  width: 100%;
`;

const _Image = styled.img`
  display: inline-block;
  width: 100%;
`;

export const HeroImage: React.FC = () => {
  // const imageRef = useRef<HTMLImageElement | null>(null);
  // const canvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));

  // const updateImage = useCallback(({ height, src, width }: { height: number; src: string; width: number }) => {
  //   const image = imageRef.current;
  //   if (image == null) {
  //     return;
  //   }
  //   image.width = width;
  //   image.height = height;
  //   image.src = src;
  // }, []);

  // useEffect(() => {
  //   const image = imageRef.current;
  //   if (image == null) {
  //     return;
  //   }

  //   // width が 4096 / dpr の 16:9 の画像として描画する。
  //   const width = 4096 / window.devicePixelRatio;
  //   const height = (width / 16) * 9;
  //   const imageWidth = image.clientWidth;
  //   const imageHeight = (imageWidth / 16) * 9;

  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext('2d');
  //   if (ctx == null) {
  //     return;
  //   }

  //   const img = new Image();
  //   img.src = '/assets/hero.webp'
  //   img.onload = () => {
  //     canvas.width = width;
  //     canvas.height = height;

  //     ctx.drawImage(img, 0, 0, width, height);

  //     updateImage({
  //       height: imageHeight,
  //       src: canvas.toDataURL(),
  //       width: imageWidth,
  //     });
  //   };
  // }, [imageRef, updateImage]);

  // useEffect(() => {
  //   const resize = () => {
  //     const image = imageRef.current;
  //     if (image == null) {
  //       return;
  //     }

  //     const width = image.clientWidth;
  //     const height = (image.clientWidth / 16) * 9;
  //     updateImage({
  //       height,
  //       src: canvasRef.current.toDataURL(),
  //       width,
  //     });
  //   };

  //   window.addEventListener('resize', resize);

  //   return () => {
  //     window.removeEventListener('resize', resize);
  //   };
  // }, [updateImage]);

  return (
    <_Wrapper>
      <_Image alt="Cyber TOON" loading='eager' src="/assets/hero.webp" />
    </_Wrapper>
  );
};
