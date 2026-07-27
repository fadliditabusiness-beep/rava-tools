import Head from "next/head";
import ColorPickerPage from "@/components/pages/ColorPickerPage/ColorPickerPage";

export default function ColorPickerRoute() {
  return (
    <>
      <Head>
        <title>Color Picker — Kalkulator Hari</title>
      </Head>
      <ColorPickerPage />
    </>
  );
}
