import { useState, useEffect, forwardRef } from 'react';
import { LazyImageProps } from '../../types';

const LazyImage = forwardRef<HTMLImageElement, LazyImageProps>(({ src, alt, style }, ref) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
    };
  }, [src]);

  return <img ref={ref} src={imageSrc || undefined} alt={alt} style={style} />;
});

export default LazyImage;