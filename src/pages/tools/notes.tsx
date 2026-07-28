import Head from "next/head";
import NotesPage from "@/components/pages/NotesPage/NotesPage";

export default function NotesRoute() {
  return (
    <>
      <Head>
        <title>Notes — Kalkulator Hari</title>
      </Head>
      <NotesPage />
    </>
  );
}
