import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { CartContext } from "../Cart/CartContext";

function PaymentStatusModal() {
  const navigate = useNavigate();
  const handleContinueBrowsingClick = () => {
    navigate("/store");
  };

  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    // Clear the cart when the component mounts
    clearCart();
  }, [clearCart]); // Dependency array to ensure this effect runs only once on mount

  return (
    <div>
      <h1>Checkout</h1>
      <div className="flex items-center">
        <div className="relative flex items-center justify-center pr-4">
          <span className="absolute font-bold text-white">3</span>
          <div className="h-8 w-8 rounded-full bg-black"></div>
        </div>
        <p className="text-lg font-bold">Payment Confirmation</p>
      </div>
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center space-y-6">
        <FaCheckCircle className="size-44" fill="#1CE852" />
        <p className="text-center font-bold">
          Payment was successful.
          <br />
          Thank you for purchasing with us!
        </p>
        <button
          className="button w-fit bg-black px-20 hover:bg-gray-800"
          onClick={handleContinueBrowsingClick}
        >
          Continue Browsing
        </button>
      </div>
    </div>
  );
}

export default PaymentStatusModal;
