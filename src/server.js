import { createServer, Model, Response } from "miragejs";

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
      todo: Model,
    },

    seeds(server) {
      server.create("user", { name: "Ece", password: "123" });
    },

    routes() {
      this.namespace = "api";
      this.passthrough("http://localhost:3000/locales/en/translation.json");
      this.passthrough("http://localhost:3000/locales/tr/translation.json");

      this.get("/users", (schema) => schema.users.all());

      this.post("/sign-up", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        let name = attrs.name;
        let password = attrs.password;
        let user = schema.users.findBy({ name });
        if (user) {
          let data = { errors: ["User already exists!"] };
          return new Response(401, data);
        }
        server.create("user", { name, password });
        return new Response(200);
      });

      this.post("/sign-in", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        let name = attrs.name;
        let password = attrs.password;
        let user = schema.users.findBy({ name, password });

        if (!user) {
          let data = { errors: ["User not found!"] };
          return new Response(401, {}, data);
        }
        var dt = new Date();
        let response = {
          name: user.name,
          id: user.id,
          token: `${user.name}--${user.id}--${dt.setMinutes(
            dt.getMinutes() + 30
          )}`,
        };
        return new Response(200, {}, response);
      });

      this.get("/todos", (schema, request) => {
        const headers = request.requestHeaders;

        let token = headers.token;
        let id = token.split("--")[1];
        let user = schema.users.findBy({ id });

        let author_id = id;

        if (!user) {
          let data = { errors: ["User not found!"] };
          return new Response(401, {}, data);
        }

        return schema.todos.all();
      });

      this.post("/todo", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const headers = request.requestHeaders;
        let task = attrs.task;
        let done = attrs.done;
        let date = attrs.date;

        let token = headers.token;
        let id = token.split("--")[1];
        let user = schema.users.findBy({ id });
        let author_id = id;

        if (!user) {
          let data = { errors: ["User not found!"] };
          return new Response(401, {}, data);
        }

        return schema.todos.create({ task, done, date, author_id });
      });

      this.patch("/todo/:id", (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        const headers = request.requestHeaders;

        let task = newAttrs.task;
        let done = newAttrs.done;
        let date = newAttrs.date;

        let token = headers.token;
        let userId = token.split("--")[1];
        let user = schema.users.findBy({ id: userId });
        let author_id = userId;

        let id = request.params.id;
        let todo = schema.todos.find(id);

        if (!user) {
          let data = { errors: ["User not found!"] };
          return new Response(401, {}, data);
        }

        return todo.update({ task, date, done, author_id });
      });
    },
  });

  return server;
}
