import type { GetServerSideProps } from "next";
import Head from "next/head";
import HijriahYearPage, {
  type HijriahYearPageProps,
} from "@/components/pages/HijriahYearPage/HijriahYearPage";
import { MAX_HIJRI_YEAR, MIN_HIJRI_YEAR } from "@/constants/calendar";

export default function HijriahYearRoute({ hijriYear }: HijriahYearPageProps) {
  return (
    <>
      <Head>
        <title>{`Kalender Hijriah ${hijriYear} H — Libur Nasional & Cuti Bersama`}</title>
      </Head>
      <HijriahYearPage hijriYear={hijriYear} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HijriahYearPageProps> = async ({
  params,
}) => {
  const hijriYear = Number(params?.year);

  if (!Number.isInteger(hijriYear) || hijriYear < MIN_HIJRI_YEAR || hijriYear > MAX_HIJRI_YEAR) {
    return { notFound: true };
  }

  return { props: { hijriYear } };
};
