"use client";
import React from "react";
import PeopleDatabase from "@/components/PeopleDatabase/PeopleDatabase";
import { useRouter } from "next/navigation";

export default function PeopleDatabasePage() {
  const router = useRouter();

  return (
    <main>
      <PeopleDatabase onRowClick={(person) => router.push(`/people/${person.din_pan}`)} />
    </main>
  );
}