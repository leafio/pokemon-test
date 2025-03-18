"use client";
import { useEffect, useMemo, useRef, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import {
  PokemonItem,
  getTypes,
  listPokemon,
  listPokemonByType,
  TypePokemons,
  PokemonType,
} from "../../request";
import PokemonCard from "../../components/PokemonCard";

const limit = 24;

export default function Home() {
  const [types, setTypes] = useState<PokemonType[]>([]);
  const [typeLoading, setTypeLoading] = useState(true);
  useEffect(() => {
    getTypes().then((res) => {
      setTypes(res.results);
      setTypeLoading(false);
    });
  }, []);
  const [total, setTotal] = useState(0);

  const params = useSearchParams();
  const page = useMemo(() => parseInt(params.get("page") || "1"), [params]);
  const [typedList, setTypedList] = useState<PokemonItem[]>([]);
  const list_count = useMemo(
    () => (typedList.length ? typedList.length : total),
    [typedList, total]
  );

  const total_pages = useMemo(
    () => Math.ceil(list_count / limit),
    [list_count]
  );

  const [pagedList, setPagedList] = useState<PokemonItem[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => {
    setPageLoading(true);
    listPokemon(page, limit).then((data) => {
      setTotal(data.count);
      setPagedList(data.results);
      setPageLoading(false);
    });
  }, [page]);

  const activeTypes = useMemo(
    () => (params.get("type") || "").split(",").filter((t) => t),
    [params]
  );
  const ref_cached_types_list = useRef<Record<string, TypePokemons>>({});
  const [typedLoading, setTypedLoading] = useState(false);
  useEffect(() => {
    const validTypes = activeTypes.filter((t) => t);
    const notCached = validTypes.filter(
      (t) => !ref_cached_types_list.current[t]
    );
    if (validTypes.length > 0) {
      setTypedLoading(true);
      Promise.all(notCached.map((type) => listPokemonByType(type)))
        .then((res) => {
          res.forEach((d) => {
            ref_cached_types_list.current[d.name] = d;
          });
        })
        .then(() => {
          const total_list: { pokemon: PokemonItem; count: number }[] = [];
          validTypes.forEach((type) => {
            if (ref_cached_types_list.current[type]) {
              ref_cached_types_list.current[type].pokemon.forEach((r) => {
                const target = total_list.find(
                  (t) => t.pokemon.url === r.pokemon.url
                );
                if (target) {
                  target.count++;
                } else {
                  total_list.push({ pokemon: r.pokemon, count: 1 });
                }
              });
            }
          });
          const hasAllTypes = total_list.filter(
            (t) => t.count === (validTypes.length < 2 ? 1 : 2)
          );

          setTypedList(hasAllTypes.map((t) => t.pokemon));
          setTypedLoading(false);
        });
    } else {
      setTypedList([]);
    }
  }, [page, activeTypes]);

  const list = useMemo(() => {
    if (typedList.length > 0) {
      return typedList.slice((page - 1) * limit, page * limit);
    }
    return pagedList;
  }, [pagedList, typedList, page]);

  const router = useRouter();
  const go = (page: number, types = activeTypes) => {
    const typePart =
      types.length > 0 ? `type=${encodeURIComponent(types.join(","))}` : "";
    if (page > 1) {
      router.push(`?page=${page}${typePart ? `&${typePart}` : ""}`);
    } else {
      router.push(typePart ? `?${typePart}` : "/");
    }
  };
  const loading = useMemo(
    () => typeLoading || pageLoading || typedLoading,
    [typeLoading, pageLoading, typedLoading]
  );
  return (
    <section className="flex flex-col gap-4 px-10">
      <p className="py-4 text-center">欢迎来到宝可梦世界</p>
      <p>Total count: {loading ? "" : total}</p>

      <section className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <span>Types:</span>

        {types.map((type) => (
          <button
            key={type.name}
            className={
              "border p-4 " +
              (activeTypes.includes(type.name)
                ? "bg-blue-500 text-white"
                : "bg-white")
            }
            onClick={() => {
              if (activeTypes.includes(type.name)) {
                go(
                  1,
                  activeTypes.filter((t) => t !== type.name)
                );
              } else {
                go(1, [...activeTypes, type.name]);
              }
            }}
          >
            {type.name}
          </button>
        ))}
      </section>
      {loading ? (
        <div className="flex justify-center">Loading...</div>
      ) : (
        <>
          <section className="grid grid-cols-6 gap-16">
            {list.map((pokemon) => (
              <PokemonCard key={pokemon.url} pokemon={pokemon} />
            ))}
          </section>
          <div className="flex justify-center gap-4 py-4">
            {page > 1 && (
              <button
                className="rounded bg-blue-500 px-4 py-2 text-white cursor-pointer"
                onClick={() => go(page - 1)}
              >
                Previous
              </button>
            )}
            {page < total_pages && (
              <button
                className="rounded bg-blue-500 px-4 py-2 text-white cursor-pointer"
                onClick={() => go(page + 1)}
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
}
