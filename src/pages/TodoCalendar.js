import React, { useEffect, useState } from "react";
import { Calendar, Badge } from "antd";
import { CacheManager } from "../services/cache";
import config from "../config";

export const TodoCalendar = () => {
  const cacheMngr = new CacheManager();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let headers = {
      token: cacheMngr.get(config.Login.cacheKey).data.token,
    };

    fetch("api/todos", {
      headers,
    }).then((data) => {
      let todoData = JSON.parse(data?._bodyText);
      setTodos(todoData.todos);
    });
  }, []);

  const getListData = (value) => {
    let valueDate = value.date();
    let valueMonth = value.month();
    //let dates = todos?.map((t) => new Date(t.date).getDate());
    let listData = [];

    todos.forEach((todo) => {
      let todoDate = new Date(todo.date).getDate();
      let todoMonth = new Date(todo.date).getMonth();
      if (todoDate === valueDate && todoMonth === valueMonth)
        listData.push(todo);
    });

    return listData || [];
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.length > 0 &&
          listData.map((item) => (
            <li key={item.id}>
              <Badge
                status={item.done ? "success" : "error"}
                text={item.task}
              />
            </li>
          ))}
      </ul>
    );
  };

  return <Calendar dateCellRender={dateCellRender} />;
};
