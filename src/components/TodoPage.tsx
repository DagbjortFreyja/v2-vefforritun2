import type { FC } from 'hono/jsx';
import type { Todo } from '../types.js';
import { TodoList } from './TodoList.js';
import { Layout } from './Layout.js';

type TodoPageProps = {
  todos?: Todo[];
};

export const TodoPage: FC<TodoPageProps> = ({ todos = [] }) => {
  const finished = todos.filter(i => i.finished)
  const unfinished = todos.filter(i => !i.finished)

  return (
    <Layout title="Todolistinn">
    <section>
      <form method="post" action="/add">
        <input type="hidden" namw="id" value="..." />
        <input type="text" name="title" />
        <button>bæta við</button>
      </form>

      <TodoList title="Allur listinn" todos={todos} showDelete={true}/>
      <TodoList title="Bara kláruð verkefni" todos={finished} showDelete={true} />
      <TodoList title="Bara ókláruð verkefni" todos={unfinished} editable={true}/>


      <p>Ég fékk {todos.length} verkefni.</p>
    </section>
    </Layout>
  );
};
