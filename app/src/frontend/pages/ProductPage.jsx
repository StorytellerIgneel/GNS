import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../Cart/CartContext";
import "../../index.css"

function ProductPage() {
  const { game_id } = useParams(); // Use useParams to get the product ID from the URL
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, addToCartContext } = useContext(CartContext); 
  const navigate = useNavigate();
  const [isInCart, setIsInCart] = useState(false);

  const addToCart = (game_id) => {
    const url = "http://localhost/y2s1-web-app/app/src/backend/php/add_to_cart.php";

    let formData = new FormData();
    formData.append('game_id', game_id);

    axios.post(url, formData)
    .then((response) =>  {})
    .catch(error => {console.log(error.message)})
  };

  const handleClick = () => {
    if (isInCart) {
      // Redirect to the cart page if item is in the cart
      navigate('/cart'); 
    } else {
      // addToCart();
      addToCart(game_id);
    }
  };

  
  // fetch game from database in case does not survive reload (it did not)
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(
          `http://localhost/y2s1-web-app/app/src/backend/php/get_game.php?game_id=${game_id}`,
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


  //check if its in cart
  useEffect(() => {
    // update `isInCart` based on the current `cart` state
    const checkIsInCart = () => {
      if (game) {
        const inCart = cart.some(item => item.game_id === game.game_id);
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
      <h1>{game.title}</h1> {/*Title*/}
      <img src={game.img_src} alt={game.title} />
      <div className="rounded-xl bg-red-100 p-5">
        <p>{game.desc}</p>
        <p>
          Rating: {game.rating} ({game.rating_num})
        </p>
        <p>Release Date: {game.release_date}</p>
        <p>Developer: {game.developer}</p>
        <p>Publisher: {game.publisher}</p>
        <p>Price: RM {game.price}</p>
        <button className="m-5 button w-[30%] self-end bg-red-600 hover:bg-red-800" onClick={handleClick}>{isInCart ? "In Cart" : "Add to Cart"}</button>
      </div>
    </div>
  );
}

export default ProductPage;
