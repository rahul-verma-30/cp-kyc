import React from "react";
import styles from "./ContactAddressSection.module.css";

const ContactAddressSection = ({ companyData, loading, error }) => {

  if (loading) {
    return <div className={styles.container}>Loading highlights...</div>;
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div style={{ color: "red", fontWeight: 500 }}>
          {error}
        </div>
      </div>
    );
  }

  const contact = companyData?.contact_details;

  if (!contact) {
    return null; // still loading
  }

  const contactItems = [
    {
      label: "Registered Address",
      value: contact?.registered_address || "-",
    },
    {
      label: "Country",
      value: contact?.country || "-",
    },
    {
      label: "Telephone",
      value: contact?.telephone || "-",
    },
    {
      label: "Email Address",
      value: contact.email_address ? (
        <a
          href={`mailto:${contact.email_address
            .replaceAll("[at]", "@")
            .replaceAll("[dot]", ".")}`}
          className={styles.link}
        >
          {contact.email_address
            .replaceAll("[at]", "@")
            .replaceAll("[dot]", ".")}
        </a>
      ) : (
        "-"
      ),
    },
    {
      label: "Website",
      value: contact.website ? (
        <a
          href={
            contact.website.startsWith("http")
              ? contact.website
              : `https://${contact.website}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {contact.website}
        </a>
      ) : (
        "-"
      ),
    },
  ];

  const socialIcons = [
    "/icons/fb.svg",
    "/icons/li.svg",
    "/icons/instagram.svg",
    "/icons/youtube2.svg",
    "/icons/twitter.svg",
  ];

  const getSocialIcon = (url) => {
    if (url.includes("facebook")) return "/icons/fb.svg";
    if (url.includes("linkedin")) return "/icons/li.svg";
    if (url.includes("instagram")) return "/icons/instagram.svg";
    if (url.includes("youtube")) return "/icons/youtube2.svg";
    if (url.includes("twitter") || url.includes("x.com"))
      return "/icons/twitter.svg";

    return "/icons/link.svg"; // fallback icon
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.sectionTitle}>Company Contact Details</h2>
      <div className={styles.container}>
        {contactItems.map((item, index) => (
          <div key={index} className={styles.row}>
            <label className={styles.label}>{item.label}</label>
            <div className={styles.dashedLine}></div>
            <div className={styles.valueBox}>{item.value}</div>
          </div>
        ))}

        <div className={styles.row}>
          <label className={styles.label}>Social Media</label>
          <div className={styles.dashedLine}></div>

          <div className={styles.socialBox}>
            {contact.social_media?.length > 0 ? (
              contact.social_media.map((link, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={getSocialIcon(link)}
                    alt="Social Icon"
                    className={styles.socialIcon}
                  />
                </a>
              ))
            ) : (
              <span>-</span>
            )}
          </div>
        </div>

        {/* <div className={styles.row}>
          <label className={styles.label}>Social Media</label>
          <div className={styles.dashedLine}></div>
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
        </div> */}
      </div>
    </div>
  );
};

export default ContactAddressSection;
