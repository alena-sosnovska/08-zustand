import NotesClient from './Notes.client';
import { fetchNotes } from '../../../../lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';
import Loader from '../../../loading';
import { Metadata } from 'next';

type SlugProps = {
  params: Promise< {
    slug: string[];
  }>;
};

export async function generateMetadata({ params }: SlugProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];
  // const {  } = await fetchNotes('', 1, 12, tag);

  return {
    title: `Notes - ${tag}`,
    description: `Browse notes tagged as ${tag}`,
    openGraph: {
      title: `Notes - ${tag}`,
      description: `Browse notes tagged as ${tag}`,
      url: 'https://notehub.com/',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Notes - ${tag}`,
        },
      ],
    },
  };
}

async function NotesPage({ params }: SlugProps) {
  const queryClient = new QueryClient();
  const {slug} = await params;
  const tag = slug[0];

  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1, tag],
    queryFn: () => fetchNotes('', 1, 12, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}

export default function Page({ params }: SlugProps) {
  return (
    <Suspense fallback={<Loader />}>
      <NotesPage params={params} />
    </Suspense>
  );
}
