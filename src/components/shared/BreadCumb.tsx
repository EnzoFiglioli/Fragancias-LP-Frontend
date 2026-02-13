import { Link } from "react-router-dom";
import styles from "./Breadcrumb.module.css";

type Props = {
  category?: string;
  productName?: string;
};

export default function Breadcrumb({ category, productName }: Props) {
  return (
    <nav className={styles.breadcrumb} style={{paddingLeft:'30px'}}>
      <Link to="/">Inicio</Link>

      <span>/</span>

      <Link to="/products">Productos</Link>

      {category && (
        <>
          <span>/</span>
          <Link to={`/products?category=${category}`}>
            {category}
          </Link>
        </>
      )}

      {productName && (
        <>
          <span>/</span>
          <span className={styles.current}>{productName}</span>
        </>
      )}
    </nav>
  );
}
