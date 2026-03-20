"use client";
import { useRef, useEffect, useState } from "react";
import { useCompanySection } from "@/components/company/context/CompanySectionContext";
import { scrollToElementWithOffset } from "@/utils/scrollUtils";


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
  const params = useParams();
  const rawCompanyName = (params.name.replaceAll("-", " ")).toUpperCase(); // from /company/dabur because route is [name]


  const [companyName, setCompanyName] = useState("");

  // Company Details
  const [companyData, setCompanyData] = useState(null);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [companyError, setCompanyError] = useState(null);

  // Profit & Loss
  const [pnlViewType, setPnlViewType] = useState("Standalone");
  const [pnlApiData, setPnlApiData] = useState(null);
  const [pnlLoading, setPnlLoading] = useState(false);
  const [pnlError, setPnlError] = useState(null);

  // Financial Highlights
  const [financialHighlights, setFinancialHighlights] = useState(null);
  const [financialLoading, setFinancialLoading] = useState(false);
  const [financialError, setFinancialError] = useState(null);

  // Revenue Trend
  const [revenueProfitTrend, setRevenueProfitTrend] = useState(null);
  const [trendLoading, setTrendLoading] = useState(false);
  const [trendError, setTrendError] = useState(null);

  // Common Directorship
  const [commonDirectorship, setCommonDirectorship] = useState(null);
  const [directorshipLoading, setDirectorshipLoading] = useState(false);
  const [directorshipError, setDirectorshipError] = useState(null);

  // Company Highlights (Paginated)
  const [companyHighlights, setCompanyHighlights] = useState(null);
  const [highlightsLoading, setHighlightsLoading] = useState(false);
  const [highlightsError, setHighlightsError] = useState(null);
  const [highlightsPage, setHighlightsPage] = useState(1);
  const [highlightsLimit, setLimit] = useState(10);

  // Charges
  const [chargesData, setChargesData] = useState(null);
  const [chargesLoading, setChargesLoading] = useState(false);
  const [chargesError, setChargesError] = useState(null);
  const [openPage, setOpenPage] = useState(1);
  const [closedPage, setClosedPage] = useState(1);
  const [chargesLimit, setChargesLimit] = useState(10);

  // Directors & KMPS

  const [directorsData, setDirectorsData] = useState(null);
  const [directorsLoading, setDirectorsLoading] = useState(false);
  const [directorsError, setDirectorsError] = useState(null);

  //Alerts

  const [alertsData, setAlertsData] = useState(null);
  const [alertsLoading, setAlertsLoading] = useState(false);
  const [alertsError, setAlertsError] = useState(null);
  
  // Auditors Details
  const [auditorsData, setAuditorsData] = useState([]);
  const [auditorsLoading, setAuditorsLoading] = useState(false);
  const [auditorsError, setAuditorsError] = useState(null);
  const [audType, setAudType] = useState("Standalone");

  // Balance Sheet Details
  const [balanceSheetData, setBalanceSheetData] = useState(null);
  const [balanceSheetLoading, setBalanceSheetLoading] = useState(false);
  const [balanceSheetError, setBalanceSheetError] = useState(null);
  const [bsType, setBsType] = useState("Standalone");
  
  // Cash Flow Details
  const [cashFlowData, setCashFlowData] = useState(null);
  const [cashFlowLoading, setCashFlowLoading] = useState(false);
  const [cashFlowError, setCashFlowError] = useState(null);
  const [cfType, setCfType] = useState("Standalone");


  const overviewRef = useRef(null);
  const nameHistoryRef = useRef(null);
  const contactRef = useRef(null);

  /* ================= SET COMPANY NAME ================= */

  useEffect(() => {
    if (!rawCompanyName) return;
    const companyNamee = decodeURIComponent(rawCompanyName);
    setCompanyName(companyNamee);
  }, [rawCompanyName]);


  /* ================= GET COMPANY DETAILS ================= */

  useEffect(() => {
    if (!companyName) return;

    const getCompanyDetails = async () => {
      try {
        setCompanyLoading(true);
        setCompanyError(null);

        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company-details/${encodeURIComponent(companyName)}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        let data;
        try {
          data = await response.json();
        } catch {
          throw new Error("Invalid server response");
        }

        if (!response.ok) {
          throw new Error(
            data?.detail ||
            data?.message ||
            `Company Details Error ${response.status}: ${response.statusText}`
          );
        }

        setCompanyData(data);

      } catch (error) {
        console.log("Error fetching company details:", error);
        setCompanyError(error.message);
      } finally {
        setCompanyLoading(false);
      }
    };

    getCompanyDetails();
  }, [companyName]);

  /* ================= PROFIT & LOSS ================= */

  useEffect(() => {
    if (!companyName) return;

    const fetchPnlData = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company/${encodeURIComponent(companyName)}/screener/profit-loss?result_type=${pnlViewType}`;
      
      setPnlLoading(true);
      setPnlError(null);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(url, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || errorData.detail || `Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setPnlApiData(data);
      } catch (error) {
        console.error("Error fetching P&L data:", error);
        setPnlError(error.message);
        setPnlApiData(null);
      } finally {
        setPnlLoading(false);
      }
    };

    fetchPnlData();
  }, [companyName, pnlViewType]);

  /* ================= FINANCIAL HIGHLIGHTS ================= */

  useEffect(() => {
    if (!companyName) return;

    const getFinancialHighlights = async () => {
      try {

        setFinancialLoading(true);
        setFinancialError(null);

        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/financials/${encodeURIComponent(companyName)}/highlights`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        let data;
        try {
          data = await response.json();
        } catch {
          throw new Error("Invalid server response");
        }

        if (!response.ok) {
          throw new Error(data?.detail ||
            data?.message ||
            `Finanical Highlights Error ${response.status}: ${response.statusText}`);
        }

        setFinancialHighlights(data);
        // console.log(data);

      } catch (error) {
        console.log("Error fetching company's financial highlights:", error);
        setFinancialError(error.message);
      } finally {
        setFinancialLoading(false);
      }
    };

    getFinancialHighlights();
  }, [companyName]);

  /* ================= REVENUE & PROFIT TREND ================= */
  // Used in FinancialHighlightsDetails and FinancialHighlights
  useEffect(() => {
    if (!companyName) return;

    const getRevenueProfitTrend = async () => {
      try {

        setTrendError(null);

        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/financials/${encodeURIComponent(companyName)}/revenue-profit-trend`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        let data;

        try {
          data = await response.json();
        } catch {
          throw new Error("Invalid server response");
        }

        if (!response.ok) {
          throw new Error(data?.detail || data?.message || `Revenue Profit Trend Error ${response.status}: ${response.statusText}`);
        }


        setRevenueProfitTrend(data);
        // console.log(data);

      } catch (error) {
        console.log("Error fetching company's Revenue Profit Trend:", error);
        setTrendError(error.message);
      } finally {
        setTrendLoading(false);
      }
    };

    getRevenueProfitTrend();
  }, [companyName]);

  /* ================= COMMON DIRECTORSHIP ================= */
  // Used in RelatedCorporates
  useEffect(() => {
    if (!companyName) return;

    const getCommonDirectorship = async () => {
      try {
        setDirectorshipLoading(true);
        setDirectorshipError(null);

        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company/${encodeURIComponent(companyName)}/common-directorship`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        let data;

        try {
          data = await response.json();
        } catch {
          throw new Error("Invalid server response");
        }

        if (!response.ok) {
          throw new Error(`HTTP error of Common Directorship: ${response.status}`);
        }

        setCommonDirectorship(data);
        // console.log(data);

      } catch (error) {
        console.log("Error fetching company's Common Directorship:", error);
        setDirectorshipError(error.message);
      } finally {
        setDirectorshipLoading(false);
      }
    };

    getCommonDirectorship();
  }, [companyName]);

  /* ================= GET CASH FLOW DATA ================= */
  // Used in FinancialHighlightsDetails and FinancialHighlights
  useEffect(() => {
    if (!companyName) return;

    const getCashFlowData = async () => {
      try {
        setCashFlowLoading(true);
        setCashFlowError(null);

        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/financials/${encodeURIComponent(companyName)}/cash-flow?type=${cfType}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch cash flow data");
        }

        const data = await response.json();
        setCashFlowData(data);
      } catch (error) {
        console.error("Error in cash flow fetch:", error);
        setCashFlowError(error.message);
      } finally {
        setCashFlowLoading(false);
      }
    };

    getCashFlowData();
  }, [companyName, cfType]);

  /* ================= COMPANY HIGHLIGHTS (PAGINATED) ================= */
  // Used in CompanyHighlights and OwnershipSection
  useEffect(() => {
    if (!companyName) return;

    const fetchCompanyHighlights = async () => {
      try {
        setHighlightsLoading(true);
        setHighlightsError(null);

        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company/${encodeURIComponent(
            companyName
          )}/highlights?page=${highlightsPage}&limit=${highlightsLimit}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        let data;
        try {
          data = await response.json();
        } catch {
          throw new Error("Invalid server response");
        }

        if (response.status === 500) {
          throw new Error("Server Error");
        }


        if (!response.ok) {
          throw new Error(
            data?.detail ||
            data?.message ||
            `Company Highlights Error ${response.status}: ${response.statusText}`
          );
        }

        setCompanyHighlights(data);

      } catch (err) {
        console.log("Highlights API Error:", err);
        setHighlightsError(err.message);

      } finally {
        setHighlightsLoading(false);
      }
    };

    fetchCompanyHighlights();
  }, [companyName, highlightsPage, highlightsLimit]);


  /* ================= COMPANY CHARGES (PAGINATED) ================= */
  // Used in ChargesPage
  useEffect(() => {
    if (!companyName) return;

    const fetchCharges = async () => {
      try {
        setChargesLoading(true);
        setChargesError(null);

        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company/${encodeURIComponent(
            companyName
          )}/charges?open_page=${openPage}&closed_page=${closedPage}&limit=${chargesLimit}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        let data;
        try {
          data = await response.json();
        } catch {
          throw new Error("Invalid server response");
        }

        if (!response.ok) {
          throw new Error(
            data?.detail ||
            data?.message ||
            `Charges Error ${response.status}: ${response.statusText}`
          );
        }

        setChargesData(data);

      } catch (err) {
        console.log("Charges API Error:", err);
        setChargesError(err.message);
      } finally {
        setChargesLoading(false);
      }
    };

    fetchCharges();
  }, [companyName, openPage, closedPage, chargesLimit]);


  /* ================= DIRECTORS & KMPS ================= */
  // Used in DirectorsSection (which renders DirectorProfile)
  useEffect(() => {
    if (!companyName) return;

    const getDirectors = async () => {
      try {
        setDirectorsLoading(true);
        setDirectorsError(null);

        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company/${encodeURIComponent(
            companyName
          )}/directors-detailed`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        let data;

        try {
          data = await response.json();
        } catch {
          throw new Error("Invalid server response");
        }

        if (!response.ok) {
          throw new Error(
            data?.detail ||
            data?.message ||
            `Directors Error ${response.status}: ${response.statusText}`
          );
        }

        setDirectorsData(data);
        console.log("Directors API:", data);
      } catch (error) {
        console.log("Error fetching Directors:", error);
        setDirectorsError(error.message);
      } finally {
        setDirectorsLoading(false);
      }
    };

    getDirectors();
  }, [companyName]);

  /* ================= ALERTS ================= */
  // Used in AlertsContainer
  useEffect(() => {
    if (!companyName) return;

    const getAlerts = async () => {
      try {
        setAlertsLoading(true);
        setAlertsError(null);

        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company/${encodeURIComponent(
            companyName
          )}/alerts`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );


        let data;

        try {
          data = await response.json();
        } catch {
          throw new Error("Invalid server response");
        }

        if (!response.ok) {
          throw new Error(
            data?.detail ||
            data?.message ||
            `Alerts Error ${response.status}: ${response.statusText}`
          );
        }

        setAlertsData(data);
        console.log("Alerts API:", data);
      } catch (error) {
        console.log("Error fetching Alerts:", error);
        setAlertsError(error.message);
      } finally {
        setAlertsLoading(false);
      }
    };

    getAlerts();
  }, [companyName]);

  /* ================= AUDITORS DETAILS ================= */
  // Used in FinancialHighlightsDetails and FinancialHighlights
  useEffect(() => {
    if (!companyName || !audType) return;

    const getAuditorsData = async () => {
      try {
        setAuditorsLoading(true);
        setAuditorsError(null);
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/financials/${encodeURIComponent(companyName)}/auditors?type=${audType}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        const data = await response.json();
        setAuditorsData(data?.auditors || []);

      } catch (error) {
        console.log("Error in auditors fetch:", error);
        setAuditorsError(error.message);
      } finally {
        setAuditorsLoading(false);
      }
    };

    getAuditorsData();
  }, [companyName, audType]);

  /* ================= BALANCE SHEET DETAILS ================= */
  // Used in FinancialHighlightsDetails and FinancialHighlights
  useEffect(() => {
    if (!companyName || !bsType) return;

    const getBalanceSheet = async () => {
      try {
        setBalanceSheetLoading(true);
        setBalanceSheetError(null);
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/financials/${encodeURIComponent(companyName)}/balance-sheet?type=${bsType}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        const data = await response.json();
        setBalanceSheetData(data);

      } catch (error) {
        console.log("Error in balance sheet fetch:", error);
        setBalanceSheetError(error.message);
      } finally {
        setBalanceSheetLoading(false);
      }
    };

    getBalanceSheet();
  }, [companyName, bsType]);


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
      scrollToElementWithOffset(targetRef.current, 140);
    }

  }, [activeSection, activeSubSection]);

  return (
    <>
      {activeSection === "companyDetails" && (
        <>
          <div ref={overviewRef}>
            <CompanyOverview companyData={companyData} loading={companyLoading} error={companyError} />
            <CompanyDetails companyData={companyData} loading={companyLoading} error={companyError} />
          </div>

          <div ref={nameHistoryRef}>
            <NameHistory companyData={companyData} loading={companyLoading} error={companyError} />
          </div>

          <div ref={contactRef}>
            <ContactAddressSection companyData={companyData} loading={companyLoading} error={companyError} />
          </div>
        </>
      )}

      {/* Company Highlights */}
      {activeSection === "companyHighlights" && (
        <>
          <CompanyHighlights 
            companyHighlights={companyHighlights}
            page={highlightsPage}
            limit={highlightsLimit}
            loading={highlightsLoading}
            error={highlightsError}
            setPage={setHighlightsPage}
            setLimit={setLimit}
          />
          <FinancialHighlightsDetails 
            financialHighlights={financialHighlights}
            revenueProfitTrend={revenueProfitTrend}
            financialLoading={financialLoading}
            financialError={financialError}
            revenueLoading={trendLoading}
            revenueError={trendError}
            pnlApiData={pnlApiData}
            pnlLoading={pnlLoading}
            pnlError={pnlError}
            pnlViewType={pnlViewType}
            setPnlViewType={setPnlViewType}
            auditorsData={auditorsData}
            auditorsLoading={auditorsLoading}
            auditorsError={auditorsError}
            audType={audType}
            setAudType={setAudType}
            balanceSheetData={balanceSheetData}
            balanceSheetLoading={balanceSheetLoading}
            balanceSheetError={balanceSheetError}
            bsType={bsType}
            setBsType={setBsType}
            cashFlowData={cashFlowData}
            cashFlowLoading={cashFlowLoading}
            cashFlowError={cashFlowError}
            cfType={cfType}
            setCfType={setCfType}
          />
          <CompanyCharts />
          <ProductDetails />
        </>
      )}

      {/* Financials */}
      {activeSection === "financials" && (
        <FinancialHighlights 
          financialHighlights={financialHighlights}
          revenueProfitTrend={revenueProfitTrend}
          financialLoading={financialLoading}
          financialError={financialError}
          revenueLoading={trendLoading}
          revenueError={trendError}
          pnlApiData={pnlApiData}
          pnlLoading={pnlLoading}
          pnlError={pnlError}
          pnlViewType={pnlViewType}
          setPnlViewType={setPnlViewType}
          auditorsData={auditorsData}
          auditorsLoading={auditorsLoading}
          auditorsError={auditorsError}
          audType={audType}
          setAudType={setAudType}
          balanceSheetData={balanceSheetData}
          balanceSheetLoading={balanceSheetLoading}
          balanceSheetError={balanceSheetError}
          bsType={bsType}
          setBsType={setBsType}
          cashFlowData={cashFlowData}
          cashFlowLoading={cashFlowLoading}
          cashFlowError={cashFlowError}
          cfType={cfType}
          setCfType={setCfType}
        />
      )}

      {/* Directors & KMP */}
      {activeSection === "directorsKmp" && <DirectorsSection directorsData={directorsData} directorsLoading={directorsLoading} directorsError={directorsError} />}

      {/* Control & Ownership */}

      {activeSection === "controlOwnership" && (
        <OwnershipSection companyHighlights={companyHighlights} highlightsLoading={highlightsLoading} highlightsError={highlightsError} />
      )}

      {/* Charges */}
      {activeSection === "charges" && (
        <ChargesPage charges={chargesData} loading={chargesLoading}
          error={chargesError}
          openPage={openPage}
          closedPage={closedPage}
          limit={chargesLimit}
          setOpenPage={setOpenPage}
          setClosedPage={setClosedPage}
          setLimit={setChargesLimit} />
      )}

      {/* Peer Comparison */}
      {activeSection === "peerComparison" && (
        <PeerComparison />
      )}

      {/* Related Corporates */}
      {activeSection === "relatedCorporates" && (
        <RelatedCorporates commonDirectorship={commonDirectorship}
          loading={directorshipLoading}
          error={directorshipError} />
      )}

      {activeSection === "alerts" && <AlertsContainer alertsData={alertsData} alertsLoading={alertsLoading} alertsError={alertsError} />}

      {activeSection === "litigation" && <LigilationDetails />}
      {activeSection === "documents" && <Documents />}

      {activeSection === "compliance" && <ComplianceDetails />}
    </>
  );
}
