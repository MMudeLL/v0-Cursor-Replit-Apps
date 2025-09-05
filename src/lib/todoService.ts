import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
  type DocumentData,
  type QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from './firebase';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Convert Firestore document to Todo interface
const convertFirestoreDocToTodo = (doc: QueryDocumentSnapshot<DocumentData>): Todo => {
  const data = doc.data();
  return {
    id: doc.id,
    text: data.text,
    completed: data.completed,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};

// Create a new todo
export const createTodo = async (text: string): Promise<Todo> => {
  try {
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, 'todos'), {
      text: text.trim(),
      completed: false,
      createdAt: now,
      updatedAt: now,
    });

    return {
      id: docRef.id,
      text: text.trim(),
      completed: false,
      createdAt: now,
      updatedAt: now,
    };
  } catch (error) {
    console.error('Error creating todo:', error);
    throw new Error('Failed to create todo');
  }
};

// Get all todos
export const getTodos = async (): Promise<Todo[]> => {
  try {
    const q = query(collection(db, 'todos'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(convertFirestoreDocToTodo);
  } catch (error) {
    console.error('Error getting todos:', error);
    throw new Error('Failed to fetch todos');
  }
};

// Update a todo
export const updateTodo = async (id: string, updates: Partial<Pick<Todo, 'text' | 'completed'>>): Promise<void> => {
  try {
    const todoRef = doc(db, 'todos', id);
    await updateDoc(todoRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating todo:', error);
    throw new Error('Failed to update todo');
  }
};

// Delete a todo
export const deleteTodo = async (id: string): Promise<void> => {
  try {
    const todoRef = doc(db, 'todos', id);
    await deleteDoc(todoRef);
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw new Error('Failed to delete todo');
  }
};

// Toggle todo completion status
export const toggleTodo = async (id: string, completed: boolean): Promise<void> => {
  return updateTodo(id, { completed });
};
