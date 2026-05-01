import { useState } from "react";
export default function ThoughtBubble({ thoughts }) {
  const [open, setOpen] = useState(false);
  if (!thoughts || thoughts.length === 0) return null;

  return (
    <div className="mt-2">
      <button
        onClick={() => setOpen(o => !o)}
        className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
      >
        <span>{open ? '▾' : '▸'}</span>
        <span>{open ? 'Hide' : 'Show'} thoughts ({thoughts.length})</span>
      </button>

      {open && (
        <div className="mt-1 space-y-1">
          {thoughts.map((t, i) => (
            <p key={i} className="text-xs text-purple-300/70 italic pl-3 border-l border-purple-800">
              {t.thought}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}