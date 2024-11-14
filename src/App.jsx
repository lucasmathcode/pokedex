import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [pokemons, setPokemons] = useState({});
  const [busca, setBusca] = useState("");

  const getPokemons = (id) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        const pokemon = response.data;
        setPokemons((prevPokemon) => ({ ...prevPokemon, [id]: pokemon }));
      })
      .catch((error) => console.error("Erro ao buscar Pokémon:", error));
  };

  const arrayPokemons = () =>
    Array(150)
      .fill()
      .map((_, index) => getPokemons(index + 1));

  const buscarPokemons = Object.values(pokemons).filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(busca.toLowerCase()) ||
      pokemon.id === parseInt(busca)
  );

  useEffect(() => {
    arrayPokemons();
  }, []);

  return (
    <div className="container">
      <h1>Pokedex</h1>

      <div className="busca-container">
        <input
          className="busca"
          type="search"
          placeholder="PESQUISAR POKEMONS"
          value={busca}
          onChange={({ target }) => setBusca(target.value)}
        />
      </div>
      <ul className="pokemons">
        {buscarPokemons.map(({ id, name, types }) => (
          <li key={id} className={`card ${types[0]?.type?.name || ""}`}>
            <img
              className="card-image"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              alt={name}
            />
            <h2>
              {id}. {name}
            </h2>
            <p className="type">
              {types.map((item) => item.type.name).join(" || ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
