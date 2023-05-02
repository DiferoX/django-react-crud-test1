import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { createTask, deleteTask, updateTask, getTask } from '../api/tasks.api';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

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
      toast.success('Task successfully updated', {
        position: "top-right",
        style: {
          background: "green",
          color: "white",
          border: "1px solid green",
          padding: "10px",
          borderRadius: "5px",
        }
      })
    } else {
      await createTask(data);
      toast.success('Task successfully created', {
        position: "top-right",
        style: {
          background: "green",
          color: "white",
          border: "1px solid green",
          padding: "10px",
          borderRadius: "5px",
        }
      })
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
    <div className='max-w-xl mx-auto'>
      <form action="" onSubmit={onSubmit}>
        <input 
          type="text" 
          placeholder="Title" 
          {...register("title", { required: true })} 
          className='bg-zinc-700 p-3 rounded-md block w-full mb-3'
        />
        {errors.title && <span>This field is required</span>}

        <textarea 
          name="" 
          cols="30" 
          rows="5" 
          placeholder="Description" 
          {...register("description", { required: true })} 
          className='bg-zinc-700 p-3 rounded-md block w-full mb-3 resize-none'
        ></textarea>
        {errors.description && <span>This field is required</span>}
        
        <button className='bg-green-700 p-3 rounded-md block w-full mt-5'>Save</button>
      </form>

      {params.id && 
        <div className='flex justify-end'>
          <button 
            className='bg-red-700 p-3 rounded-md block mt-5 w-48'
            onClick={async () => {
              const accepted = window.confirm("Are you sure you want to Delete this task?")
              if (accepted) {
                await deleteTask(params.id)
                toast.success('Task successfully deleted', {
                  position: "top-right",
                  style: {
                    background: "green",
                    color: "white",
                    border: "1px solid green",
                    padding: "10px",
                    borderRadius: "5px",
                  }
                })
                navigate("/tasks")
              }
            }}
          >
            Delete
          </button>
        </div>
      }
    </div>
  )
}
