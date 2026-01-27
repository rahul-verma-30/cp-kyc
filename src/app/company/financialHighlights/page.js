import CompanyLayout from "@/components/company/layout/CompanyLayout";
import FinancialHighlightsDetails from "@/components/company/financialHighlights/FinancialHighlightsDetails";
import FinancialHighlightsTables from "@/components/company/financialHighlights/FinancialHighlightsTables";

export default function FinancialHighlightsPage() {
  return (
    <CompanyLayout>
        <FinancialHighlightsDetails />
        <FinancialHighlightsTables />
    </CompanyLayout>
  );
}