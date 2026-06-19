import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";

function Store() {
  const [games, setGames] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const response = await axios.get("http://gns.000.pe/get_game.php");
        setGames(response.data); // Set the fetched data to games state
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    loadGames();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading games: {error.message}</p>;

  return (
    <div>
      <h1>Store</h1>
      <div className="flex flex-col items-center">
        <h2 className="text-center text-2xl font-bold">
          Browse Your Favourite Games.
        </h2>
        <Carousel />
        <div className="mx-auto my-0">
          <ul className="product-list grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <li key={game.game_id}>
                <ProductCard
                  slug={game.game_id}
                  title={game.title}
                  imgSrc={game.img_src}
                  price={game.price}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ slug, title, imgSrc, price }) {
  return (
    <div className="m-3 h-auto max-w-xs rounded-xl bg-gray-200 p-3 shadow-sm hover:scale-105 hover:bg-red-100">
      <Link to={`/store/${slug}`} className="rounded-md">
        <img
          className="h-35 rounded-md object-scale-down"
          src={imgSrc}
          alt={title}
        />
      </Link>
      <Link to={`/store/${slug}`}>
        <p className="truncate py-2 text-lg font-bold">{title}</p>
      </Link>
      <p>{parseFloat(price) === 0.0 ? "FREE" : `RM ${price}`}</p>
    </div>
  );
}

export default Store;
