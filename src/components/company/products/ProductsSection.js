import React from "react";
import styles from "./ProductsSection.module.css";
import Link from "next/link";

const ProductsSection = () => {
  const products = [
    {
      id: 1,
      image: "/images/ddrugs.svg", 
      label: "Digestive Drugs",
    },
    {
      id: 2,
      image: "/images/ayurveda.svg",
      label: "Ayurveda Products",
    },
    {
      id: 3,
      image: "/images/shampoo.svg",
      label: "Hair Shampoo",
    },
    {
      id: 4,
      image: "/images/oil.svg",
      label: "Dabur Amla Hair Oil",
    },
  ];

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Products or Services related to Dabur India Limited
        </h2>
        <Link href="/company/products" className={styles.viewAllBtn}>
          View All Products
          <span className={styles.arrowIcon}>
            <img src="/icons/chevron-right.svg" alt="" />
          </span>
        </Link>
      </div>

      <div className={styles.gridOuter}>
        <div className={styles.grid}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img
                  src={product.image}
                  alt={product.label}
                  className={styles.productImage}
                />
              </div>
              <div className={styles.footer}>
                <p className={styles.label}>{product.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
