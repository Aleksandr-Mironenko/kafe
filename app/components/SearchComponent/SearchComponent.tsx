"use client"
import { useDebounce } from "@/services/hook/debounce"
import styles from "./SearchComponent.module.scss"
import { useEffect, useState } from 'react'
export default function SearchComponent() {


  type Dish = {
    id: string
    name: string
    ingredients: string
    image_url: string | null
    price: number | null
    url_name: string | null
  }
  const [searchState, setSearchState] = useState("")
  const [results, setResults] = useState<Dish[]>([])
  const [loading, setLoading] = useState(false)

  // задержка перед запросом
  const debouncedSearch = useDebounce(searchState, 400)

  useEffect(() => {
    async function fetchDishes() {
      if (!debouncedSearch.trim()) {
        setResults([])
        return
      }

      try {
        setLoading(true)

        const response = await fetch(
          `/api/dishes/search?query=${encodeURIComponent(debouncedSearch)}`
        )

        const data = await response.json()

        setResults(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchDishes()
  }, [debouncedSearch])


  //   return ( 
  //     <input

  //       type="search"
  //       placeholder="Поиск в меню "
  //       autoComplete="off"
  //       required
  //       value={searchState}
  //       onChange={(e) => setSearchState(e.target.value)}
  //       className={styles.input}
  //     />
  //   </div>)
  // }
  return (
    <div className={styles.wrapper}>
      <input
        type="search"
        placeholder="Поиск в меню"
        autoComplete="off"
        value={searchState}
        onChange={(e) => setSearchState(e.target.value)}
        className={styles.input}
      />

      {!!results.length && (
        <div className={styles.dropdown}>
          {results.map((dish) => (
            <a
              key={dish.id}
              href={`/dish/${dish.url_name}`}
              className={styles.item}
            >
              <div>{dish.name}</div>
              <div className={styles.ingredients}>
                {dish.ingredients}
              </div>
            </a>
          ))}
        </div>
      )}

      {loading && (
        <div className={styles.loading}>
          Поиск...
        </div>
      )}
    </div>
  )
}