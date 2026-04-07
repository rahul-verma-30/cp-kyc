import React, { useState } from "react";
import styles from "./CompanyNews.module.css";
import SingleCalendar from "../../common/SingleCalendar";

const CompanyNews = () => {
    const [expandedIds, setExpandedIds] = useState({});
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const toggleExpand = (id) => {
        setExpandedIds(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const newsData = [
        {
            id: 1,
            status: 'green',
            title: 'Dabur Reports 8% Revenue Increase in Q3 for India',
            description: 'Dabur reported an 8% increase in revenue year-on-year, driven by strong performance across its healthcare and personal care segments. The company witnessed robust demand in its key categories, particularly in Ayurvedic products, immunity boosters, and oral care. Rural markets continued to outperform urban regions, contributing significantly to overall sales growth. Operational efficiency and strategic cost management helped improve margins, while continued investments in brand building and distribution expansion supported volume growth.',
            date: '12 Jan 2026',
            source: 'Business Standard',
            tag: 'Earnings',
            image: '/icons/Image.svg'
        },
        {
            id: 2,
            status: 'red',
            title: 'Dabur Achieves 8% Revenue Growth in Q3 in the United States',
            description: 'Dabur reported an 8% increase in revenue year-on-year, driven by strong performance across its healthcare and personal care segments. The company witnessed robust demand in its key categories, particularly in Ayurvedic products, immunity boosters, and oral care. Rural markets continued to outperform urban regions, contributing significantly to overall sales growth. Operational efficiency and strategic cost management helped improve margins, while continued investments in brand building and distribution expansion supported volume growth.',
            date: '12 Jan 2026',
            source: 'Business Standard',
            tag: 'Earnings',
            image: '/icons/Image.svg'
        },
        {
            id: 3,
            status: 'yellow',
            title: "Dabur's Q3 Results Reveal 8% Revenue Surge in the UK",
            description: 'Dabur reported an 8% increase in revenue year-on-year, driven by strong performance across its healthcare and personal care segments. The company witnessed robust demand in its key categories, particularly in Ayurvedic products, immunity boosters, and oral care. Rural markets continued to outperform urban regions, contributing significantly to overall sales growth.',
            date: '12 Jan 2026',
            source: 'Business Standard',
            tag: 'Earnings',
            image: '/icons/Image.svg'
        }
    ];



    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <div className={styles.titleSection}>
                    <h2>Company News</h2>
                    <p className={styles.subtitle}>Latest updates, announcements, and media coverage</p>
                </div>
                <div className={styles.actions}>
                    <div className={styles.calendarContainer}>
                        <button 
                            className={styles.calendarBtn}
                            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                        >
                            <img src="/calendaricon.svg" alt="calendar" className={styles.calendarIcon} />
                        </button>
                        {isCalendarOpen && (
                            <SingleCalendar 
                                selectedDate={selectedDate}
                                onSelect={(date) => setSelectedDate(date)}
                                onClose={() => setIsCalendarOpen(false)}
                            />
                        )}
                    </div>
                    <div className={styles.searchContainer}>
                        <img src="/icons/search.svg" alt="search" className={styles.searchIcon} />
                        <input 
                            type="text" 
                            placeholder="Search News..." 
                            className={styles.searchInput}
                        />
                    </div>
                </div>
            </header>

            <div className={styles.newsList}>
                {newsData.map((news) => (
                    <div key={news.id} className={styles.newsCard}>
                        <div className={`${styles.statusDot} ${styles[news.status]}`}></div>
                        <div className={styles.imageContainer}>
                            <img src={news.image} alt={news.title} className={styles.newsImage} />
                        </div>
                        <div className={styles.content}>
                            <h3 className={styles.newsTitle}>{news.title}</h3>
                            <div className={styles.descriptionContainer}>
                                <p className={`${styles.description} ${expandedIds[news.id] ? styles.expanded : styles.clamped}`}>
                                    {news.description}
                                </p>
                                {!expandedIds[news.id] && (
                                    <span 
                                        className={styles.showMoreInline} 
                                        onClick={() => toggleExpand(news.id)}
                                    >
                                        ... Show More
                                    </span>
                                )}
                                {expandedIds[news.id] && (
                                    <span 
                                        className={styles.showLess} 
                                        onClick={() => toggleExpand(news.id)}
                                    >
                                        Show Less
                                    </span>
                                )}
                            </div>
                            <div className={styles.footer}>
                                <div className={styles.footerItem}>
                                    <img src="/icons/footer_calender.svg" alt="date" className={styles.footerIcon} />
                                    <span>{news.date}</span>
                                </div>
                                <div className={styles.footerItem}>
                                    <img src="/globe.svg" alt="source" className={styles.footerIcon} />
                                    <span>{news.source}</span>
                                </div>
                                <div className={styles.tag}>
                                    {news.tag}
                                </div>
                            </div>
                        </div>
                        <div className={styles.cardActions}>
                            <img src="/viewsourceIcon.svg" alt="view-source" className={styles.actionIcon} />
                            <img src="/iconShare.svg" alt="share" className={styles.actionIcon} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompanyNews;
