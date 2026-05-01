// mock/emitter.js

/**
 * Replays a fixture array, firing each event with a delay
 * proportional to its timestamp offset from the first event.
 *
 * @param {Array} events - array of event objects from a fixture
 * @param {Function} onEvent - called with each event as it fires
 * @param {number} speed - multiplier (1 = real-time, 10 = 10x faster)
 * @returns {Function} cancel - call this to stop the replay early
 */
export function replayFixture(events, onEvent, speed = 8) {
  if (!events.length) return () => {};

  const timers = [];
  const startTimestamp = events[0].timestamp;

  events.forEach((event) => {
    // Calculate how many ms after start this event should fire
    const offsetMs = (event.timestamp - startTimestamp) / speed;

    const timer = setTimeout(() => {
      onEvent(event);
    }, offsetMs);

    timers.push(timer);
  });

  // Return a cancel function so the caller can stop mid-replay
  return () => timers.forEach(clearTimeout);
}