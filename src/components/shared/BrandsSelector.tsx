import { Link } from "react-router-dom";
import styles from "./BrandsSelector.module.css";
import { brands } from "../../utils/brands";

const BrandsSelector = ({ sectionTitle }: { sectionTitle: string }) => {
  return (
    <div>
      {sectionTitle && <h2 style={{ textAlign: "center" }}>{sectionTitle}</h2>}

      <div className={styles.brandsContainer}>
        {brands.map((brand, ix) => (
          <Link to={`/products/brand/${brand.name}`} key={ix} className={styles.brandCard}>
            <img src={brand.picture[0]} alt={`${brand.name}-logo`} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrandsSelector;
