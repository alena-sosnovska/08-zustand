import { Suspense } from 'react';

import Loader from '@/app/loading';
import { fetchNoteById } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) : Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);
  return {
    title: note.title,
    description: note.content,
    openGraph: {
      title: note.title,
      description: note.content,
      url: `https://notehub.com/notes/${id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    },
  };
}

async function NoteDetailPage({ params }: PageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ['note', id], queryFn: () => fetchNoteById(id) });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}
export default function Page({ params }: PageProps) {
  return (
    <Suspense fallback={<Loader />}>
      <NoteDetailPage params={params} />
    </Suspense>
  );
}
