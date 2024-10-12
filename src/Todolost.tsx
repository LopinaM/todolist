type taskPropsType = {
  id: number;
  title: string;
  isDone: boolean;
};

type todolistPropsType = {
  title?: string;
  task: Array<taskPropsType>;
  checked?: boolean;
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
        <li>
          <input type="checkbox" checked={props.task[0].isDone} />
          <span>{props.task[0].title}</span>
        </li>
        <li>
          <input type="checkbox" checked={props.task[1].isDone} />{" "}
          <span>{props.task[1].title}</span>
        </li>
        <li>
          <input type="checkbox" checked={props.task[2].isDone} />{" "}
          <span>{props.task[2].title}</span>
        </li>
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
};
