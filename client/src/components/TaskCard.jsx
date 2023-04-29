import React from 'react'
import { useNavigate } from 'react-router-dom'

export function TaskCard({ task }) {
  const navigate = useNavigate()

  return (
    <div style={{background: "#111"}}

      onClick={() => {
        navigate(`/tasks/${task.id}`)
      }}
    >
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <hr />
    </div>
  )
}
