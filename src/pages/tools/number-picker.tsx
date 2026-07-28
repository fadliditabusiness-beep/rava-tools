import Head from "next/head";
import NumberPickerPage from "@/components/pages/NumberPickerPage/NumberPickerPage";

export default function NumberPickerRoute() {
  return (
    <>
      <Head>
        <title>Number Picker — Kalkulator Hari</title>
      </Head>
      <NumberPickerPage />
    </>
  );
}
