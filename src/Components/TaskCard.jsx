import ThoughtBubble from "./agent_thought";
import ToolCallList from "./ToolCallList";

export default function TaskCard({ task }) {
  return (
    <div className="relative pl-6">

      {/* Timeline dot */}
      <div className={`absolute -left-2 top-1 w-3 h-3 rounded-full ${
        task.status === 'running'   ? 'bg-blue-500 animate-pulse' :
        task.status === 'complete'  ? 'bg-green-500' :
        task.status === 'failed'    ? 'bg-red-500' :
        task.status === 'cancelled' ? 'bg-zinc-500' : 'bg-gray-600'
      }`} />

      {/* Card */}
      <div className={`bg-gray-800 border rounded p-3 ${
        task.status === 'failed'    ? 'border-red-700' :
        task.status === 'cancelled' ? 'border-zinc-600' :
        task.status === 'complete'  ? 'border-green-800' :
        'border-gray-700'
      }`}>

        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm">{task.label}</p>
            <p className="text-xs text-gray-500">{task.agent}</p>
          </div>

          {/* Status badge */}
          <span className={`text-xs px-2 py-0.5 rounded border ${
            task.status === 'running'   ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
            task.status === 'complete'  ? 'bg-green-500/20 text-green-300 border-green-500/30' :
            task.status === 'failed'    ? 'bg-red-500/20 text-red-300 border-red-500/30' :
            task.status === 'cancelled' ? 'bg-zinc-500/20 text-zinc-400 border-zinc-600' : ''
          }`}>
            {task.status === 'cancelled' ? '✓ Enough data' :
             task.status === 'failed' && task.failedOnce ? '↺ Retried' :
             task.status}
          </span>
        </div>

        {/* Retry notice */}
        {task.failedOnce && task.status !== 'failed' && (
          <p className="mt-1 text-xs text-yellow-500/80">⚠ Failed once, recovered</p>
        )}

        {/* Thoughts */}
        <ThoughtBubble thoughts={task.thoughts} />

        {/* Error */}
        {task.status === 'failed' && task.error && (
          <div className="mt-2 flex items-start gap-2 rounded bg-red-950/40 border border-red-800/50 px-3 py-2 text-xs text-red-300">
            <span>⚠</span>
            <span>{task.error}</span>
          </div>
        )}

        {/* Cancel message */}
        {task.status === 'cancelled' && task.cancelMessage && (
          <p className="mt-2 text-xs text-zinc-400 italic">{task.cancelMessage}</p>
        )}

        {/* Tool calls */}
        <ToolCallList toolCalls={task.tool_calls} />

        {/* Intermediate outputs */}
        {task.outputs.length > 0 && (
          <div className="mt-2 text-xs text-gray-400 space-y-0.5">
            {task.outputs.map((o, i) => (
              <p key={i}>• {o}</p>
            ))}
          </div>
        )}

        {/* Final output */}
        {task.finalOutput && (
          <div className="mt-2 text-xs text-green-300 border-t border-gray-700 pt-2">
            {task.finalOutput.content}
            {task.finalOutput.quality_score && (
              <span className="ml-2 text-gray-500">
                score: {task.finalOutput.quality_score}
              </span>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
