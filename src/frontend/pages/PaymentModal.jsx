import { useContext, useState } from "react";
import { CartContext } from "../Cart/CartContext";
import { PaymentItem } from "../Cart/CartItem";
import { UserProfileLeft } from "../include/UserProfile";
import { useNavigate } from "react-router-dom";
import PaymentStatusModal from "./PaymentStatusModal";
import Modal from "../include/Modal/Modal";
import axios from "axios";
import Swal from "sweetalert2";
import "../../index.css";

function PaymentModal({ selcetedPaymentMethod }) {
  return (
    <div>
      <h1>Checkout</h1>
      <div className="flex items-center">
        <div className="relative flex items-center justify-center pr-4">
          <span className="absolute font-bold text-white">2</span>
          <div className="h-8 w-8 rounded-full bg-black"></div>
        </div>
        <p className="text-lg font-bold">Payment</p>
      </div>
      <div className="flex space-x-6 p-14">
        <div className="w-1/2">
          <CartItemsList />
          <div className="h-0.5 w-auto bg-gray-300"></div>
          <div className="p-2">
            <PaymentSummary />
          </div>
        </div>
        <div className="w-1/2">
          <TermsAndAgreement selcetedPaymentMethod={selcetedPaymentMethod} />
        </div>
      </div>
    </div>
  );
}

function CartItemsList() {
  const { cart } = useContext(CartContext);
  return cart.length === 0 ? (
    <p>Your cart is empty</p>
  ) : (
    cart.map((game) => (
      <PaymentItem
        key={game.game_id}
        title={game.title}
        imgSrc={game.img_src}
        price={game.price}
      />
    ))
  );
}

function TermsAndAgreement({ selcetedPaymentMethod }) {
  const [agree, setAgree] = useState(false);
  const [paymentStatusOpen, setPaymentStatusOpen] = useState(false);
  const { cart, getTotalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  const handleContinueClick = () => {
    console.log(cart);
    const url = "http://gns.000.pe/payment.php";

    let formData = new FormData();
    const userObject = JSON.parse(localStorage.getItem("user")); // Convert back to an object

    formData.append("user_id", userObject.id);
    formData.append("game_list", JSON.stringify(cart));
    formData.append("payment_method", selcetedPaymentMethod);
    formData.append("total_amount", parseFloat(getTotalPrice()).toFixed(2));

    axios
      .post(url, formData)
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          Swal.fire({
            icon: "success",
            title: "Purchase Complete!",
            text: "You can now view your purchase history",
          }); // Handle the failure case if needed
          navigate("/store"); // Navigate to '/store' if successful
        } else {
          Swal.fire({
            icon: "error",
            title: "Payment Error",
            text: response.data.error,
          }); // Handle the failure case if needed
        }
      })
      .catch((error) => {
        console.log(error.message);
      });

    setPaymentStatusOpen(true);
  };

  return (
    <div className="sticky top-5 space-y-5">
      <div className="space-y-8 rounded-lg bg-gray-200 px-16 py-5">
        <div className="py-4">
          <UserProfileLeft />
        </div>
        <div className="space-y-5">
          <p className="font-bold">Payment via {selcetedPaymentMethod}</p>
          <div className="inline-flex items-center rounded-lg bg-gray-300 p-2">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              value="terms"
              onChange={(e) => setAgree(e.target.checked)}
              required
              className="checkbox"
            />
            <label htmlFor="terms" className="px-3 py-2 text-justify text-xs">
              I agree to the terms of the GameNonStop Subscriber Agreement. {}
              {selcetedPaymentMethod} transactions are authorized through
              IntelPay website. Click the button below to open a new web browser
              window to initiate the transaction.
            </label>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <input
          type="button"
          className="button w-[50%] bg-red-600 hover:bg-red-800 disabled:bg-gray-500"
          value="Checkout"
          disabled={!agree}
          onClick={handleContinueClick}
        />
      </div>
      <Modal
        open={paymentStatusOpen}
        onClose={() => setPaymentStatusOpen(false)}
      >
        <PaymentStatusModal />
      </Modal>
    </div>
  );
}

function PaymentSummary() {
  const { getTotalPrice } = useContext(CartContext);
  return (
    <div>
      <div className="flex-col space-y-5">
        <div className="flex justify-between">
          <span className="text-sm">Subtotal</span>
          <span className="text-sm">
            RM {parseFloat(getTotalPrice()).toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-md font-bold">Total</span>
          <span className="text-3xl font-bold">
            RM {parseFloat(getTotalPrice()).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Included 8% VAT</span>
          <span className="text-sm">
            RM {(parseFloat(getTotalPrice()) * 0.08).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
