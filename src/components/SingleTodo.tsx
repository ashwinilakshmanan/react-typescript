import { type } from "os";
import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import { Todo } from "./model";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineDownloadDone } from "react-icons/md";
import TodoList from "./TodoList";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};
const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<Boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    inputRef.current?.focus();
  },[edit])
  return (
    <div>
      <form className="single_todos" onSubmit={(e) => handleEdit(e, todo.id)}>
        {edit ? (
          <input
            ref={inputRef}
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
            className="single_todos-text"
          />
        ) : todo.isDone ? (
          <s className="single_todos-text">{todo.todo}</s>
        ) : (
          <span className="single_todos-text">{todo.todo}</span>
        )}

        <div>
          <span
            className="icon"
            onClick={() => {
              if (!edit && !todo.isDone) {
                setEdit(!edit);
              }
            }}
          >
            <AiFillEdit />
          </span>
          <span className="icon">
            <AiTwotoneDelete onClick={() => handleDelete(todo.id)} />
          </span>
          <span className="icon" onClick={() => handleDone(todo.id)}>
            <MdOutlineDownloadDone />
          </span>
        </div>
      </form>
    </div>
  );
};

export default SingleTodo;
