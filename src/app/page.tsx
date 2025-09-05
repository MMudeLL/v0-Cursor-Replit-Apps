"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingCard } from "@/components/ui/loading"
import { ErrorMessage } from "@/components/ui/error"
import { ToastContainer } from "@/components/ui/toast"
import { Trash2, Edit2, Check, X, Plus, Calendar, Clock } from "lucide-react"
import { useTodos } from "@/hooks/useTodos"
import { useToast } from "@/hooks/useToast"
import { Todo } from "@/lib/todoService"

export default function TodoApp() {
  const [newTodo, setNewTodo] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")
  const [isAdding, setIsAdding] = useState(false)

  const { todos, loading, error, addTodo, updateTodo, toggleTodo, deleteTodo, refreshTodos } = useTodos()
  const { toasts, removeToast, success, error: showError } = useToast()

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return

    try {
      setIsAdding(true)
      await addTodo(newTodo)
      setNewTodo("")
      success("Todo added successfully!")
    } catch (err) {
      showError("Failed to add todo", "Please try again")
    } finally {
      setIsAdding(false)
    }
  }

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id)
      success("Todo deleted successfully!")
    } catch (err) {
      showError("Failed to delete todo", "Please try again")
    }
  }

  const handleToggleComplete = async (id: string) => {
    try {
      await toggleTodo(id)
      const todo = todos.find(t => t.id === id)
      if (todo) {
        success(todo.completed ? "Todo marked as incomplete" : "Todo completed!")
      }
    } catch (err) {
      showError("Failed to update todo", "Please try again")
    }
  }

  const startEditing = (id: string, text: string) => {
    setEditingId(id)
    setEditText(text)
  }

  const saveEdit = async () => {
    if (!editText.trim() || !editingId) return

    try {
      await updateTodo(editingId, editText)
      setEditingId(null)
      setEditText("")
      success("Todo updated successfully!")
    } catch (err) {
      showError("Failed to update todo", "Please try again")
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText("")
  }

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter") {
      action()
    }
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return ""
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString()
  }

  const formatTime = (timestamp: any) => {
    if (!timestamp) return ""
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Toast Container */}
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6 px-4 shadow-lg">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center">Todo List App</h1>
          <p className="text-center mt-2 text-primary-foreground/80">Stay organized and get things done with Firebase</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Add New Todo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Task
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter a new task..."
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleAddTodo)}
                  className="flex-1"
                  disabled={isAdding}
                />
                <Button 
                  onClick={handleAddTodo} 
                  disabled={!newTodo.trim() || isAdding}
                >
                  {isAdding ? "Adding..." : "Add"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Todo List */}
          <Card>
            <CardHeader>
              <CardTitle>Your Tasks ({todos.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <LoadingCard />
              ) : error ? (
                <ErrorMessage error={error} onRetry={refreshTodos} />
              ) : todos.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No tasks yet. Add one above to get started!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {todos.map((todo) => (
                    <div
                      key={todo.id}
                      className={`flex items-start gap-3 p-4 rounded-lg border transition-colors ${
                        todo.completed ? "bg-muted/50" : "bg-card hover:bg-muted/30"
                      }`}
                    >
                      <button
                        onClick={() => handleToggleComplete(todo.id)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-colors ${
                          todo.completed
                            ? "bg-primary border-primary text-primary-foreground"
                            : "border-muted-foreground hover:border-primary"
                        }`}
                      >
                        {todo.completed && <Check className="h-3 w-3" />}
                      </button>

                      {editingId === todo.id ? (
                        <div className="flex-1 flex gap-2">
                          <Input
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyPress={(e) => handleKeyPress(e, saveEdit)}
                            className="flex-1"
                            autoFocus
                          />
                          <Button size="sm" onClick={saveEdit} disabled={!editText.trim()}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={cancelEdit}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex-1 min-w-0">
                          <span
                            className={`block ${
                              todo.completed ? "line-through text-muted-foreground" : "text-foreground"
                            }`}
                          >
                            {todo.text}
                          </span>
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>Created: {formatDate(todo.createdAt)}</span>
                            </div>
                            {todo.updatedAt && todo.updatedAt !== todo.createdAt && (
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>Updated: {formatDate(todo.updatedAt)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {editingId !== todo.id && (
                        <div className="flex gap-1">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => startEditing(todo.id, todo.text)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteTodo(todo.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats */}
          {todos.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Total: {todos.length}</span>
                  <span>Completed: {todos.filter((t) => t.completed).length}</span>
                  <span>Remaining: {todos.filter((t) => !t.completed).length}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-6 px-4 mt-auto">
        <div className="max-w-2xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 Todo List App. Built with React, Next.js, and Firebase</p>
          <p className="text-sm mt-1">Stay productive and organized with real-time sync!</p>
        </div>
      </footer>
    </div>
  )
}
