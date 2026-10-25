import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Note | NoteHub',
  description: 'Create and save your personal notes with NoteHub.',
  openGraph: {
    title: 'Create Note | NoteHub',
    description: 'Create and save your personal notes with NoteHub.',
    url: 'https://notehub.com/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Create Note | NoteHub',
      },
    ],
  },
};

const CreateNote = async () => {
 

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm  />
      </div>
    </main>
  );
};

export default CreateNote;
