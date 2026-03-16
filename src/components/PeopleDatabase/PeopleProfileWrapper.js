"use client";
import React from 'react';
import DirectorProfile from '@/components/company/people/DirectorProfile';
import styles from './PeopleProfileWrapper.module.css';

const PeopleProfileWrapper = ({ person, onBack }) => {
  // Map person from PeopleDatabase to the format expected by DirectorProfile
  const mappedDirector = {
    name: person.name,
    designation: person.current.split(',')[0].trim() || "Director",
    din_pan: "01234567", // Placeholder as it's not in the database
    status: "Active",
    category: "Director",
    appointment_date: "01-Jan-2020",
    details: {
      profile_image: "/images/owner.svg",
      din_status: "Active",
      pan: "AABPB1234F",
      nationality: "Indian",
      dob: "15-Jun-1980",
      gender: "Male",
      residential_status: "Resident",
      email: person.name.toLowerCase().replace(' ', '.') + "@example.com",
      mobile: "+91-9876543210",
      current_residential_address: person.location,
      permanent_address: person.location,
      current_positions: [
        {
          company_name: person.current.split(',')[0].trim(),
          designation: "Managing Director",
          category: "Executive",
          tenure_years: "4 years",
          appointment_date: "01-Jan-2020"
        }
      ],
      past_positions: person.previous.split(',').map(pos => ({
        company_name: pos.trim(),
        designation: "Director",
        tenure_years: "2 years"
      }))
    }
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.backButton} onClick={onBack}>
        {/* <img src="/icons/chevron-left.svg" alt="" />
        Back to People Database */}
      </button>
      <DirectorProfile directors={[mappedDirector]} hideSidebar={true}  />
    </div>
  );
};

export default PeopleProfileWrapper;
