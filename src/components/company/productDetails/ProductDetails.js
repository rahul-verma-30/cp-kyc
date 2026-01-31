import React from "react";
import styles from "./ProductDetails.module.css";
import Link from "next/link";

const ProductDetails = () => {
  const products = [
    { id: 1, name: "Digestive Drugs", image: "/images/ddrugs.svg" },
    { id: 2, name: "Ayurveda Products", image: "/images/ayurveda.svg" },
    { id: 3, name: "Hair Shampoo", image: "/images/shampoo.svg" },
    { id: 4, name: "Dabur Amla Hair Oil", image: "/images/oil.svg" },
    { id: 5, name: "Bleaching Cream", image: "/images/creamm.svg" },
  ];

  // Duplicating to match the 4 rows shown in the design
  const allProducts = [...products, ...products, ...products, ...products];

  return (
    <div className={styles.container}>
      {/* <nav className={styles.breadcrumb}>
        <Link href="/company" className={styles.breadcrumbLink}>
          Company Details
        </Link>
        <span className={styles.breadcrumbSeparator}>
          <img
            src="/icons/arrow-right-black.svg"
            alt=""
            className={styles.breadcrumbIcon}
          />
        </span>
        <span className={styles.breadcrumbActive}>Products Details</span>
      </nav> */}

      <h1 className={styles.title}>
        Products or Services related to Dabur India Limited
      </h1>

      <div className={styles.gridWrapper}>
        <div className={styles.productGrid}>
          {allProducts.map((product, index) => (
            <div key={index} className={styles.productCard}>
              <div className={styles.imageContainer}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.productImage}
                />
              </div>
              <div className={styles.productInfo}>
                <p className={styles.productName}>{product.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
