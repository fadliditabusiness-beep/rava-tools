import type { GetServerSideProps } from "next";
import Head from "next/head";
import MasehiYearPage, {
  type MasehiYearPageProps,
} from "@/components/pages/MasehiYearPage/MasehiYearPage";
import { MAX_YEAR, MIN_YEAR } from "@/constants/calendar";

export default function MasehiYearRoute({ year }: MasehiYearPageProps) {
  return (
    <>
      <Head>
        <title>{`Kalender Masehi ${year} — Libur Nasional & Cuti Bersama`}</title>
      </Head>
      <MasehiYearPage year={year} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<MasehiYearPageProps> = async ({ params }) => {
  const year = Number(params?.year);

  if (!Number.isInteger(year) || year < MIN_YEAR || year > MAX_YEAR) {
    return { notFound: true };
  }

  return { props: { year } };
};
