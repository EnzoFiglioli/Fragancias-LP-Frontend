//import { useState } from "react";
import type { ComponentType } from "react";
import type { Product } from "../@types";
import { getAllProducts } from "../services";
//import { useFilter } from "../hooks/useFilter";
//import Filters from "../components/Filters/Filters";
import ProductList from "../components/ProductList";
import { useQuery } from "@tanstack/react-query";
import BrandsSelector from "../components/shared/BrandsSelector";
import { useSearchParams } from "react-router-dom";

const ProductsPage = () => {
  // const [category, setCategory] = useState("all");
  // const [sort, setSort] = useState("default");
  const [searchParams] = useSearchParams();
  const category = searchParams?.get("category") || undefined;

  console.log(searchParams.get("category"));
  const { isLoading, isError, data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => await getAllProducts({category}),
  });

  //const { filterByCategory, sortItems } = useFilter();

  const ProductListComponent = ProductList as ComponentType<{
    products: Product[];
    title: string;
  }>;

  //  const visibleProducts = sortItems(filterByCategory(data, category), sort);

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar productos :/</p>;

  return (
    <div style={{ marginTop: "100px" }}>
      {/*<Filters
        category={category}
        sort={sort}
        onCategoryChange={setCategory}
        onSortChange={setSort}
      />*/}
      <BrandsSelector sectionTitle="" />
      <ProductListComponent title={"Nuestros productos"} products={data} />
    </div>
  );
};

export default ProductsPage;
