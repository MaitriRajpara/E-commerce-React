import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../../Type/Type";
import { fetchProductById } from "./ProductApi";
import { useNavigate } from "react-router-dom";
import "./magnifier.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const lensRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const zoomRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      if (id) {
        const data = await fetchProductById(id);
        setProduct(data);
      }
    };
    getProduct();
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        navigate("/");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navigate]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (lensRef.current && imageRef.current && zoomRef.current) {
      const lens = lensRef.current;
      const img = imageRef.current;
      const zoom = zoomRef.current;

      const { left, top } = img.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      const lensX = x - lens.offsetWidth / 2;
      const lensY = y - lens.offsetHeight / 2;

      lens.style.left = `${lensX}px`;
      lens.style.top = `${lensY}px`;
      lens.style.display = "block";

      const fx = zoom.offsetWidth / lens.offsetWidth;
      const fy = zoom.offsetHeight / lens.offsetHeight;

      zoom.style.backgroundImage = `url(${img.src})`;
      zoom.style.backgroundSize = `${img.width * fx}px ${img.height * fy}px`;
      zoom.style.backgroundPosition = `-${lensX * fx}px -${lensY * fy}px`;
      zoom.style.display = "block";
    }
  };

  const handleMouseEnter = () => {
    if (lensRef.current) lensRef.current.style.display = "block";
    if (zoomRef.current) zoomRef.current.style.display = "block";
  };

  const handleMouseLeave = () => {
    if (lensRef.current) lensRef.current.style.display = "none";
    if (zoomRef.current) zoomRef.current.style.display = "none";
  };

  const discountedPrice = (price: number, discount: number) =>
    (price - (price * discount) / 100).toFixed(2);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-black">
      <div ref={containerRef}></div>
      <div className="p-8 max-w-4xl mx-auto bg-gray-900 text-white rounded-xl shadow-lg mt-10">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative w-full md:w-1/2">
            <div
              className="magnifier-container"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                ref={imageRef}
                src={product.thumbnail}
                alt={product.title}
                className="w-full object-cover"
              />
              <div ref={lensRef} className="magnifier-lens"></div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="bg-gray-800 rounded-lg shadow-md p-2 text-center hidden md:block">
              <h4 className="text-lg font-semibold mb-2 text-white">
                Zoomed View
              </h4>
              <div ref={zoomRef} className="zoom-result mx-auto" />
            </div>
          </div>
        </div>

        <div
          className="product-info mt-6 transition-opacity duration-300"
          onMouseLeave={(e) => {
            const target = e.currentTarget;
            target.style.opacity = "1";
          }}
        >
          <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
          <p className="text-gray-300 mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-green-400 mb-2">
            Discounted Price: $
            {discountedPrice(product.price, product.discountPercentage)}
          </p>
          <p className="text-md text-gray-400 mb-1">
            Original Price:{" "}
            <span className="line-through">${product.price}</span>
          </p>
          <p className="text-md text-blue-400 mb-2">
            Discount: {product.discountPercentage}%
          </p>
          <p className="text-sm text-gray-400">
            Stock Available: {product.stock}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
