"use client";

import { useState } from "react";

import AlertsTabs from "./AlertsTabs";

import AlertsOverview from "./overview/AlertsOverview";
import Observation from "./observation/page";
import DefaultsViolations from "./defaults-violations/page";
import FormerDirectors from "./former-directors/page";
import AlertsNews from "./news/page";

export default function AlertsContainer() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <AlertsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "overview" && <AlertsOverview />}
      {activeTab === "observation" && <Observation />}
      {activeTab === "defaults" && <DefaultsViolations />}
      {activeTab === "formerDirectors" && <FormerDirectors />}
      {activeTab === "news" && <AlertsNews />}
    </>
  );
}
