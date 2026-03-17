"use client";

import { useRouter } from "next/navigation";
import styles from "./HeroSection.module.css";
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const searchInputRef = useRef(null);

  const suggestionRefs = useRef([]);

  const [allCompanies, setAllCompanies] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleSearch = () => {
    const query = companyName.trim();
    if (!query) return;

    router.push(`/company/${encodeURIComponent(query)}`);
  };

  // Fetch Companies
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/companies?per_page=100`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        const result = await res.json();

        if (Array.isArray(result?.items)) {
          setAllCompanies(result.items);
        } else {
          setAllCompanies([]);
        }
      } catch (error) {
        console.log("Error fetching companies:", error);
        setAllCompanies([]);
      }
    };

    fetchCompanies();
  }, []);

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }

    if (e.key === "Enter") {
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        e.preventDefault();
        handleSuggestionClick(suggestions[activeIndex].company_name);
      }
    }
  };

  const handleInputChange = (value) => {
    setCompanyName(value);
    setActiveIndex(-1);

    if (!value.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const searchTerm = value.toLowerCase();
    const startsWith = [];
    const contains = [];

    allCompanies.forEach((company) => {
      const name = company.company_name.toLowerCase();
      if (name.startsWith(searchTerm)) {
        startsWith.push(company);
      } else if (name.includes(searchTerm)) {
        contains.push(company);
      }
    });

    const filtered = [...startsWith, ...contains];

    setSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (name) => {
    setCompanyName(name);
    setShowSuggestions(false);

    router.push(`/company/${name.replaceAll(" ", "-").toLowerCase()}`);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(`.${styles.searchContainerr}`)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const query = formData.get("companySearch")?.toString().trim();

    if (!query) return;

    setShowSuggestions(false);

    router.push(`/company/${query.replaceAll(" ", "-").toLowerCase()}`);
  };

  // ⭐ AUTO SCROLL TO ACTIVE ITEM
  useEffect(() => {
    if (activeIndex >= 0 && suggestionRefs.current[activeIndex]) {
      suggestionRefs.current[activeIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeIndex]);

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.textWrapper}>
          <h1 className={styles.title}>
            Know who you’re dealing with — before you decide
          </h1>

          <p className={styles.subtitle}>
            Comprehensive company KYC with ownership, control, financial health,
            and compliance insights
          </p>
        </div>

        <div className={styles.searchOuter}>
          <form className={styles.searchContainer} onSubmit={handleSubmit}>
            <div className={styles.searchIcon}>
              <div className={styles.squareIcon}>
                <img
                  src="/icons/company.svg"
                  alt="Company Icon"
                  className={styles.iconImg}
                />
              </div>
            </div>

            <input
              name="companySearch"
              ref={searchInputRef}
              type="text"
              placeholder="Search by company name, CIN, LLPIN, or director name"
              className={styles.input}
              value={companyName}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button type="submit" className={styles.searchBtn}>
              <span className={styles.arrowUp}>
                <img
                  src="/icons/arrow-up.svg"
                  alt="Search"
                  className={styles.arrowImg}
                />
              </span>
            </button>
          </form>

          {showSuggestions && suggestions.length > 0 && (
            <div className={styles.suggestionBox}>
              {suggestions.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => (suggestionRefs.current[index] = el)}
                  className={`${styles.suggestionItem} ${index === activeIndex ? styles.activeSuggestion : ""
                    }`}
                  onClick={() => handleSuggestionClick(item.company_name)}
                >
                  {item.company_name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.gridOverlay}></div>
    </section>
  );
}