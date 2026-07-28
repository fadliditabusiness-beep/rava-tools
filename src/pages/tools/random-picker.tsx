import Head from "next/head";
import RandomPickerPage from "@/components/pages/RandomPickerPage/RandomPickerPage";

export default function RandomPickerRoute() {
  return (
    <>
      <Head>
        <title>Random Picker (Wheel) — Kalkulator Hari</title>
      </Head>
      <RandomPickerPage />
    </>
  );
}
