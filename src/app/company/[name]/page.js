"use client";
import { useRef, useEffect, useState } from "react";
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
import { useParams } from "next/navigation";

export default function CompanyPage() {
  const { activeSection, activeSubSection } = useCompanySection();
  const [searchCompany, setSearchCompany] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  const overviewRef = useRef(null);
  const nameHistoryRef = useRef(null);
  const contactRef = useRef(null);


  const params = useParams();
  const rawCompanyName = params.name; // from /company/dabur because route is [name]

  useEffect(() => {
    if (!rawCompanyName) return;

    // Make sure we only encode once for the API path segment.
    const companyName = decodeURIComponent(rawCompanyName);
    setSearchCompany(companyName);
    if (!companyName) return;

    const getCompanyDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company-details/${encodeURIComponent(companyName)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setCompanyData(data);
        console.log(data);

      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    };

    getCompanyDetails();

  }, [rawCompanyName]); // 🔥 This is important

  /* 🔥 Scroll when sidebar sub-item changes */
  useEffect(() => {
    if (activeSection !== "companyDetails") return;

    const map = {
      Summary: overviewRef,
      "Name History": nameHistoryRef,
      "Contact Details": contactRef,
    };

    const targetRef = map[activeSubSection];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [activeSection, activeSubSection]);

  return (
    <>
      {activeSection === "companyDetails" && (
        <>
          <div ref={overviewRef}>
            <CompanyOverview />
            <CompanyDetails />
          </div>

          <div ref={nameHistoryRef}>
            <NameHistory />
          </div>

          <div ref={contactRef}>
            <ContactAddressSection />
          </div>
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
