export function buildProxyUrl(originalUrl: string): string {
  try {
    const url = new URL(originalUrl);
    // Only proxy allowed hosts; otherwise return original
    const allowed = ['images.unsplash.com', 'images.pexels.com', 'placehold.co', 'firebasestudio.ai'];
    if (!allowed.includes(url.hostname)) return originalUrl;
    // Return a relative API path to work on both server and client without needing window.location
    const encoded = encodeURIComponent(originalUrl);
    return `/api/image?url=${encoded}`;
  } catch {
    return originalUrl;
  }
}


