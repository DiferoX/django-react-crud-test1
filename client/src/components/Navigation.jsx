import { Link } from "react-router-dom"

export function Navigation() {
  return (
    <div className="flex justify-between py-5 mb-5">
      <Link to='/tasks'>
        <h1 className="font-bold text-3xl">Task App</h1>
      </Link>
      <Link to='/tasks-create' className="bg-green-700 px-3 py-2 rounded-md">Create Task</Link>
    </div>
  )
}
