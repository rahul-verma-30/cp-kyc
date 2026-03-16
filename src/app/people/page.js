"use client";
import React, { useState } from "react";
import PeopleDatabase from "@/components/PeopleDatabase/PeopleDatabase";
import PeopleProfileWrapper from "@/components/PeopleDatabase/PeopleProfileWrapper";

export default function PeopleDatabasePage() {
  const [selectedPerson, setSelectedPerson] = useState(null);

  return (
    <main>
      {selectedPerson ? (
        <PeopleProfileWrapper 
          person={selectedPerson} 
          onBack={() => setSelectedPerson(null)} 
        />
      ) : (
        <PeopleDatabase onRowClick={(person) => setSelectedPerson(person)} />
      )}
    </main>
  );
}