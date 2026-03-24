"use client";

import CompanyLayout from "@/components/company/layout/CompanyLayout";
import ShareHoldingsPattern from "@/components/company/shareHoldingsPattern/ShareHoldingsPattern";
import ShareHoldingsTables from "@/components/company/shareHoldingsPattern/ShareHoldingsTables";
import ShareHoldingsTables2 from "@/components/company/shareHoldingsPattern/ShareHoldingsTables2";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ShareHoldingsPage() {
  const params = useParams();
  const decodedName = decodeURIComponent(params.name);

  const [shareholdingData, setShareholdingData] = useState(null);
  const [securityAllotmentData, setSecurityAllotmentData] = useState(null);
  const [groupStructureData, setGroupStructureData] = useState(null);
  const [overseasInvestmentData, setOverseasInvestmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [shareholdingRes, allotmentRes, structureRes, odiRes] = await Promise.all([
          fetch(`/api/company/${decodedName}/control-ownership/shareholding`),
          fetch(`/api/company/${decodedName}/control-ownership/security-allotment`),
          fetch(`/api/company/${decodedName}/control-ownership/group-structure`),
          fetch(`/api/company/${decodedName}/control-ownership/overseas-direct-investment`)
        ]);

        if (!shareholdingRes.ok || !allotmentRes.ok || !structureRes.ok || !odiRes.ok) 
          throw new Error("Failed to fetch data");

        const [shareholdingJson, allotmentJson, structureJson, odiJson] = await Promise.all([
          shareholdingRes.json(),
          allotmentRes.json(),
          structureRes.json(),
          odiRes.json()
        ]);

        setShareholdingData(shareholdingJson);
        setSecurityAllotmentData(allotmentJson);
        setGroupStructureData(structureJson);
        setOverseasInvestmentData(odiJson);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (decodedName) {
      fetchData();
    }
  }, [decodedName]);

  if (loading) return <CompanyLayout><div>Loading...</div></CompanyLayout>;
  if (error) return <CompanyLayout><div>Error: {error}</div></CompanyLayout>;

  return (
    <CompanyLayout>
      <ShareHoldingsPattern shareholdingData={shareholdingData} />
      <ShareHoldingsTables 
        shareholdingData={shareholdingData} 
        promoters_table_totals={shareholdingData?.promoters_table_totals}
        public_table_totals={shareholdingData?.public_other_than_promoters_table_totals}
      />
      <ShareHoldingsTables2 
        shareholdingData={shareholdingData} 
        securityAllotmentData={securityAllotmentData} 
      />
    </CompanyLayout>
  );
}
