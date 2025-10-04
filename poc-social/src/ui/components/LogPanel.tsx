import type { Memory } from "@domain/characters/types";

export function LogPanel(props: {
  logs: ReadonlyArray<{ id: string; text: string }>;
  memories: ReadonlyArray<Memory>;
}) {
  const { logs, memories } = props;

  return (
    <>
      <section className="card">
        <h2>Log</h2>
        <div className="log">
          {logs.map((l) => (
            <div key={l.id} className="logline">{l.text}</div>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Debug</h2>
        <details>
          <summary>Shared memories ({memories.length})</summary>
          <ul>
            {memories.map((m) => (
              <li key={m.id}><code>[{m.weight}]</code> {m.text}</li>
            ))}
          </ul>
        </details>
      </section>
    </>
  );
}
