export default function Controls({ fixture, setFixture, onStart, onReset }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
      <h1 className="text-2xl font-semibold tracking-tight">Agent Run Panel</h1>

      <div className="flex items-center gap-3">
        <select
          className="bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 rounded-md text-sm"
          value={fixture}
          onChange={(e) => setFixture(e.target.value)}
        >
          <option value="success">Success</option>
          <option value="error">Error</option>
        </select>

        <button
          onClick={onStart}
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md text-sm"
        >
          ▶ Start
        </button>

        <button
          onClick={onReset}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-sm"
        >
          Reset
        </button>
      </div>
    </div>
  );
}