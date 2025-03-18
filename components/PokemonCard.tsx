import { useEffect, useState } from "react";
import { detailPokemon, PokemonDetail, PokemonItem } from "../request";

const cached_pokemons = new Map<string, PokemonDetail>();
export default function PokemonCard({ pokemon }: { pokemon: PokemonItem }) {
  const id = pokemon.url.split("/").slice(-2)[0];
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!cached_pokemons.has(pokemon.url)) {
      setLoading(true);
      detailPokemon(pokemon.url).then((data) => {
        cached_pokemons.set(pokemon.url, data);
        setLoading(false);
      });
    }
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div
      key={pokemon.name}
      className="flex flex-col items-center justify-between"
    >
      <h3>{pokemon.name}</h3>
      <img
        alt={pokemon.name}
        loading="lazy"
        width="35"
        height="53"
        decoding="async"
        className="w-20"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`}
      />

      <p>Number: {id}</p>
    </div>
  );
}
