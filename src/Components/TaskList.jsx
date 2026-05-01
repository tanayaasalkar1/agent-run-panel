import TaskCard from "./TaskCard";

export default function TaskList({ tasks }) {
  if (tasks.length === 0) {
    return <p className="text-gray-500 text-sm">Waiting for tasks...</p>;
  }

  // Group by parallel_group
  const groupedTasks = {};
  tasks.forEach(task => {
    const key = task.parallel_group || task.task_id;
    if (!groupedTasks[key]) groupedTasks[key] = [];
    groupedTasks[key].push(task);
  });

  return (
    <div className="p-5 bg-gray-900 border border-gray-800 rounded-xl">
      <div className="relative border-l border-gray-800 ml-4 space-y-6">
        {Object.values(groupedTasks).map((group, i) => (
          <div key={i}>
            {group.length > 1 && (
              <p className="text-xs text-purple-400 mb-2">Parallel Tasks</p>
            )}
            <div className={group.length > 1 ? "grid grid-cols-2 gap-3" : ""}>
              {group.map(task => (
                <TaskCard key={task.task_id} task={task} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}