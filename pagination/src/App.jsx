import "./App.css";
import { useState, useEffect } from "react";

export default function App() {
  const [products, setProducts] = useState();
  const [page, setPage] = useState(1);

  const fetchProduct = async () => {
    const response = await fetch(
      "https://dummyjson.com/products?limit=50&skip=10&select=title,price,images"
    );
    const data = await response.json();
    if (data && data.products) {
      setProducts(data.products);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  function selectPageHandler(selectedPage) {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length/10  &&
      selectedPage !== page
    )
      setPage(selectedPage);
  }
  return (
    <div>
      {products?.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((item) => {
            return (
              <div key={item.id} className="products__single">
                <img src={item.images[0]} alt={item.title} />
                <span>{item.title}</span>
                <span>{item.price}</span>
              </div>
            );
          })}
        </div>
      )}
      <div>
        {products?.length > 0 && (
          <div className="pagination">
            <span onClick={() => selectPageHandler(page - 1)}>👈</span>
            {[...Array(products?.length / 10)].map((_, i) => {
              return (
                <span
                  className={page === i + 1 ? "pagination__selected" : ""}
                  onClick={() => selectPageHandler(i + 1)}
                  key={i}
                >
                  {i + 1}
                </span>
              );
            })}

            <span onClick={() => selectPageHandler(page + 1)}>👉</span>
          </div>
        )}
      </div>
    </div>
  );
}
