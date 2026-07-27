import type { GetServerSideProps } from "next";

export default function Home() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const year = new Date().getFullYear();

  return {
    redirect: {
      destination: `/masehi/${year}`,
      permanent: false,
    },
  };
};
