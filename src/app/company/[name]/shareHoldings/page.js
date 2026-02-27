import CompanyLayout from "@/components/company/layout/CompanyLayout";
import ShareHoldingsPattern from "@/components/company/shareHoldingsPattern/ShareHoldingsPattern";
import ShareHoldingsTables from "@/components/company/shareHoldingsPattern/ShareHoldingsTables";
import ShareHoldingsTables2 from "@/components/company/shareHoldingsPattern/ShareHoldingsTables2";

export default function ShareHoldingsPage() {
  return (
    <CompanyLayout>
      <ShareHoldingsPattern />
      <ShareHoldingsTables />
      <ShareHoldingsTables2 />
    </CompanyLayout>
  );
}
