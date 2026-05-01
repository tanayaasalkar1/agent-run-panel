export default function FinalOutput({ output }) {
  if (!output) return null;

  return (
    <div className="p-5 bg-green-950 border border-green-800 rounded-xl">
      <p className="text-green-300 text-sm font-semibold mb-2">Final Output</p>
      <p className="text-sm text-gray-100 leading-relaxed">{output.summary}</p>

      {output.citations?.length > 0 && (
        <div className="mt-4 border-t border-green-900 pt-3">
          <p className="text-xs text-green-500 mb-2">Sources</p>
          <div className="space-y-1">
            {output.citations.map((c) => (
              <div key={c.ref_id} className="flex items-start gap-2 text-xs text-gray-400">
                <span className="text-green-600 mt-0.5">[{c.ref_id}]</span>
                <span>
                  {c.title}
                  <span className="text-gray-600"> · {c.source}, p.{c.page}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}