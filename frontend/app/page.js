'use client'

import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:5000'

export default function Home() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const response = await fetch(`${API_URL}/todos`)
      if (!response.ok) throw new Error('Failed to fetch todos')
      const data = await response.json()
      setTodos(data)
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  // Add todo
  const handleAddTodo = async (e) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('Title is required')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create todo')
      }

      const newTodo = await response.json()
      setTodos([newTodo, ...todos])
      setTitle('')
      setDescription('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Toggle completed
  const handleToggleComplete = async (id, completed) => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed })
      })

      if (!response.ok) throw new Error('Failed to update todo')

      const updatedTodo = await response.json()
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo))
    } catch (err) {
      setError(err.message)
    }
  }

  // Delete todo
  const handleDeleteTodo = async (id) => {
    if (!confirm('Are you sure you want to delete this todo?')) return

    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete todo')

      setTodos(todos.filter(todo => todo.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-800 mb-3">
            ✨ My Tasks
          </h1>
          <p className="text-gray-600">Stay organized, stay productive</p>
        </div>

        {/* Stats Cards */}
        {todos.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <p className="text-3xl font-bold text-indigo-600 mb-1">{todos.length}</p>
              <p className="text-sm text-gray-600">Total Tasks</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <p className="text-3xl font-bold text-green-600 mb-1">{todos.filter(t => t.completed).length}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <p className="text-3xl font-bold text-orange-600 mb-1">{todos.filter(t => !t.completed).length}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </div>
        )}

        {/* Add Todo Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <form onSubmit={handleAddTodo} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="What's on your mind?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none text-gray-800 placeholder-gray-400 transition-all"
              />
            </div>
            <div>
              <textarea
                placeholder="Add some details... (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="2"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none resize-none text-gray-800 placeholder-gray-400 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold shadow-sm hover:bg-indigo-700 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '✨ Adding...' : '✨ Add New Task'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="text-6xl mb-4">🎯</div>
              <p className="text-lg text-gray-700 font-medium mb-2">No tasks yet!</p>
              <p className="text-sm text-gray-500">Create your first task above to get started</p>
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-start gap-4 hover:shadow-md transition-all"
              >
                <div className="flex items-center pt-1">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo.id, todo.completed)}
                    className="w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className={`text-lg font-semibold mb-1 ${
                    todo.completed 
                      ? 'line-through text-gray-400' 
                      : 'text-gray-800'
                  }`}>
                    {todo.title}
                  </h3>
                  {todo.description && (
                    <p className={`text-sm mb-2 ${
                      todo.completed 
                        ? 'line-through text-gray-400' 
                        : 'text-gray-600'
                    }`}>
                      {todo.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-400">
                    {new Date(todo.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })} at {new Date(todo.createdAt).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>

                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
                  title="Delete task"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
