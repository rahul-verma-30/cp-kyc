import styles from "./News.module.css";

export default function NewsPage() {
  const newsData = [
    // {
    //   date: "Tuesday, January 6, 2026",
    //   items: [
    //     {
    //       source: "Business Standard India",
    //       dateStr: "Jan 6, 2026",
    //       text: "Dabur slips 4% on releasing Q3 business update; here's what analysts say",
    //     },
    //   ],
    // },
    // {
    //   date: "Wednesday, January 7, 2026",
    //   items: [
    //     {
    //       source: "Economic Times",
    //       dateStr: "Jan 7, 2026",
    //       text: "Legacy ayurveda brands take the new age wellness route to stay relevant",
    //     },
    //   ],
    // },
    // {
    //   date: "Thursday, January 8, 2026",
    //   items: [
    //     {
    //       source: "Financial Express",
    //       dateStr: "Jan 8, 2026",
    //       text: "India's Dabur sees early demand revival after tax-cut disruption",
    //     },
    //   ],
    // },
    // {
    //   date: "Friday, January 9, 2026",
    //   items: [
    //     {
    //       source: "Hindu Business Line",
    //       dateStr: "Jan 9, 2026",
    //       text: "How Delhi HC's e-KYC Mandate For Domain Name Registration Reshapes India's Online Ecosystem",
    //     },
    //   ],
    // },
    // {
    //   date: "Saturday, January 10, 2026",
    //   items: [
    //     {
    //       source: "Mint",
    //       dateStr: "Jan 10, 2026",
    //       text: "Delhi High Court grants relief to Dabur India in 'Pudin Hara' trademark dispute",
    //     },
    //   ],
    // },
    // {
    //   date: "Sunday, January 11, 2026",
    //   items: [
    //     {
    //       source: "Business Today",
    //       dateStr: "Jan 11, 2026",
    //       text: "HC temporarily stays registration of 'Wellford Pudin Hara' trademark on Dabur plea",
    //     },
    //   ],
    // },
    // {
    //   date: "Monday, January 12, 2026",
    //   items: [
    //     {
    //       source: "The Times of India",
    //       dateStr: "Jan 12, 2026",
    //       text: "FMCG volume growth moderates amid GST transition in September quarter, value up 12.9%: NielsenIQ",
    //     },
    //   ],
    // },
    // {
    //   date: "Wednesday, January 14, 2026",
    //   items: [
    //     {
    //       source: "The Economic Times",
    //       dateStr: "Jan 14, 2026",
    //       text: "Delhi High Court restrains Patanjali from airing Chywanprash ad; relief for Dabur India",
    //     },
    //     {
    //       source: "The Economic Times",
    //       dateStr: "Jan 14, 2026",
    //       text: "Delhi HC restrains Patanjali from airing 'Dhoka' Chyawanprash ad after Dabur's plea",
    //     },
    //     {
    //       source: "The Economic Times",
    //       dateStr: "Jan 14, 2026",
    //       text: "Delhi High Court restrains Patanjali from airing Chyawanprash A",
    //     },
    //   ],
    // },
  ];

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>News & Analysis</h3>

      <div className={styles.newsWrapper}>
        {newsData.map((section, sIdx) => (
          <div key={sIdx} className={styles.daySection}>
            <div className={styles.dateHeader}>{section.date}</div>

            <div className={styles.newsList}>
              {section.items.map((item, iIdx) => (
                <div key={iIdx} className={styles.newsItem}>
                  <div className={styles.metaInfo}>
                    <span>{item.source}</span>
                    <div className={styles.dotSeparator}></div>
                    <span>{item.dateStr}</span>
                  </div>

                  <div className={styles.headlineContainer}>
                    <span className={styles.headline}>{item.text}</span>
                    <img
                      src="/icons/arrow-up-right.svg"
                      alt=""
                      className={styles.externalIcon}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className={styles.loadMoreContainer}>
          {/* <button className={styles.loadMoreButton}>
            Load More
            <img src="/icons/chevron-right-red.svg" alt="" width="16" height="16" />
          </button> */}
        </div>
      </div>
    </div>
  );
}
