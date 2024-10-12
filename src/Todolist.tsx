import { FilterValuesType } from "./App";

export type taskPropsType = {
  id: number;
  title: string;
  isDone: boolean;
};

type todolistPropsType = {
  title?: string;
  task: Array<taskPropsType>;
  checked?: boolean;
  removeTask: (id: number) => void;
  ChangeFilter: (value: FilterValuesType) => void;
};

export const Todolist = (props: todolistPropsType) => {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {props.task.map((t) => {
          return (
            <li>
              <input type="checkbox" checked={t.isDone} />
              <span>{t.title}</span>
              <button
                onClick={() => {
                  props.removeTask(t.id);
                }}
              >
                x
              </button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          onClick={() => {
            props.ChangeFilter("All");
          }}
        >
          All
        </button>
        <button
          onClick={() => {
            props.ChangeFilter("Active");
          }}
        >
          Active
        </button>
        <button
          onClick={() => {
            props.ChangeFilter("Completed");
          }}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
