import { useState, useEffect, useCallback } from 'react';
import { Todo, createTodo, getTodos, updateTodo, deleteTodo, toggleTodo } from '@/lib/todoService';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load todos from Firebase
  const loadTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const todosData = await getTodos();
      setTodos(todosData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load todos');
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a new todo
  const addTodo = useCallback(async (text: string) => {
    try {
      setError(null);
      const newTodo = await createTodo(text);
      setTodos(prev => [newTodo, ...prev]);
      return newTodo;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add todo');
      throw err;
    }
  }, []);

  // Update a todo
  const updateTodoText = useCallback(async (id: string, text: string) => {
    try {
      setError(null);
      await updateTodo(id, { text: text.trim() });
      setTodos(prev => 
        prev.map(todo => 
          todo.id === id 
            ? { ...todo, text: text.trim(), updatedAt: new Date() as any }
            : todo
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
      throw err;
    }
  }, []);

  // Toggle todo completion
  const toggleTodoCompletion = useCallback(async (id: string) => {
    try {
      setError(null);
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      const newCompleted = !todo.completed;
      await toggleTodo(id, newCompleted);
      setTodos(prev => 
        prev.map(t => 
          t.id === id 
            ? { ...t, completed: newCompleted, updatedAt: new Date() as any }
            : t
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle todo');
      throw err;
    }
  }, [todos]);

  // Delete a todo
  const removeTodo = useCallback(async (id: string) => {
    try {
      setError(null);
      await deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
      throw err;
    }
  }, []);

  // Load todos on mount
  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  return {
    todos,
    loading,
    error,
    addTodo,
    updateTodo: updateTodoText,
    toggleTodo: toggleTodoCompletion,
    deleteTodo: removeTodo,
    refreshTodos: loadTodos,
  };
};
