import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import { useSort } from "../Context/SortContext";
import { useSearch } from "../Context/SearchContext";
import type { Product } from "../../Type/Type";
import { fetchAllProducts } from "./ProductApi";
import { FiShare2 } from "react-icons/fi";

const ProductCard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const LIMIT = 20;
  const [showShareCard, setShowShareCard] = useState(false);
  const [productToShare, setProductToShare] = useState<Product | null>(null);
  const shareCard = useRef<HTMLDivElement | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);
  const navigate = useNavigate();
  const { sort } = useSort();
  const { searchQuery } = useSearch();

  const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
      const handler = setTimeout(() => setDebouncedValue(value), delay);
      return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
  };

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

   const fetchMoreProducts = useCallback(async () => {
    if (loading || !hasMore) return;
    try {
      setLoading(true);
      const newProducts = await fetchAllProducts(LIMIT, page * LIMIT);
      if (newProducts.length < LIMIT) setHasMore(false);

      setProducts((prev) => {
        const ids = new Set(prev.map((p) => p.id));
        const filtered = newProducts.filter((p) => !ids.has(p.id));
        return [...prev, ...filtered];
      });
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    fetchMoreProducts();
  }, [fetchMoreProducts]);

  const lastProductRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) setPage((prev) => prev + 1);
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const sortedProducts = useMemo(() => {
    let sorted = [...products];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "name-asc")
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === "name-desc")
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    return sorted;
  }, [products, sort]);

  const filteredProducts = useMemo(
    () =>
      sortedProducts.filter((product) =>
        product.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      ),
    [sortedProducts, debouncedSearchQuery]
  );

  const handleShareClick = (product: Product) => {
    setProductToShare(product);
    setShowShareCard(true);
  };

  const handleCopyClick = () => {
    if (productToShare) {
      const url = `${window.location.origin}/productdetail/${productToShare.id}`;
      navigator.clipboard.writeText(url).then(() => {
        alert("Link copied to clipboard!");
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Type the event as MouseEvent
      if (
        shareCard.current &&
        !shareCard.current.contains(event.target as Node)
      ) {
        setShowShareCard(false); // Close the share card if click is outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-6 min-h-screen">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredProducts.map((product, index) => {
          const isLast = index === filteredProducts.length - 1;
          return (
            <div
              key={product.id}
              ref={isLast ? lastProductRef : null}
              className="group perspective cursor-pointer"
            >
              <div className="relative w-full h-80 duration-700 transform-style preserve-3d group-hover:rotate-y-180 transition-transform">
                <div className="absolute w-full h-full backface-hidden rounded-xl shadow-lg p-4 bg-gray-800 text-white text-center">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-40 object-contain rounded mb-3"
                  />
                  <h3 className="text-lg font-bold mb-1">{product.title}</h3>
                  <p className="text-sm text-gray-300 mb-1">
                    Price: ${product.price}
                  </p>
                  <p className="text-sm text-green-400">
                    Discount: {product.discountPercentage}%
                  </p>
                </div>
                <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-lg p-4 bg-gray-800 text-white text-center flex flex-col justify-center items-center">
                  <h3 className="text-lg font-semibold mb-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-300">{product.description}</p>

                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/productdetail/${product.id}`);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      View Details
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShareClick(product);
                      }}
                      className="px-3 py-3 bg-gray-700 text-white rounded hover:bg-gray-600 gap-2"
                    >
                      <FiShare2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {showShareCard && productToShare && (
        <div
          ref={shareCard}
          className="fixed top-1/10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black p-6 rounded-lg shadow-lg z-50 w-1/3 border border-white"
        >
          <h4 className="text-xl font-semibold mb-3 w-full">
            Share this product
          </h4>
          <p className="text-sm mb-4 w-full">Copy this URL to share:</p>
          <div className="flex items-center gap-3">
            <input
              type="text"
              readOnly
              value={`${window.location.origin}/productdetail/${productToShare.id}`}
              className="p-2 bg-gray-900 rounded text-md w-160"
            />
            <button
              onClick={handleCopyClick}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              Copy
            </button>
          </div>
        </div>
      )}
      {loading && (
        <div className="flex justify-center mt-6">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
