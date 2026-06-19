import { useState, useEffect, useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import UserContext from "./LoginContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/profile-page.css";

//Mock user
const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data for testing
  useEffect(() => {
    // const mockGames = [
    //   {
    //     game_id: 105600,
    //     title: "Terraria",
    //     img_src:
    //       "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/105600/header.jpg?t=1666290860",
    //     desc: "Dig, fight, explore, build! Nothing is impossible in this action-packed adventure game.",
    //     rating: "Overwhelmingly Positive",
    //     rating_num: 1057516,
    //     release_date: "2011-05-17",
    //     developer: "Re-Logic",
    //     publisher: "Re-Logic",
    //     price: 26.75,
    //   },
    //   {
    //     game_id: 814380,
    //     title: "Sekiro™: Shadows Die Twice - GOTY Edition",
    //     img_src:
    //       "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/814380/header.jpg?t=1721684463",
    //     desc: "Game of the Year - The Game Awards 2019 Best Action Game of 2019 - IGN.",
    //     rating: "Overwhelmingly Positive",
    //     rating_num: 216477,
    //     release_date: "2019-03-22",
    //     developer: "FromSoftware, Inc.",
    //     publisher: "Activision",
    //     price: 285.0,
    //   },
    //   {
    //     game_id: 648800,
    //     title: "Raft",
    //     img_src:
    //       "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/648800/header.jpg?t=1725373838",
    //     desc: "Raft™ throws you and your friends into an epic oceanic adventure!",
    //     rating: "Very Positive",
    //     rating_num: 274865,
    //     release_date: "2022-06-21",
    //     developer: "Redbeet Interactive",
    //     publisher: "Axolot Games",
    //     price: 38.0,
    //   },
    // ];

    const url = "http://gns.000.pe/get_game.php";

    let mockGames = [];
    let formData = new FormData();
    const userObject = JSON.parse(localStorage.getItem("user")); // Convert back to an object

    formData.append("user_id", userObject.id);

    axios
      .post(url, formData)
      .then((response) => {
        console.log(response.data.game_list);
        if (response.data.success) {
          console.log("success");
          setPurchases(response.data.game_list);
        } else {
          mockGames = [];
        }
      })
      .catch((error) => {
        console.log(error.message);
      });

    setPurchases(mockGames);
    setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="profile-page">
        <header className="profile-header">
          {user ? (
            user.picture ? (
              <img
                src={user.picture}
                alt={user.name ? user.name : user.username}
              />
            ) : (
              <FaUserCircle className="profile-placeholder" />
            )
          ) : (
            <FaUserCircle className="profile-placeholder" />
          )}
          <div className="profile-info">
            <h1>{user ? (user.name ? user.name : user.username) : "Guest"}</h1>
            <p>{user ? user.email : "No email"}</p>
          </div>
        </header>
        <section className="profile-games">
          <h2>Purchased Games</h2>
          {purchases.length === 0 ? (
            <p>No games purchased</p>
          ) : (
            <ul className="games-list">
              {purchases.map((game) => (
                <li key={game.game_id} className="game-item">
                  <img
                    src={game.img_src}
                    alt={game.title}
                    className="game-img"
                  />
                  <div className="game-details">
                    <h3>{game.title}</h3>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
