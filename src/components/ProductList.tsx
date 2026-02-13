import type { Product } from "../@types";
import styles from "../page/Products.module.css";
import { Link } from "react-router-dom";

type Props = {
  products: Product[];
  title: string
};

const ProductList = ({ products, title }: Props) => {
  if (products.length === 0) {
    return (
      <section>
        <h2>
          ¡Lo sientimos! No se encontraron ningun producto en esa categoria :(
        </h2>
      </section>
    );
  }
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.grid}>
        {products.map((product: Product) => (
          <article key={product.id} className={styles.card}>
            <Link
              className={styles.button}
              to={`/products/${product.id}`}
              style={{ background: "transparent" }}
            >
              <picture className={styles.picture}>
                <img
                  src={product.pictures[0]?.url ?? ""}
                  alt={product.name}
                  className={styles.image}
                />
                <span className={styles.category}>
                  {product.category.categoryName}
                </span>
              </picture>

              <div className={styles.info}>
                <h3>{product.name}</h3>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
