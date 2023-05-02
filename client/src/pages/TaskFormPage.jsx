import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { createTask, deleteTask, updateTask, getTask } from '../api/tasks.api';
import { useNavigate, useParams } from 'react-router-dom'

export function TaskFormPage() {

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    setValue
   } = useForm();

  const navigate = useNavigate() // Redirection
  const params = useParams() // Parameters

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data);
    } else {
      await createTask(data);
    }
    navigate("/tasks")
  })

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const res = await getTask(params.id)
        setValue('title', res.data.title)
        setValue('description', res.data.description)
      }
    }
    loadTask();
  }, [])

  return (
    <div>
      <form action="" onSubmit={onSubmit}>
        <input 
          type="text" 
          placeholder="Title" 
          {...register("title", { required: true })} 
        />
        {errors.title && <span>This field is required</span>}

        <textarea 
          name="" 
          cols="30" 
          rows="3" 
          placeholder="Description" 
          {...register("description", { required: true })} 
        ></textarea>
        {errors.description && <span>This field is required</span>}
        
        <button>Save</button>
      </form>

      {params.id && <button onClick={async () => {
        const accepted = window.confirm("Are you sure you want to Delete this task?")
        if (accepted) {
          await deleteTask(params.id)
          navigate("/tasks")
        }
      }}>Delete</button>}
    </div>
  )
}
