// lib/firestore.ts
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';

const notesCol = (uid: string) => collection(db, 'users', uid, 'notes');

export const saveRawNote = async (uid: string, content: string, title: string) => {
  const docRef = await addDoc(notesCol(uid), {
    content,
    createdAt: serverTimestamp(),
    updatedAt: null,
    title,
    refined: false,
  });
  return docRef.id;
};

export const updateNote = async (
  uid: string,
  noteId: string,
  data: Partial<{ content: string; title: string; refined: boolean }>
) => {
  const ref = doc(db, 'users', uid, 'notes', noteId);
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
};
