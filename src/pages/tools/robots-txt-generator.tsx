import Head from "next/head";
import RobotsTxtGeneratorPage from "@/components/pages/RobotsTxtGeneratorPage/RobotsTxtGeneratorPage";

export default function RobotsTxtGeneratorRoute() {
  return (
    <>
      <Head>
        <title>robots.txt Generator — Kalkulator Hari</title>
      </Head>
      <RobotsTxtGeneratorPage />
    </>
  );
}
