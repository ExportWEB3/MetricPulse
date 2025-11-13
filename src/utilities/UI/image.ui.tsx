import { useState, type CSSProperties } from "react";

/**
 * @param {Object} props
 * @param {Object} props.imageData - Imported image object from vite-imagetools
 * @param {string} props.alt - Image alt text
 * @param {string} [props.className] - Optional CSS classes
 * @param {Object} [props.style] - Optional style overrides
 */
type ImageSource = {
  srcset: string;
  type: string;
};

type ImageData = {
  img: {
    src: string;
    width: number;
    height: number;
  };
  sources: ImageSource[] | Record<string, string>;
  placeholder?: string;
};

interface OptimizedImageProps {
  imageData: ImageData | string;
  alt: string;
  className?: string;
  style?: CSSProperties;
}

export default function OptimizedImage({
  imageData,
  alt,
  className = "",
  style = {},
}: OptimizedImageProps & { imageData: string | any }) {
  const [isLoaded, setIsLoaded] = useState(false);

  // If imageData is just a string → fallback simple <img>
  if (typeof imageData === "string") {
    return (
      <img
        src={imageData}
        alt={alt}
        className={className}
        style={{ width: "100%", height: "auto", display: "block", ...style }}
      />
    );
  }

  // Normalize sources to an array if it's an object
  const sourcesArray: ImageSource[] = Array.isArray(imageData.sources)
    ? imageData.sources
    : Object.entries(imageData.sources || {}).map(([type, srcset]) => ({
        type: `image/${type}`,
        srcset,
      }));

  return (
    <div
      style={{
        position: "relative",
        width: `${imageData.img.width}px`,
        height: `${imageData.img.height}px`,
        overflow: "hidden",
        ...style,
      }}
      className={className}
    >
      {/* Placeholder blur */}
      {!isLoaded && imageData.placeholder && (
        <img
          src={imageData.placeholder}
          alt=""
          aria-hidden="true"
          style={{
            filter: "blur(20px)",
            transform: "scale(1.1)",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      )}

      {/* Responsive image with AVIF/WebP fallback */}
      <picture>
        {sourcesArray.map((source, index) => (
          <source
            key={`${source.type}-${index}`}
            srcSet={source.srcset}
            type={source.type}
          />
        ))}
        <img
          src={imageData.img.src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          width={imageData.img.width}
          height={imageData.img.height}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            objectFit: "cover",
            transition: "opacity 0.3s ease",
            opacity: isLoaded ? 1 : 0,
          }}
        />
      </picture>
    </div>
  );
}
