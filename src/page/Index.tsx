import styles from "./Index.module.css";
import { categories } from "../utils/categories";
import { Link } from "react-router-dom";
import productService from "../services/index";
import ProductList from "../components/ProductList";
import { useQuery } from "@tanstack/react-query";
import BrandsSelector from "../components/shared/BrandsSelector";
import CategoryCarousel from "../components/shared/CategoryCarousel";

export const Index = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["offers"],
    queryFn: async () => await productService.getAllOffers(),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <p>Cargando productos...</p>;
  if (isError) return <p>Error al traer productos</p>;

  return (
    <>
      <main className={styles.main}>
        <h1>Fragancias que definen tu estilo</h1>
        <p style={{color:"#dfdfdf"}}>Perfumes, desodorantes y aromas premium para cada momento</p>
        <button className={styles.cta}>
          <Link to={"/products"}>Ver productos</Link>
        </button>
      </main>
      <section>
        <h2 className={styles.title}>Categorias</h2>
        <CategoryCarousel categories={categories} />
      </section>
      <section>
        <ProductList
          title="Encontra tu regalo hasta con un 20% OFF"
          products={data ?? []}
        />
      </section>
      <section className={styles.brandsSection}>
        <BrandsSelector sectionTitle={"Trabajamos con las siguientes marcas"} />
      </section>
    </>
  );
};
