import { useContext } from "react";
import { CartContext } from "../Cart/CartContext";
import CartItem from "../Cart/CartItem";
import OrderSummary from "../Cart/OrderSummary";

function CartPage() {
  const { cart } = useContext(CartContext);

  return (
    <div className="CartPage">
      <h1>My Cart</h1>
      <div className="flex justify-between">
        <div className="w-[60%]">
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.map((game) => (
              <CartItem
                key={game.game_id}
                game_id={game.game_id}
                title={game.title}
                imgSrc={game.img_src}
                price={game.price}
              />
            ))
          )}
        </div>
        <div className="w-[32%] pb-5">
          <div className="sticky top-5">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
