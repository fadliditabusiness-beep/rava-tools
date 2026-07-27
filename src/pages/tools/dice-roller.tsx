import Head from "next/head";
import DiceRollerPage from "@/components/pages/DiceRollerPage/DiceRollerPage";

export default function DiceRollerRoute() {
  return (
    <>
      <Head>
        <title>Dice Roller — Kalkulator Hari</title>
      </Head>
      <DiceRollerPage />
    </>
  );
}
