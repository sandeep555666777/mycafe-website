import { NextResponse } from 'next/server';

export const runtime = 'edge';

const ALLOWED_HOSTS = new Set([
  'images.unsplash.com',
  'images.pexels.com',
  'placehold.co',
  'firebasestudio.ai',
]);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const target = searchParams.get('url');
    if (!target) {
      return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
    }

    let parsed: URL;
    try {
      parsed = new URL(target);
    } catch {
      return NextResponse.json({ error: 'Invalid url' }, { status: 400 });
    }

    if (!ALLOWED_HOSTS.has(parsed.hostname)) {
      return NextResponse.json({ error: 'Host not allowed' }, { status: 403 });
    }

    // Normalize common params for better CDN behavior
    if (parsed.hostname.includes('images.unsplash.com')) {
      parsed.searchParams.set('auto', 'format');
      parsed.searchParams.set('w', parsed.searchParams.get('w') || '1200');
      parsed.searchParams.set('q', parsed.searchParams.get('q') || '80');
    }
    if (parsed.hostname.includes('images.pexels.com')) {
      parsed.searchParams.set('auto', 'compress');
      parsed.searchParams.set('cs', 'tinysrgb');
      parsed.searchParams.set('w', parsed.searchParams.get('w') || '1200');
    }

    const upstream = await fetch(parsed.toString(), {
      // Prevent upstream from receiving your site as referrer
      referrer: 'no-referrer',
      headers: {
        'Accept': 'image/avif,image/webp,image/*,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (compatible; ImageProxy/1.0)'
      },
      // Revalidate on the server as needed
      cache: 'no-store',
    });

    if (!upstream.ok) {
      return NextResponse.json({ error: 'Upstream fetch failed' }, { status: 502 });
    }

    const contentType = upstream.headers.get('content-type') || 'image/jpeg';
    const data = await upstream.arrayBuffer();

    const response = new NextResponse(data, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
      },
    });
    return response;
  } catch (err) {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}


