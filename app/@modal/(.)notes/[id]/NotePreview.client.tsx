'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '../../../../lib/api';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';
import { useRouter } from 'next/navigation';

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id as string),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (isError || !note) {
    return <p>Something went wrong.</p>;
  }

  return (
    <Modal
      onClose={() => {
        router.back();
      }}
    >
      <div className={css.container}>
        <button className={css.backBtn} onClick={() => router.back()}>
          Back
        </button>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{new Date(note.createdAt).toLocaleDateString()}</p>
      </div>
    </Modal>
  );
}
