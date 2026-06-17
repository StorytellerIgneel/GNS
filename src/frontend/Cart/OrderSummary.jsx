import { useContext, useState, useEffect } from "react";
import PaymentMethodModal from "../pages/PaymentMethodModal";
import { CartContext } from "./CartContext";
import UserContext from "../pages/LoginContext";
import Modal from "../include/Modal/Modal";
import { Link } from "react-router-dom";

function OrderSummary() {
  const { getTotalPrice, cart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    if (checkoutOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [checkoutOpen]);

  const handleCheckoutClick = () => {
    setCheckoutOpen(true);
  };

  return (
    <div className="h-auto w-auto flex-col space-y-7 rounded-md bg-gray-200 px-7 pb-10 pt-5">
      <p className="text-lg font-bold">Order Summary</p>
      <div className="flex-col space-y-4">
        <div className="flex justify-between">
          <span className="text-sm">Price</span>
          <span className="text-sm">
            RM {parseFloat(getTotalPrice()).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Taxes</span>
          <span className="text-sm">Calculated at Checkout</span>
        </div>
        <div className="h-0.5 w-auto bg-gray-400"></div>
        <div className="flex justify-between">
          <span className="text-md font-bold">Subtotal</span>
          <span className="text-md font-bold">
            RM {parseFloat(getTotalPrice()).toFixed(2)}
          </span>
        </div>
      </div>
      {user ? (
        cart.length > 0 ? (
          <button
            className="button w-full bg-red-600 hover:bg-red-800"
            onClick={handleCheckoutClick}
          >
            Checkout
          </button>
        ) : (
          <Link to="/store">
            <button className="button mt-5 w-full bg-red-600 hover:bg-red-800">
              You have no items. Go to Store!
            </button>
          </Link>
        )
      ) : (
        <Link to="/login">
          <button className="button mt-5 w-full bg-red-600 hover:bg-red-800">
            Login to Checkout with us.
          </button>
        </Link>
      )}
      <Modal open={checkoutOpen} onClose={() => setCheckoutOpen(false)}>
        <PaymentMethodModal />
      </Modal>
    </div>
  );
}

export default OrderSummary;
