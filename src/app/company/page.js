import CompanyLayout from "@/components/company/layout/CompanyLayout";
import CompanyOverview from "@/components/company/overview/CompanyOverview";
import CompanyDetails from "@/components/company/details/CompanyDetails";
import NameHistory from "@/components/company/history/NameHistory";
import ContactAddressSection from "@/components/company/contact/ContactAddressSection";
import CompanyHighlights from "@/components/company/highlights/CompanyHighlights";
import FinancialHighlights from "@/components/company/financials/FinancialHighlights";
import CompanyCharts from "@/components/company/charts/CompanyCharts";
import ProductsSection from "@/components/company/products/ProductsSection";
import DirectorsSection from "@/components/company/people/DirectorsSection";
import OwnershipSection from "@/components/company/ownership/OwnershipSection";

export default function CompanyPage() {
  return (
    <CompanyLayout>
      <CompanyOverview />
      <CompanyDetails />
      <NameHistory />
      <ContactAddressSection />
      <CompanyHighlights />
      <FinancialHighlights />
      <CompanyCharts />
      <ProductsSection />
      <DirectorsSection />
      <OwnershipSection />
    </CompanyLayout>
  );
}
