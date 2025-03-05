import { HeadMeta } from "@/components/atoms/Head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function DashboardRedirect() {
  const { push } = useRouter();
  useEffect(() => {
    push("/dash");
  }, []);
  return (
    <>
      <HeadMeta />
      <main style={{ padding: "1rem" }}>
        <p>Redirecting to dashboard</p>
      </main>
    </>
  );
}
