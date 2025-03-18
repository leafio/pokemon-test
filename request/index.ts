export interface PokemonItem {
  name: string;
  url: string;
}
export interface ListResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
export interface PokemonType {
  name: string;
  url: string;
}
export function getTypes(): Promise<ListResponse<PokemonType>> {
  return fetch("https://pokeapi.co/api/v2/type").then((res) => res.json());
}
export function listPokemon(page: number, limit: number): Promise<ListResponse<PokemonItem>> {
  let url = "https://pokeapi.co/api/v2/pokemon";
  if (page > 1) {
    url = `${url}?limit=24&offset=${limit * (page - 1)}`;
  }

  return fetch(url).then((res) => res.json());
}
export interface TypePokemons {
  damage_relations: {
    double_damage_from: {
      name: string;
      url: string;
    }[];
    double_damage_to: {
      name: string;
      url: string;
    }[];
    half_damage_from: {
      name: string;
      url: string;
    }[];
    half_damage_to: {
      name: string;
      url: string;
    }[];
    no_damage_from: {
      name: string;
      url: string;
    }[];
    no_damage_to: [];
  };
  game_indices: {
    game_index: number;
    generation: {
      name: string;
      url: string;
    };
  }[];
  generation: {
    name: string;
    url: string;
  };
  id: number;
  move_damage_class: {
    name: string;
    url: string;
  };
  moves: {
    name: string;
    url: string;
  }[];
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  past_damage_relations: [];
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
    slot: number;
  }[];
  sprites: {
    "generation-iii": {
      colosseum: {
        name_icon: string;
      };
      emerald: {
        name_icon: string;
      };
      "firered-leafgreen": {
        name_icon: string;
      };
      "ruby-saphire": {
        name_icon: string;
      };
      xd: {
        name_icon: string;
      };
    };
    "generation-iv": {
      "diamond-pearl": {
        name_icon: string;
      };
      "heartgold-soulsilver": {
        name_icon: string;
      };
      platinum: {
        name_icon: string;
      };
    };
    "generation-ix": {
      "scarlet-violet": {
        name_icon: string;
      };
    };
    "generation-v": {
      "black-2-white-2": {
        name_icon: string;
      };
      "black-white": {
        name_icon: string;
      };
    };
    "generation-vi": {
      "omega-ruby-alpha-sapphire": {
        name_icon: string;
      };
      "x-y": {
        name_icon: string;
      };
    };
    "generation-vii": {
      "lets-go-pikachu-lets-go-eevee": {
        name_icon: string;
      };
      "sun-moon": {
        name_icon: string;
      };
      "ultra-sun-ultra-moon": {
        name_icon: string;
      };
    };
    "generation-viii": {
      "brilliant-diamond-and-shining-pearl": {
        name_icon: string;
      };
      "legends-arceus": {
        name_icon: string;
      };
      "sword-shield": {
        name_icon: string;
      };
    };
  };
}

export function listPokemonByType(
  type: string,
): Promise<TypePokemons> {
  const url = `https://pokeapi.co/api/v2/type/${type}`;
  return fetch(url).then((res) => res.json());
}


export interface PokemonDetail {
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  cries: {
    latest: string;
    legacy: string;
  };
  forms: {
    name: string;
    url: string;
  }[];
  game_indices: {
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }[];
  height: number;
  held_items: [];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      order: string | null;
      version_group: {
        name: string;
        url: string;
      };
    }[];
  }[];
  name: string;
  order: number;
  past_abilities: [];
  past_types: [];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
    other: {
      dream_world: {
        front_default: string;
        front_female: string | null;
      };
      home: {
        front_default: string;
        front_female: string | null;
        front_shiny: string;
        front_shiny_female: string | null;
      };
      "official-artwork": {
        front_default: string;
        front_shiny: string;
      };
      showdown: {
        back_default: string;
        back_female: string | null;
        back_shiny: string;
        back_shiny_female: string | null;
        front_default: string;
        front_female: string | null;
        front_shiny: string;
        front_shiny_female: string | null;
      };
    };
    versions: {
      "generation-i": {
        "red-blue": {
          back_default: string;
          back_gray: string;
          back_transparent: string;
          front_default: string;
          front_gray: string;
          front_transparent: string;
        };
        yellow: {
          back_default: string;
          back_gray: string;
          back_transparent: string;
          front_default: string;
          front_gray: string;
          front_transparent: string;
        };
      };
      "generation-ii": {
        crystal: {
          back_default: string;
          back_shiny: string;
          back_shiny_transparent: string;
          back_transparent: string;
          front_default: string;
          front_shiny: string;
          front_shiny_transparent: string;
          front_transparent: string;
        };
        gold: {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
          front_transparent: string;
        };
        silver: {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
          front_transparent: string;
        };
      };
      "generation-iii": {
        emerald: {
          front_default: string;
          front_shiny: string;
        };
        "firered-leafgreen": {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
        "ruby-sapphire": {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
      };
      "generation-iv": {
        "diamond-pearl": {
          back_default: string;
          back_female: string | null;
          back_shiny: string;
          back_shiny_female: string | null;
          front_default: string;
          front_female: string | null;
          front_shiny: string;
          front_shiny_female: string | null;
        };
        "heartgold-soulsilver": {
          back_default: string;
          back_female: string | null;
          back_shiny: string;
          back_shiny_female: string | null;
          front_default: string;
          front_female: string | null;
          front_shiny: string;
          front_shiny_female: string | null;
        };
        platinum: {
          back_default: string;
          back_female: string | null;
          back_shiny: string;
          back_shiny_female: string | null;
          front_default: string;
          front_female: string | null;
          front_shiny: string;
          front_shiny_female: string | null;
        };
      };
      "generation-v": {
        "black-white": {
          animated: {
            back_default: string;
            back_female: string | null;
            back_shiny: string;
            back_shiny_female: string | null;
            front_default: string;
            front_female: string | null;
            front_shiny: string;
            front_shiny_female: string | null;
          };
          back_default: string;
          back_female: string | null;
          back_shiny: string;
          back_shiny_female: string | null;
          front_default: string;
          front_female: string | null;
          front_shiny: string;
          front_shiny_female: string | null;
        };
      };
      "generation-vi": {
        "omegaruby-alphasapphire": {
          front_default: string;
          front_female: string | null;
          front_shiny: string;
          front_shiny_female: string | null;
        };
        "x-y": {
          front_default: string;
          front_female: string | null;
          front_shiny: string;
          front_shiny_female: string | null;
        };
      };
      "generation-vii": {
        icons: {
          front_default: string;
          front_female: string | null;
        };
        "ultra-sun-ultra-moon": {
          front_default: string;
          front_female: string | null;
          front_shiny: string;
          front_shiny_female: string | null;
        };
      };
      "generation-viii": {
        icons: {
          front_default: string;
          front_female: string | null;
        };
      };
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
}

export function detailPokemon(url:string): Promise<PokemonDetail> {
  //const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  return fetch(url).then((res) => res.json());
}