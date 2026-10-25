'use client';
import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import NoteList from '../../../../components/NoteList/NoteList';
import Pagination from '../../../../components/Pagination/Pagination';
import SearchBox from '../../../../components/SearchBox/SearchBox';
import { fetchNotes } from '../../../../lib/api';
import css from './page.module.css';
import Loader from '../../../loading';
import ErrorMessage from './error';
import Link from 'next/link';

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 12;

  const useGetNotes = (searchText: string, page: number) => {
    return useQuery({
      queryKey: ['notes', searchText, page, tag],
      queryFn: () => fetchNotes(searchText, page, perPage, tag),
      placeholderData: keepPreviousData,
    });
  };

  const handleSearch = useDebouncedCallback((searchText: string) => {
    setInputValue(searchText);
    setPage(1);
  }, 300);

  const { data, isLoading, isError, error } = useGetNotes(inputValue, page);
  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onChange={handleSearch} />
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            onPageChange={({ selected }) => setPage(selected + 1)}
            forcePage={page - 1}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          {' '}
          Create note +{' '}
        </Link>
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage error={error} />}
      {notes && notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}
