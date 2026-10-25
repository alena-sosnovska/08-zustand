'use client';

import css from './NoteForm.module.css';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createNote } from '../../lib/api';
import type { NewNote } from '../../types/note';
import useNoteDraftStore from '@/lib/store/noteStore';

const NoteForm = () => {
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setDraft({ ...draft, [event.target.name]: event.target.value });
  };

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      router.push('/notes/filter/all');
    },
  });

  const handleCancel = () => {
    router.push('/notes/filter/all');
  };

  const handleSubmit = (formData: FormData) => {
    const value = Object.fromEntries(formData) as unknown as NewNote;
    mutate(value);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label className={css.label}>Title</label>
        <input
          type="text"
          name="title"
          className={css.input}
          defaultValue={draft?.title}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>Content</label>
        <textarea
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft?.content}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>Tag</label>
        <select name="tag" className={css.select} defaultValue={draft?.tag} onChange={handleChange}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.submitButton}>
          Create
        </button>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
