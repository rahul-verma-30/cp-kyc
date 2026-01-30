"use client";

import { useCompanySection } from "@/components/company/context/CompanySectionContext";

import CompanyOverview from "@/components/company/overview/CompanyOverview";
import CompanyDetails from "@/components/company/details/CompanyDetails";
import NameHistory from "@/components/company/history/NameHistory";
import ContactAddressSection from "@/components/company/contact/ContactAddressSection";

import CompanyHighlights from "@/components/company/highlights/CompanyHighlights";
import FinancialHighlights from "@/components/company/financials/FinancialHighlights";
import CompanyCharts from "@/components/company/charts/CompanyCharts";
import ProductDetails from "@/components/company/productDetails/ProductDetails";

import DirectorsSection from "@/components/company/people/DirectorsSection";
import OwnershipSection from "@/components/company/ownership/OwnershipSection";
import FinancialHighlightsDetails from "@/components/company/financialHighlights/FinancialHighlightsDetails";
import LigilationDetails from "@/components/company/ligilation/LigilationDetails";
import Documents from "@/components/company/documents/Documents";

import ChargesPage from "@/components/company/charges/Charges";
import PeerComparison from "@/components/company/peerComparison/PeerComparison";
import RelatedCorporates from "@/components/company/relatedCorporates/RelatedCorporates";
import ComplianceDetails from "@/components/company/complianceDetails/ComplianceDetails";

import AlertsContainer from "@/components/company/alerts/AlertsContainer";

export default function CompanyPage() {
  const { activeSection } = useCompanySection();

  return (
    <>
      {/* Company Details */}
      {activeSection === "companyDetails" && (
        <>
          <CompanyOverview />
          <CompanyDetails />
          <NameHistory />
          <ContactAddressSection />
        </>
      )}

      {/* Company Highlights */}
      {activeSection === "companyHighlights" && (
        <>
          <CompanyHighlights />
          <FinancialHighlightsDetails />
          <CompanyCharts />
          <ProductDetails />
        </>
      )}

      {/* Financials */}
      {activeSection === "financials" && <FinancialHighlights />}

      {/* Directors & KMP */}
      {activeSection === "directorsKmp" && <DirectorsSection />}

      {/* Control & Ownership */}

      {activeSection === "controlOwnership" && (
        <OwnershipSection />
      )}

      {/* Charges */}
      {activeSection === "charges" && (
        <ChargesPage />
      )}

      {/* Peer Comparison */}
      {activeSection === "peerComparison" && (
        <PeerComparison />
      )}

      {/* Related Corporates */}
      {activeSection === "relatedCorporates" && (
        <RelatedCorporates />
      )}

      {activeSection === "alerts" && <AlertsContainer />}

      {activeSection === "litigation" && <LigilationDetails />}
      {activeSection === "documents" && <Documents />}

      {activeSection === "compliance" && <ComplianceDetails />}
    </>
  );
}
