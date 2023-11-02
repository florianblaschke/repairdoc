import { Repair, Todo } from "@prisma/client";

export default function StatBar({
  data,
  todo,
}: {
  data: Repair[];
  todo: Todo[];
}) {
  const completed = data.filter((repair) => repair.status === "complete");
  const notCompleted = data.filter((repair) => repair.status !== "complete");

  return (
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-figure text-primary"></div>
        <div className="stat-title">Reparaturen</div>
        <div className="stat-value text-primary">{completed.length}</div>
        <div className="stat-desc">
          {completed.length === 1
            ? "Reparatur abgeschlossen"
            : "Reparaturen abgeschlossen"}
        </div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        </div>
        <div className="stat-title">To-Dos</div>
        <div className="stat-value text-secondary">{todo.length}</div>
        <div className="stat-desc">offen</div>
      </div>

      <div className="stat">
        <div className="stat-value">
          {data.length + todo.length === 0
            ? 0
            : Math.floor(
                (1 -
                  (notCompleted.length + todo.length) /
                    (data.length + todo.length)) *
                  100
              )}
          %
        </div>
        <div className="stat-title">der Aufgaben geschafft</div>
        <div className="stat-desc text-secondary">
          {notCompleted.length + todo.length === 1
            ? `${notCompleted.length + todo.length} Aufgabe verbleibt`
            : `${notCompleted.length + todo.length} Aufgaben verbleiben`}
        </div>
      </div>
    </div>
  );
}
