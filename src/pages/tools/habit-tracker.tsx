import Head from "next/head";
import HabitTrackerPage from "@/components/pages/HabitTrackerPage/HabitTrackerPage";

export default function HabitTrackerRoute() {
  return (
    <>
      <Head>
        <title>Habit Tracker — Kalkulator Hari</title>
      </Head>
      <HabitTrackerPage />
    </>
  );
}
