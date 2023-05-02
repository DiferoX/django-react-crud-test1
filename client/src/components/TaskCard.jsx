import React from 'react'
import { useNavigate } from 'react-router-dom'

export function TaskCard({ task }) {
  const navigate = useNavigate()

  return (
    <div className='bg-transparent p-3 hover:bg-zinc-700 hover:cursor-pointer border border-white-500 rounded-md'

      onClick={() => {
        navigate(`/tasks/${task.id}`)
      }}
    >
      <h2 className='font-bold uppercase mb-4'>{task.title}</h2>
      <p className='text-slate-400 mb-2 capitalize'>{task.description}</p>
    </div>
  )
}
