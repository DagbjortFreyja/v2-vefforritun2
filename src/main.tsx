import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { TodoPage } from './components/TodoPage.js';
import { createTodo, deleteFinishedTodos, deleteTodo, listTodos } from './lib/db.js';
import { TodoItemSchema } from './lib/validation.js';
import { z } from 'zod/mini';
import { ErrorPage } from './components/ErrorPage.js';
import { AboutPage } from './components/About.js';
import { updateTodo } from './lib/db.js';

// búum til og exportum Hono app
export const app = new Hono();

// sendir út allt sem er í static möppunni
app.use('/static/*', serveStatic({ root: './' }));

app.get('/', async (c) => {
  const todos = await listTodos()

  if(!todos){
    console.error('villa við að sækja todos', todos)
    return c.text('villa!')
  }

  return c.html(<TodoPage todos={todos} />);
});

app.get('/about', (c) => {
  return c.html(<AboutPage />);
});

app.post('/add', async (c) => {
  const body = await c.req.parseBody();

  const result = TodoItemSchema.safeParse(body);

  if(!result.success){
    //console.error(z.flattenError(result.error))
    return c.html(
    <ErrorPage>
      <p>Titill ekki rétt formaður!</p>
    </ErrorPage>,
    400,
    );
  }

  const dbResult = await createTodo(result.data);

  if(!dbResult){
    return c.html(
      <ErrorPage>
        <p>Gat ekki vistað í gagnagrunni</p>
      </ErrorPage>,
      500,
    );
  }

  return c.redirect('/');
});

app.post('/update/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const body = await c.req.parseBody();

  const title = String(body.title ?? '').trim();
  const finished = body.finished === 'on';

  if (!title) {
    return c.html(
      <ErrorPage>
        <p>Titill má ekki vera tómur</p>
      </ErrorPage>,
      400
    );
  }

  const result = await updateTodo(id, title, finished);

  if (!result) {
    return c.html(
      <ErrorPage>
        <p>Gat ekki uppfært verkefni</p>
      </ErrorPage>,
      500
    );
  }

  return c.redirect('/');
});

app.post('/delete/:id', async (c) => {
  const idParam = c.req.param('id');
  const id = Number(idParam);

  if (!id || Number.isNaN(id)) {
    return c.text('Ógilt id', 400);
  }

  const result = await deleteTodo(id);

  if (!result) {
    return c.html(
      <ErrorPage>
        <p>Gat ekki eytt verkefni</p>
      </ErrorPage>,
      500,
    );
  }

  return c.redirect('/');
});

app.post('/delete/finished', async (c) => {
  const result = await deleteFinishedTodos();

  if (result === null) {
    return c.html(
      <ErrorPage>
        <p>Gat ekki eytt kláruðum verkefnum</p>
      </ErrorPage>,
      500,
    );
  }

  return c.redirect('/');
});
