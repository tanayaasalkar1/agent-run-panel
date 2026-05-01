import { useState, useEffect, useRef } from "react";
import { replayFixture } from "./mock/emitter";
import successFixture from "./mock/fixtures/run_success.json";
import errorFixture from "./mock/fixtures/run_error.json";

import Controls from "./components/Controls";
import RunHeader from "./components/RunHeader";
import TaskList from "./components/TaskList";
import FinalOutput from "./components/FinalOutput";

const INITIAL_RUN = {
  runId: null,
  query: null,
  status: "idle",
  startedAt: null,
  elapsedMs: 0,
  finalOutput: null,
};

export default function App() {
  const [run, setRun] = useState(INITIAL_RUN);
  const [tasks, setTasks] = useState([]);
  const [coordinatorThoughts, setCoordinatorThoughts] = useState([]);
  const [fixture, setFixture] = useState("success");
  const cancelRef = useRef(null);
  const timerRef = useRef(null);

  function handleEvent(event) {
    switch (event.type) {
      case "run_started":
        setRun({ runId: event.run_id, query: event.query, status: "running", startedAt: Date.now(), elapsedMs: 0, finalOutput: null });
        setTasks([]);
        setCoordinatorThoughts([]);
        break;

      case "agent_thought": {
        const thought = { thought: event.thought, timestamp: event.timestamp };
        if (event.task_id === "coordinator" || event.task_id === null) {
          setCoordinatorThoughts(prev => [...prev, thought]);
        } else {
          setTasks(prev => prev.map(t =>
            t.task_id === event.task_id
              ? { ...t, thoughts: [...(t.thoughts || []), thought] }
              : t
          ));
        }
        break;
      }

      case "task_spawned":
        setTasks(prev => [...prev, {
          task_id: event.task_id,
          label: event.label,
          agent: event.agent,
          status: "running",
          parallel_group: event.parallel_group,
          depends_on: event.depends_on,
          tool_calls: [],
          outputs: [],
          finalOutput: null,
          thoughts: [],
          error: null,
          cancelMessage: null,
          failedOnce: false,
        }]);
        break;

      case "tool_call":
        setTasks(prev => prev.map(t =>
          t.task_id === event.task_id
            ? { ...t, tool_calls: [...t.tool_calls, { tool: event.tool, input_summary: event.input_summary, output_summary: null }] }
            : t
        ));
        break;

      case "tool_result":
        setTasks(prev => prev.map(t => {
          if (t.task_id !== event.task_id) return t;
          const updated = [...t.tool_calls];
          const idx = [...updated].reverse().findIndex(c => c.tool === event.tool && c.output_summary === null);
          if (idx !== -1) updated[updated.length - 1 - idx] = { ...updated[updated.length - 1 - idx], output_summary: event.output_summary };
          return { ...t, tool_calls: updated };
        }));
        break;

      case "partial_output":
        setTasks(prev => prev.map(t => {
          if (t.task_id !== event.task_id) return t;
          if (event.is_final) return { ...t, finalOutput: { content: event.content, quality_score: event.quality_score } };
          return { ...t, outputs: [...t.outputs, event.content] };
        }));
        break;

      case "task_update":
        setTasks(prev => prev.map(t => {
          if (t.task_id !== event.task_id) return t;
          return {
            ...t,
            status: event.status,
            error: event.error || null,
            cancelMessage: event.reason === "sufficient_data" ? event.message : t.cancelMessage,
            failedOnce: t.status === "failed" && event.status === "running" ? true : t.failedOnce,
          };
        }));
        break;

      case "run_complete":
        setRun(prev => ({ ...prev, status: "complete", finalOutput: event.output }));
        break;

      case "run_error":
        setRun(prev => ({ ...prev, status: "failed" }));
        break;

      default:
        break;
    }
  }

  function startRun() {
    if (cancelRef.current) cancelRef.current();
    clearInterval(timerRef.current);
    const events = fixture === "success" ? successFixture : errorFixture;
    cancelRef.current = replayFixture(events, handleEvent, 8);
  }

  function resetRun() {
    if (cancelRef.current) cancelRef.current();
    clearInterval(timerRef.current);
    setRun(INITIAL_RUN);
    setTasks([]);
    setCoordinatorThoughts([]);
  }

  useEffect(() => {
    if (run.status === "running" && run.startedAt) {
      timerRef.current = setInterval(() => {
        setRun(prev => ({ ...prev, elapsedMs: Date.now() - prev.startedAt }));
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [run.status]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-gray-100 px-6 py-8">
      <div className="max-w-5xl mx-auto">

        <Controls
          fixture={fixture}
          setFixture={setFixture}
          onStart={startRun}
          onReset={resetRun}
        />

        {run.status === "idle" && (
          <div className="text-center py-20 text-gray-500">No active run</div>
        )}

        {run.status !== "idle" && (
          <div className="space-y-6">
            <RunHeader run={run} tasks={tasks} coordinatorThoughts={coordinatorThoughts} />
            <TaskList tasks={tasks} />
            <FinalOutput output={run.finalOutput} />
          </div>
        )}

      </div>
    </div>
  );
}