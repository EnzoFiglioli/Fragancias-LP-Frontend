import { useQuery } from "@tanstack/react-query";
import ProductList from "../components/ProductList";
import productService from "../services/index";
import { useParams } from "react-router-dom";
import { brands } from "../utils/brands";

const styles = {
  bannerContainer: {
    position: "relative" as const,
    width: "100%",
    height: "250px",
    overflow: "hidden",
    borderRadius: "12px",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  },
  overlay: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)", // 🔥 controla oscuridad acá
  },
  bannerTitle: {
    position: "absolute" as const,
    bottom: "20px",
    left: "20px",
    color: "#fff",
    fontSize: "2rem",
    fontWeight: 600,
    zIndex: 2,
  },
};


const ProductBrand = () => {
  const { brand } = useParams<{ brand: string }>();
  const banner = brands.find((i) => i.name == brand);
  const { data, isLoading } = useQuery({
    queryKey: ["products", brand],
    queryFn: () =>
      productService.getAllProducts({
        brand,
      }),
    enabled: !!brand,
  });

  if (isLoading) return <p>Cargando...</p>;

  return (
  <div style={{ marginTop: "10px" }}>
    <div style={styles.bannerContainer}>
      <img
        src={banner?.picture[1] ?? ""}
        alt={`${banner?.name}-banner`}
        style={styles.bannerImage}
      />
      <div style={styles.overlay} />
    </div>

    <ProductList products={data ?? []} title={brand ?? "Productos"} />
  </div>
);

};

export default ProductBrand;
