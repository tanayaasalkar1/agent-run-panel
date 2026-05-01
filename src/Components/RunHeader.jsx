import ThoughtBubble from "./agent_thought";
import { formatElapsed } from "../utils/formatElapsed";

export default function RunHeader({ run, tasks, coordinatorThoughts }) {
  return (
    <div className={`p-5 border rounded-xl ${
      run.status === 'running'  ? 'bg-blue-950/30 border-blue-800/50' :
      run.status === 'complete' ? 'bg-green-950/30 border-green-800/50' :
      run.status === 'failed'   ? 'bg-red-950/30 border-red-800/50' :
      'bg-gray-900 border-gray-800'
    }`}>

      <p className="text-xs text-gray-500 mb-1">Query</p>
      <p className="text-sm text-gray-100 leading-relaxed">{run.query}</p>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span className={`text-xs px-2 py-1 rounded border font-medium ${
          run.status === 'running'  ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
          run.status === 'complete' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
          run.status === 'failed'   ? 'bg-red-500/20 text-red-300 border-red-500/30' : ''
        }`}>
          {run.status === 'running'  ? '⟳ Running' :
           run.status === 'complete' ? '✓ Complete' :
           run.status === 'failed'   ? '✕ Failed' : run.status}
        </span>

        {run.status === 'running' && (
          <span className="text-xs text-gray-400">⏱ {formatElapsed(run.elapsedMs)}</span>
        )}

        {run.status === 'complete' && (
          <span className="text-xs text-gray-400">
            {tasks.length} tasks · {formatElapsed(run.elapsedMs)}
          </span>
        )}

        {run.status === 'failed' && (
          <span className="text-xs text-red-400">Run encountered an unrecoverable error</span>
        )}
      </div>

      {coordinatorThoughts.length > 0 && (
        <div className="mt-3">
          <ThoughtBubble thoughts={coordinatorThoughts} />
        </div>
      )}

    </div>
  );
}