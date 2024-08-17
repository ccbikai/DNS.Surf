// import Image from "next/image";
import Layout from "@/components/layouts/default";
import DNSPanel from "../components/dns/dns-panel";

export default function Home() {
  return (
    <Layout>
      <DNSPanel/>
    </Layout>
  );
}
