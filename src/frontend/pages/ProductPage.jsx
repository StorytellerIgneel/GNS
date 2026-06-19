import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CartContext from "../Cart/CartContext";
import "../../index.css";

function ProductPage() {
  const { game_id } = useParams(); // Use useParams to get the product ID from the URL
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isInCart, setIsInCart] = useState(false);

  // const addToCart = (game_id) => {
  //   const url = "http://localhost/y2s1-web-app/app/src/backend/php/add_to_cart.php";

  //   let formData = new FormData();
  //   formData.append('game_id', game_id);

  //   axios.post(url, formData)
  //   .then((response) =>  { console.log(response.data)})
  //   .catch(error => {console.log(error.message)})
  // };

  const handleClick = () => {
    if (isInCart) {
      // Redirect to the cart page if item is in the cart
      navigate("/cart");
    } else {
      //addToCart(game_id);
      addToCart(game);
    }
  };

  // fetch game from database in case does not survive reload (it did not)
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(
          `http://gns.000.pe/get_game.php?game_id=${game_id}`,
        );
        setGame(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [game_id]);

  useEffect(() => {
    // update `isInCart` based on the current `cart` state
    const checkIsInCart = () => {
      if (game) {
        const inCart = cart.some((item) => item.game_id === game.game_id);
        setIsInCart(inCart);
      }
    };
    checkIsInCart();
  }, [cart, game]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading game: {error.message}</p>;

  if (!game) return <p>No game found with id: {game_id}</p>;

  return (
    <div>
      <h1>{game.title}</h1>
      <img src={game.img_src} alt={game.title} className="rounded-md" />
      <div className="my-3 rounded-xl bg-red-100 p-5">
        <p>{game.desc}</p>
        <br />
        <p>
          Rating: {game.rating} ({game.rating_num})
        </p>
        <p>Release Date: {game.release_date}</p>
        <p>Developer: {game.developer}</p>
        <p>Publisher: {game.publisher}</p>
        <p>Price: RM {game.price == 0.0 ? "FREE" : game.price}</p>
        <button
          className="button m-5 inline-block w-[30%] self-end bg-red-600 hover:bg-red-700"
          onClick={handleClick}
        >
          {isInCart ? (
            <div className="flex items-center justify-center gap-x-3">
              In Cart {/* Cart check fill icon on the right */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-cart-check-fill"
                viewBox="0 0 16 16"
              >
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708" />
              </svg>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-x-3">
              Add to Cart {/* Cart plus fill icon on the right */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-cart-plus-fill"
                viewBox="0 0 16 16"
              >
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0" />
              </svg>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
export default ProductPage;
