import React, { useEffect, useRef, useState } from "react";

interface IProps {
    src: string;
    alt: string;
}

const LazyLoadedImage: React.FC<IProps> = ({ src, alt }) => {

    const imageRef = useRef<HTMLImageElement | null>(null);
    const [imageSrc, setImageSrc] = useState('');
  
    useEffect(() => {
    const currentImageRef = imageRef.current;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.unobserve(entry.target);
          }
        });
      });
  
      if (imageRef) {
        observer.observe(imageRef?.current as HTMLImageElement);
      }
  
      return () => {
        if (imageRef) {
          observer.unobserve(currentImageRef as HTMLImageElement);
        }
      };
    }, [imageRef, src]);

  
    return <img ref={imageRef} src={imageSrc ?? ''} alt={alt ?? ''} />;
  };

  export default LazyLoadedImage;