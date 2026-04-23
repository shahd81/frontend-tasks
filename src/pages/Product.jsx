import { useEffect, useState, useRef, useCallback } from "react";
import { getProducts } from "../services/product.service";
import ProductCard from "../components/ProductCard";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { getUsers } from "../services/user.service";
export default function Products() {
  const limit = 10;
  const { t } = useTranslation("product");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 

  const observerRef = useRef();
  const firstLoadRef = useRef(false);
  const loadUsers = useRef(false);

  // Debounce
  const debounce = (func, delay = 300) => {
    let timer;
    return (...args) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  useEffect(() => {
    if (!firstLoadRef.current) {
      fetchData();
      firstLoadRef.current = true;
    }
    
    
  }, []);
  const fetchData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const res = await getProducts(limit, skip);
      setProducts((prev) => [...prev, ...res.products]);
     
      if (skip + limit >= res.total) {
        setHasMore(false);
      } else {
        setPage((prev) => prev + 1);
        setSkip((prev) => prev + 50);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading]);

  const debouncedFetch = useCallback(debounce(fetchData, 200), [fetchData]);

  // Intersection Observer
  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            debouncedFetch();
          }
        },
        { threshold: 1 }
      );

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore, debouncedFetch]
  );

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
 
  // Skeleton loader
  const SkeletonCard = () => (
    <div className="animate-pulse bg-gray-200 rounded-2xl h-72 w-full " />
  );
  // const navigate =useNavigate();
  // setTimeout(()=>{
  //     navigate("/Users");
  //   }, 5000);
 
  // return (
  // <Navigate to="/Users" replace />);
// } 
  useEffect(() => {
  if (!loading && !hasMore && !loadUsers.current) {
    loadUsers.current = true;
    getUsers();
  }
}, [loading, hasMore]);
 return (
    <div className="p-5 pt-20 text-gray-900 bg-white dark:bg-gray-900 dark:text-white">
      <h2 className="text-2xl text-center font-bold mb-4">{t("product")}</h2>

      {/* Search input */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder={t("searchProducts")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-4 py-2 w-full max-w-md text-black dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:p-4">
        {filteredProducts.map((product, idx) => {
          if (idx === filteredProducts.length - 1) {
            return (
              <div key={product.id} ref={lastProductRef}>
                <ProductCard product={product} />
              </div>
            );
          }
          return <ProductCard key={product.id} product={product} />;
        })}

        {loading &&
          Array.from({ length: limit }).map((_, i) => <SkeletonCard key={i} />)}
      </div>

      {error && (
        <div className="mt-4 text-red-500">
          <p>{error}</p>
          <button
            onClick={fetchData}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      )}

      {!hasMore && !loading && (
        <p className="mt-4 text-center text-black text-lg dark:text-white">
          {t("noMoreProducts")}
        </p>
      )}
      {filteredProducts.length==0&&
      <p className="text-black dark:text-white text-center">{t("noMoreProducts")}</p>
      
      }
    </div>
  );
}