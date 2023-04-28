import { useForm } from 'react-hook-form'
import { createTask } from '../api/tasks.api';
import { useNavigate } from 'react-router-dom'

export function TaskFormPage() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate() // Redirection

  const onSubmit = handleSubmit(async (data) => {
    const res = await createTask(data);
    //console.log(res);
    navigate("/tasks")
  })

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
    </div>
  )
}
