import { NewNote } from "@/types/note"
import { create } from 'zustand'
import { persist } from 'zustand/middleware'


type NoteDraftStore = {
    draft: NewNote;
    setDraft: (note: NewNote) => void;
    clearDraft: () => void;
}

const initialDraft: NewNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

const useNoteDraftStore = create<NoteDraftStore>() (persist((set) =>
({
    draft: initialDraft,
    setDraft: (note: NewNote) => set(() => ({ draft: note })),
    clearDraft: () => set(() => ({ draft: initialDraft })),
}),
   {
    name: 'note-draft',
        partialize: (state) => ({draft: state.draft }),
    }
 
));

export default useNoteDraftStore;