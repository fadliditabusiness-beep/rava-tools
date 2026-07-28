import Head from "next/head";
import TodoListPage from "@/components/pages/TodoListPage/TodoListPage";

export default function TodoListRoute() {
  return (
    <>
      <Head>
        <title>To-do List — Kalkulator Hari</title>
      </Head>
      <TodoListPage />
    </>
  );
}
