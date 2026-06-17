import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function SearchBar() {
  const [searchGame, setSearchGame] = useState("");
  const [results, setResults] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const searchScrape = () => {
    console.log(searchGame);
    axios
      .post("http://localhost:5000/searchScrape", { game_title: searchGame })
      .then((response) => {
        console.log("Python script output:", response.data.output);
      })
      .catch((error) => {
        console.error("Error triggering Python script:", error);
      });
  };

  useEffect(() => {
    if (searchGame.trim() !== "") {
      const url = "http://gns.000.pe/searchGame.php";
      const formData = new FormData();
      formData.append("searchGame", searchGame);

      axios
        .post(url, formData)
        .then((response) => {
          if (response.data.success) setResults(response.data.games);
          else setResults([]); // Clear search results
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      setResults([]); // Clear results if search term is empty
    }
  }, [searchGame]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsDropdownVisible(true)}
      onMouseLeave={() => setIsDropdownVisible(false)}
    >
      <div className="flex">
        <input
          type="search"
          className="h-8 w-60 rounded-md bg-white pl-3 pr-3 text-sm font-semibold placeholder-gray-400 focus:outline-none"
          placeholder="Search for a game..."
          onChange={(e) => setSearchGame(e.target.value)}
          value={searchGame}
        />
        <button
          className="h-8 rounded-md bg-blue-500 px-4 text-white hover:bg-blue-700 focus:outline-none"
          onClick={searchScrape}
        >
          Search
        </button>
      </div>

      {isDropdownVisible && results.length > 0 && (
        <div className="absolute z-10 w-72 rounded-sm bg-white py-2 shadow-md">
          {results.map((game) => (
            <SearchResults
              key={game.game_id}
              img_src={game.img_src}
              title={game.title}
              slug={game.game_id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SearchResults({ img_src, title, slug }) {
  return (
    <Link to={`/store/${slug}`}>
      <div className="flex h-12 w-full items-center space-x-2 bg-white px-2 hover:bg-gray-200">
        <img
          src={img_src}
          alt={title}
          className="h-10 w-20 rounded object-cover"
        />
        <p className="text-sm font-semibold">{title}</p>
      </div>
    </Link>
  );
}

export default SearchBar;
