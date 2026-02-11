import type { FC } from 'hono/jsx';
import type { Todo } from '../types.js';

type Props = {
  todo: Todo;
  editable?: boolean;
  showDelete?: boolean;
};

export const TodoItem: FC<Props> = ({
  todo,
  editable = false,
  showDelete = false,
}) => {
  return (
    <li>
      {editable ? (
        <form method="post" action={`/update/${todo.id}`}>
          <input type="hidden" name="title" value={todo.title} />

          <input
            type="checkbox"
            name="finished"
            value="on"
            defaultChecked={todo.finished}
          />

          {todo.title}

          <button type="submit">Vista</button>
        </form>
      ) : (
        <span>{todo.title}</span>
      )}

      {showDelete && (
        <form method="post" action={`/delete/${todo.id}`}>
          <button type="submit">Eyða</button>
        </form>
      )}
    </li>
  );
};

