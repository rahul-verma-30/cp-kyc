"use client";
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import PeopleProfileWrapper from '@/components/PeopleDatabase/PeopleProfileWrapper';

export default function PersonProfilePage() {
  const params = useParams();
  const router = useRouter();
  const din = params.din;

  return (
    <main>
      <PeopleProfileWrapper 
        din={din} 
        onBack={() => router.push('/people')} 
      />
    </main>
  );
}
