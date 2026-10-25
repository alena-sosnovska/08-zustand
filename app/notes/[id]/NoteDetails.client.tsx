'use client';

import {fetchNoteById} from '../../../lib/api';
import { useQuery } from '@tanstack/react-query';
import css from './NoteDetails.module.css';
import { useRouter } from 'next/navigation';

interface NoteDetailsClientProps {
  id: string;
}   

const NoteDetailsClient = ({ id }: NoteDetailsClientProps) => {
    const router = useRouter();
    const { data: note, isLoading, isError } = useQuery({
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
        <main className={css.main}>
            <div className={css.container}>
                 <button className={css.backBtn} onClick={() => router.back()}>
                    Back
                 </button>
                <div className={css.item}>
                    <div className={css.header}>
                        <h2>{note.title}</h2>
                    </div>
                    <p className={css.tag}>{note.tag}</p>
                    <p className={css.content}>{note.content}</p>
                    <p className={css.date}>{new Date(note.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        </main>)
}

export default NoteDetailsClient;

       