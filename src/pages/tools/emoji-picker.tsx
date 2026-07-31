import Head from "next/head";
import EmojiPickerPage from "@/components/pages/EmojiPickerPage/EmojiPickerPage";

export default function EmojiPickerRoute() {
  return (
    <>
      <Head>
        <title>Emoji Picker — Kalkulator Hari</title>
      </Head>
      <EmojiPickerPage />
    </>
  );
}
