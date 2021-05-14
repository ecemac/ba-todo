import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Layout, List, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { EditTask } from "../components/EditTask";
import { CacheManager } from "../services/cache";
import { useTranslation } from "react-i18next";
import "./TodoList.css";
import config from "../config";

const { Sider, Content } = Layout;

export const TodoList = () => {
  const cacheMngr = new CacheManager();
  const { t } = useTranslation();

  const [todos, setTodos] = useState([]);
  const [editTask, setEditTask] = useState(false);
  const [editType, setEditType] = useState("");
  const [editData, setEditData] = useState(null);

  const getTodos = () => {
    let headers = {
      token: cacheMngr.get(config.Login.cacheKey).data.token,
    };

    fetch("api/todos", {
      headers,
    }).then((data) => {
      let todoData = JSON.parse(data?._bodyText);
      setTodos(todoData.todos);
    });
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = (todo) => {
    let headers = {
      token: cacheMngr.get(config.Login.cacheKey).data.token,
    };
    fetch("api/todo", {
      method: "POST",
      headers,
      body: JSON.stringify(todo),
    }).then((data) => {
      getTodos();
    });
  };

  const editTodo = (todo, id) => {
    let headers = {
      token: cacheMngr.get(config.Login.cacheKey).data.token,
    };
    fetch(`api/todo/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(todo),
    }).then((data) => {
      getTodos();
    });
  };

  const handleComplete = (item) => {
    item.done = true;
    editTodo(item, item.id);
  };

  const handleEditModal = (item) => {
    setEditData(item);
    setEditType("edit");
    setEditTask(true);
  };

  return (
    <Layout>
      <Sider className="todolist-sider">
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditTask(true);
            setEditType("add");
          }}
        >
          {t("todo_list.add_todo")}
        </Button>
      </Sider>
      <Content className="todolist-main">
        <List
          itemLayout="horizontal"
          bordered
          dataSource={todos}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button onClick={() => handleEditModal(item)}>
                  {t("todo_list.edit")}
                </Button>,
                <Button
                  disabled={item.done}
                  onClick={() => handleComplete(item)}
                >
                  {t(item.done ? "todo_list.done" : "todo_list.complete")}
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={item.task}
                description={format(new Date(item.date), "d.MM.yyyy")}
              />
            </List.Item>
          )}
        />
        <EditTask
          open={editTask}
          close={() => setEditTask(!editTask)}
          type={editType}
          action={editType === "add" ? addTodo : editTodo}
          data={editData}
        />
      </Content>
    </Layout>
  );
};
