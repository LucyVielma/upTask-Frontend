import type { Task } from "@/types/index"
import TaskCard from "./TaskCard"
import { statusTranslations } from "@/locales/es"

type TaskListProps = {
    tasks: Task[]
}

type GroupedTasks = {
    [key: string]: Task[]
}

const initialStatusGroups : GroupedTasks = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: []
}

const statusStyles: { [key: string]: string } = {
  pending: "border-t-black text-black hover:border-t-blue-900 hover:shadow-[0_-4px_20px_rgba(30,58,138,0.5)] transition-all duration-300",
  
  onHold: "border-t-slate-500 text-slate-600 hover:border-t-slate-400 hover:shadow-[0_-4px_20px_rgba(148,163,184,0.5)] transition-all duration-300",
  
  inProgress: "border-t-indigo-900 text-indigo-900 hover:border-t-indigo-700 hover:shadow-[0_-4px_20px_rgba(67,56,202,0.5)] transition-all duration-300",
  
  underReview: "border-t-indigo-500 text-indigo-800 hover:border-t-indigo-400 hover:shadow-[0_-4px_20px_rgba(99,102,241,0.5)] transition-all duration-300",
  
  completed: "border-t-purple-500 text-purple-800 hover:border-t-purple-400 hover:shadow-[0_-4px_20px_rgba(168,85,247,0.5)] transition-all duration-300"
};

export default function TaskList({tasks} : TaskListProps) {
    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups);

  return (
    <>
        <h2 className="text-5xl font-black my-10">Tareas</h2>
        
        <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
            {Object.entries(groupedTasks).map(([status, tasks]) => (
                <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                    <h3 className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusStyles[status]} `}>{statusTranslations[status]}</h3>

                    <ul className='mt-5 space-y-5'>
                        {tasks.length === 0 ? (
                            <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                        ) : (
                            tasks.map(task => <TaskCard key={task._id} task={task} />)
                        )}
                    </ul>
                </div>
            ))}
        </div>
    </>
  )
}
