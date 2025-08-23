"use client";

import Image, { ImageProps } from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { buildProxyUrl } from '@/lib/imageProxy';

type RemoteImageProps = Omit<ImageProps, 'src'> & {
  src: string;
  fallbackSrc?: string;
};

export default function RemoteImage(props: RemoteImageProps) {
  const { src, fallbackSrc, alt, onError, ...rest } = props;
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const hasRetriedRef = useRef<boolean>(false);

  const resolvedFallback = useMemo(() => {
    if (fallbackSrc && fallbackSrc.length > 0) return fallbackSrc;
    // Default placeholder: 800x600 neutral background
    return 'https://placehold.co/800x600?text=Image+unavailable';
  }, [fallbackSrc]);

  const isLocal = typeof src === 'string' && src.startsWith('/');

  const addQueryParam = (url: string, paramString: string): string => {
    try {
      const hasQuery = url.includes('?');
      return hasQuery ? `${url}&${paramString}` : `${url}?${paramString}`;
    } catch {
      return url;
    }
  };

  const buildRetryUrl = (url: string): string => {
    try {
      const u = new URL(url);
      if (u.hostname.includes('images.pexels.com')) {
        // Encourage CDN to serve compressed, web-friendly size
        return addQueryParam(url, 'auto=compress&cs=tinysrgb&w=1200');
      }
      if (u.hostname.includes('images.unsplash.com')) {
        return addQueryParam(url, 'auto=format&w=1200&q=80');
      }
      return url;
    } catch {
      return url;
    }
  };

  useEffect(() => {
    // For local assets, use as-is. For remote, route via proxy.
    if (isLocal) {
      setCurrentSrc(src);
    } else {
      const proxied = buildProxyUrl(src);
      setCurrentSrc(proxied);
    }
  }, [src, isLocal]);

  return (
    <Image
      {...rest}
      alt={alt || 'image'}
      src={currentSrc || (fallbackSrc ?? 'data:,')}
      // Helps with some CDNs that block hotlinking based on referrer
      referrerPolicy="no-referrer"
      onError={(e) => {
        if (isLocal) {
          // For local images, immediately fall back (no retry logic)
          if (currentSrc !== resolvedFallback) {
            setCurrentSrc(resolvedFallback);
          }
          if (onError) onError(e);
          return;
        }
        // First, attempt a single retry with CDN-friendly params if applicable
        if (!hasRetriedRef.current) {
          hasRetriedRef.current = true;
          const retried = buildRetryUrl(src);
          if (retried !== currentSrc) {
            setCurrentSrc(retried);
            return;
          }
        }
        // If retry already attempted or not applicable, fall back
        if (currentSrc !== resolvedFallback) {
          setCurrentSrc(resolvedFallback);
        }
        if (onError) onError(e);
      }}
      placeholder="blur"
      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMScgaGVpZ2h0PScxJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLz4="
    />
  );
}


