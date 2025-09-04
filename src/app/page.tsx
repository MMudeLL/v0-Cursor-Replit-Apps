"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Edit2, Check, X, Plus } from "lucide-react"

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState("")

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }])
      setNewTodo("")
    }
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const startEditing = (id: number, text: string) => {
    setEditingId(id)
    setEditText(text)
  }

  const saveEdit = () => {
    if (editText.trim() && editingId) {
      setTodos(todos.map((todo) => (todo.id === editingId ? { ...todo, text: editText.trim() } : todo)))
      setEditingId(null)
      setEditText("")
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6 px-4 shadow-lg">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center">Todo List App</h1>
          <p className="text-center mt-2 text-primary-foreground/80">Stay organized and get things done</p>
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
                  onKeyPress={(e) => handleKeyPress(e, addTodo)}
                  className="flex-1"
                />
                <Button onClick={addTodo} disabled={!newTodo.trim()}>
                  Add
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
              {todos.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No tasks yet. Add one above to get started!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {todos.map((todo) => (
                    <div
                      key={todo.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        todo.completed ? "bg-muted/50" : "bg-card"
                      }`}
                    >
                      <button
                        onClick={() => toggleComplete(todo.id)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
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
                        <>
                          <span
                            className={`flex-1 ${
                              todo.completed ? "line-through text-muted-foreground" : "text-foreground"
                            }`}
                          >
                            {todo.text}
                          </span>
                          <Button size="sm" variant="ghost" onClick={() => startEditing(todo.id, todo.text)}>
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteTodo(todo.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
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
          <p>&copy; 2024 Todo List App. Built with React and Next.js</p>
          <p className="text-sm mt-1">Stay productive and organized!</p>
        </div>
      </footer>
    </div>
  )
}
