"use client";

import { useState } from "react";

import AlertsTabs from "./AlertsTabs";

import AlertsOverview from "./overview/AlertsOverview";
import Observation from "./observation/page";
import DefaultsViolations from "./defaults-violations/page";
import FormerDirectors from "./former-directors/page";
import AlertsNews from "./news/page";

export default function AlertsContainer({ alertsData, alertsLoading, alertsError }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <AlertsTabs activeTab={activeTab} setActiveTab={setActiveTab} alertsData={alertsData} />

      {activeTab === "overview" && <AlertsOverview alertsData={alertsData} alertsLoading={alertsLoading} alertsError={alertsError} />}
      {activeTab === "observation" && <Observation alertsData={alertsData} alertsLoading={alertsLoading} alertsError={alertsError} />}
      {activeTab === "defaults" && <DefaultsViolations alertsData={alertsData} alertsLoading={alertsLoading} alertsError={alertsError} />}
      {activeTab === "formerDirectors" && <FormerDirectors alertsData={alertsData} alertsLoading={alertsLoading} alertsError={alertsError} />}
      {activeTab === "news" && <AlertsNews alertsData={alertsData} alertsLoading={alertsLoading} alertsError={alertsError} />}
    </>
  );
}
