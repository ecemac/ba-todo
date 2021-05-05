import { createServer, Model, Response } from "miragejs";

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      server.create("user", { name: "Ece", password: "123" });
    },

    routes() {
      this.namespace = "api";

      this.get("/locales/en/translation.json");
      this.get("/locales/tr/translation.json");

      this.get("/users", (schema) => schema.users.all());

      this.post("/sign-up", (request) => {
        const attrs = JSON.parse(request.requestBody);
        let name = attrs.name;
        let password = attrs.password;
        server.create("user", { name, password });
        return new Response(200);
      });

      this.post("/sign-in", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        let name = attrs.name;
        let password = attrs.password;
        let user = schema.users.findBy({ name, password });

        if (!user) {
          return "User not found!";
        }
        var dt = new Date();
        return {
          name: user.name,
          id: user.id,
          token: `${user.name}--${user.id}--${dt.setMinutes(
            dt.getMinutes() + 30
          )}`,
        };
      });

      this.post("/todo", (request) => {
        const attrs = JSON.parse(request.requestBody);
        let task = attrs.task;
        let done = false;
        server.create("todo", { task, done });
        return new Response(200);
      });

      this.get("/todos", (schema) => schema.todos.all());
    },
  });

  return server;
}
