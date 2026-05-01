export default function ToolCallList({ toolCalls }) {
  if (!toolCalls || toolCalls.length === 0) return null;

  return (
    <div className="mt-2 space-y-1">
      {toolCalls.map((call, i) => (
        <div key={i} className="rounded border border-gray-700 bg-gray-900/60 px-3 py-2 text-xs">
          <div className="flex items-center gap-2 text-blue-300">
            <span>⚙</span>
            <span className="font-mono">{call.tool}</span>
          </div>
          <p className="text-gray-500 mt-0.5 pl-5">{call.input_summary}</p>
          {call.output_summary ? (
            <p className="text-green-400/80 mt-1 pl-5">↳ {call.output_summary}</p>
          ) : (
            <p className="text-gray-600 mt-1 pl-5 animate-pulse">↳ waiting...</p>
          )}
        </div>
      ))}
    </div>
  );
}