import { useContext } from "react";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";

function CartItem({ game_id, title, imgSrc, price }) {
  const { removeFromCart } = useContext(CartContext);

  function handleRemoveClick() {
    removeFromCart(game_id);
    console.log(localStorage.getItem("cart"));
  }

  return (
    <div className="py-4">
      <div className="flex h-auto w-auto gap-x-4 pb-4">
        <Link to={`/store/${game_id}`}>
          <img
            className="h-20 w-40 rounded-md object-cover"
            src={imgSrc}
            alt={title}
          />
        </Link>
        <div className="inline-flex flex-grow flex-col justify-between">
          <div className="flex items-center justify-between">
            <Link to={`/store/${game_id}`}>
              <div className="text-lg font-bold">{title}</div>
            </Link>
            <span className="px-2 py-1 text-sm font-bold">RM {price}</span>
          </div>
          <div className="flex items-end justify-end">
            <button
              className="px-2 text-sm text-gray-600 hover:font-semibold"
              onClick={handleRemoveClick}
            >
              Remove from cart
            </button>
          </div>
        </div>
      </div>
      <div className="h-0.5 w-auto bg-gray-300"></div>
    </div>
  );
}
export default CartItem;

export function PaymentItem({ imgSrc, title, price }) {
  return (
    <div>
      <div className="flex h-auto w-auto items-center gap-x-4 pb-4">
        <img
          className="h-20 w-40 rounded-md object-cover"
          src={imgSrc}
          alt={title}
        />
        <div className="inline-flex flex-grow flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="line-clamp-3 flex-grow text-sm font-bold">
              {title}
            </div>
            <p className="whitespace-nowrap px-2 py-1 text-sm font-semibold">
              RM {price == 0.0 ? "FREE" : price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
