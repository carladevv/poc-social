import { useEffect, useRef } from "react";
import type { Memory } from "@domain/characters/types";

export function LogPanel(props: {
  logs: ReadonlyArray<{ id: string; text: string }>;
  memories: ReadonlyArray<Memory>;
  height?: number | string;      // e.g., "55vh" (default), 400, etc.
  autoScroll?: boolean;          // default true
}) {
  const { logs, memories, height = "55vh", autoScroll = true } = props;
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoScroll || !scrollerRef.current) return;
    scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
  }, [logs, autoScroll]);

  const maxHeight = typeof height === "number" ? `${height}px` : height;

  return (
    <>
      <div
        ref={scrollerRef}
        className="log scroll"
        style={{ maxHeight, overflowY: "auto" }}
      >
        {logs.map((l) => (
          <div key={l.id} className="logline">{l.text}</div>
        ))}
      </div>

      <details style={{ marginTop: 12 }}>
        <summary>Shared memories ({memories.length})</summary>
        <ul>
          {memories.map((m) => (
            <li key={m.id}><code>[{m.weight}]</code> {m.text}</li>
          ))}
        </ul>
      </details>
    </>
  );
}
