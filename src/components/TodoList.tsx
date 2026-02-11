import type { FC } from 'hono/jsx';
import type { Todo } from '../types.js';
import { TodoItem } from './TodoItem.js';

type Props = {
    title: string;
    todos?: Todo[];
    editable?: boolean;
    showDelete?: boolean;
}

export const TodoList: FC<Props> = ({ title, todos, editable = false, showDelete = false }) => {
  return (
    <section>
      <h2>{title}</h2>
      <ul>
        {todos?.map((i) => (
          <TodoItem key={i.id} todo={i} editable={editable} showDelete={ showDelete} />
        ))}
      </ul>
    </section>
  );
};
