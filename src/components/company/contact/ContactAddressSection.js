import React from "react";
import styles from "./ContactAddressSection.module.css";

const ContactAddressSection = () => {
  const contactItems = [
    {
      icon: "/icons/location2.svg",
      label: "Registered Address",
      value: "8/3 Asaf Ali Road New Delhi Delhi 110002",
    },
    {
      icon: "/icons/flag2.svg",
      label: "Country",
      value: "India",
    },
    {
      icon: "/icons/call.svg",
      label: "Telephone",
      value:
        "+91-11-23253488, 1171206000, +91-120-3962100, 18001031644, 0120-4182100, 0120-4374935, 01142786000",
    },
    {
      icon: "/icons/sms.svg",
      label: "Email Address",
      value: "N/A",
    },
    {
      icon: "/icons/globe.svg",
      label: "Website",
      value: "www.dabur.com/",
    },
  ];

  const socialIcons = [
    "/icons/fb.svg",
    "/icons/li.svg",
    "/icons/instagram.svg",
    "/icons/youtube2.svg",
    "/icons/twitter.svg",
  ];

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.sectionTitle}>Company Contact Details</h2>
      <div className={styles.container}>
        {contactItems.map((item, index) => (
          <div key={index} className={styles.row}>
            <div className={styles.iconContainer}>
              <img src={item.icon} alt={item.label} className={styles.icon} />
              {index < contactItems.length && (
                <div className={styles.line}></div>
              )}
            </div>
            <div className={styles.content}>
              <label className={styles.label}>{item.label}</label>
              <div className={styles.valueBox}>{item.value}</div>
            </div>
          </div>
        ))}

        <div className={styles.row}>
          <div className={styles.iconContainer}>
            <img
              src="/icons/link.svg"
              alt="Social Media"
              className={styles.icon}
            />
          </div>
          <div className={styles.content}>
            <label className={styles.label}>Social Media</label>
            <div className={styles.socialBox}>
              {socialIcons.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Social Icon"
                  className={styles.socialIcon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactAddressSection;
