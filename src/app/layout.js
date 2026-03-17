"use client";

import React, { Suspense, useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "../components/company/newLayout/CompanyNewLayout.module.css";
import { CompanySectionProvider } from "@/components/company/context/CompanySectionContext";
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthPage = ["/login", "/signup", "/forgot-password"].includes(pathname);

  const [activeTab, setActiveTab] = useState("home");
  const [companyName, setCompanyName] = useState("");
  const [allCompanies, setAllCompanies] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [user, setUser] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const searchInputRef = useRef(null);
  const suggestionBoxRef = useRef(null);
  const suggestionRefs = useRef([]);

  /* FETCH COMPANIES */

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

  /* ROUTE CHANGE LOGIC */

  useEffect(() => {
    if (!pathname.startsWith("/company/")) {
      setCompanyName("");
      setSuggestions([]);
      setShowSuggestions(false);
      setActiveIndex(-1);
      suggestionRefs.current = [];
    } else {
      setShowSuggestions(false);
      setActiveIndex(-1);
    }
  }, [pathname]);

  /* SCROLL ACTIVE SUGGESTION */

  // Check Auth State
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, [pathname]); // Check on route change as well

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Clear cookie
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
    setUser(null);
    setShowUserDropdown(false);
    router.push("/login");
  };

  const getUserInitials = (email) => {
    if (!email) return "??";
    const namePart = email.split("@")[0];
    const lettersOnly = namePart.replace(/[^a-zA-Z]/g, "");
    if (lettersOnly.length >= 2) {
      return lettersOnly.substring(0, 2).toUpperCase();
    }
    return namePart.substring(0, 2).toUpperCase();
  };

  useEffect(() => {
    const container = suggestionBoxRef.current;
    const activeItem = suggestionRefs.current[activeIndex];

    if (!container || !activeItem) return;

    const containerTop = container.scrollTop;
    const containerBottom = containerTop + container.clientHeight;

    const itemTop = activeItem.offsetTop;
    const itemBottom = itemTop + activeItem.offsetHeight;

    if (itemBottom > containerBottom) {
      container.scrollTo({
        top: itemBottom - container.clientHeight,
        behavior: "smooth",
      });
    }

    if (itemTop < containerTop) {
      container.scrollTo({
        top: itemTop,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  /* KEYBOARD NAVIGATION */

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

  /* INPUT CHANGE */

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

  /* CLICK SUGGESTION */

  const handleSuggestionClick = (name) => {
    setCompanyName(name);
    setShowSuggestions(false);

    router.push(`/company/${name.replaceAll(" ", "-").toLowerCase()}`);
  };

  /* FORM SUBMIT */

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const query = formData.get("companySearch")?.toString().trim();

    if (!query) return;

    setShowSuggestions(false);

    router.push(`/company/${query.replaceAll(" ", "-").toLowerCase()}`);
  };

  /* SIDEBAR ACTIVE TAB */

  useEffect(() => {
    if (pathname === "/") {
      setActiveTab("home");
    } else if (pathname.startsWith("/companies")) {
      setActiveTab("company");
    } else if (pathname.startsWith("/people")) {
      setActiveTab("profile");
    }
  }, [pathname]);

  const handleNav = (tab, path) => {
    router.push(path);
  };

  /* CMD / CTRL + K FOCUS SEARCH */

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");

      if (
        (isMac && e.metaKey && e.key.toLowerCase() === "k") ||
        (!isMac && e.ctrlKey && e.key.toLowerCase() === "k")
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  /* CLOSE SUGGESTIONS ON OUTSIDE CLICK */

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(`.${styles.searchContainerr}`)) {
        setShowSuggestions(false);
      }
      if (!e.target.closest(`.${styles.userSection}`)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <Suspense fallback={null}>
      <CompanySectionProvider>
        <html lang="en">
          <body className={`${inter.className} ${inter.variable}`}>
            <Toaster 
              position="top-center" 
              reverseOrder={false} 
              toastOptions={{
                style: {
                  maxWidth: '400px',
                  fontSize: '14px',
                },
              }}
            />
            <div className={styles.layoutContainer}>

              {!isAuthPage && (
                <header className={styles.header}>
                  <div className={styles.headerLeft}>
                    <Link href="/">
                      <img
                        src="/icons/logo2.svg"
                        alt="Corporate Professionals"
                        className={styles.logo}
                      />
                    </Link>

                    <div className={styles.divider} />

                    <div className={styles.searchContainerr}>
                      <form
                        className={`${styles.searchContainer} ${styles.headerSearch}`}
                        onSubmit={handleSubmit}
                      >
                        <img src="/icons/search.svg" alt="" className={styles.searchIcon} />

                        <input
                          name="companySearch"
                          ref={searchInputRef}
                          type="text"
                          placeholder="Search by company name, CIN, LLPIN, or director name"
                          className={styles.searchInput}
                          value={companyName}
                          onChange={(e) => handleInputChange(e.target.value)}
                          onKeyDown={handleKeyDown}
                        />

                        <div className={styles.shortcut}>⌘ K</div>
                      </form>

                      {showSuggestions && suggestions.length > 0 && (
                        <div ref={suggestionBoxRef} className={styles.suggestionBox}>
                          {suggestions.map((item, index) => (
                            <div
                              key={index}
                              ref={(el) => (suggestionRefs.current[index] = el)}
                              className={`${styles.suggestionItem} ${index === activeIndex ? styles.activeSuggestion : ""
                                }`}
                              onClick={() =>
                                handleSuggestionClick(item.company_name)
                              }
                            >
                              {item.company_name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={styles.headerRight}>
                    {user ? (
                      <div className={styles.userSection} onClick={() => setShowUserDropdown(!showUserDropdown)}>
                        <div className={styles.avatarWrapper}>
                          <div className={styles.avatarText}>{getUserInitials(user.email)}</div>
                        </div>
                        {showUserDropdown && (
                          <div className={styles.userDropdown}>
                            <button onClick={handleLogout} className={styles.logoutBtn}>
                              Logout
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link href="/login" className={styles.loginBtn}>
                        Login
                      </Link>
                    )}
                  </div>
                </header>
              )}

              {isAuthPage ? (
                <main>{children}</main>
              ) : (
                <div className={styles.mainWrapper}>
                  <aside className={styles.sidebar}>
                    <div className={styles.sidebarIcons}>
                      <button
                        type="button"
                        className={`${styles.iconTab} ${activeTab === "home" ? styles.activeTab : ""
                          }`}
                        onClick={() => handleNav("home", "/")}
                      >
                        <img src="/icons/home-icon.svg" alt="Home" />
                      </button>

                      <button
                        type="button"
                        className={`${styles.iconTab} ${activeTab === "company" ? styles.activeTab : ""
                          }`}
                        onClick={() => handleNav("company", "/companies")}
                      >
                        <img src="/icons/company-icon.svg" alt="Companies" />
                      </button>

                      <button
                        type="button"
                        className={`${styles.iconTab} ${activeTab === "profile" ? styles.activeTab : ""
                          }`}
                        onClick={() => handleNav("profile", "/people")}
                      >
                        <img src="/icons/profile-icon.svg" alt="Profile" />
                      </button>
                    </div>
                  </aside>

                  <main className={styles.contentArea}>{children}</main>
                </div>
              )}
            </div>
          </body>
        </html>
      </CompanySectionProvider>
    </Suspense>
  );
}
