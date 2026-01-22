import CompanyLayout from "@/components/company/layout/CompanyLayout";
import ShareHoldingsPattern from "@/components/company/shareHoldingsPattern/ShareHoldingsPattern";
import ShareHoldingsTables from "@/components/company/shareHoldingsPattern/ShareHoldingsTables";

export default function ShareHoldingsPage() {
  return (
    <CompanyLayout>
      <ShareHoldingsPattern />
      <ShareHoldingsTables />
    </CompanyLayout>
  );
}
