import React, { useEffect } from "react";
import { CacheManager } from "../services/cache";
import config from "../config";

export const TodoList = () => {
  const cacheMngr = new CacheManager();

  useEffect(() => {
    let body = {
      task: "task",
      done: false,
      date: "date",
    };
    let headers = {
      token: cacheMngr.get(config.Login.cacheKey).data.token,
    };
    fetch("api/todos", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    }).then((data) => console.log(data));
  }, []);
  return <div>TODO LIST</div>;
};
