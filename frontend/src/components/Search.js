import React from 'react'
import { useSearch } from '../hooks/useSearch';
import Pagination from "./Pagination";

export default function Search({page, setPage}) {
    const {search, isLoading, limit, currPageItemsNum} = useSearch();
    const [query, setQuery] = React.useState('');
    
  
    React.useEffect(()=>{
      const fetchItems = async () => {
       await search(query, page);
      }
      fetchItems();
    }, [query, page])
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        await search(query)
    }

    const flipPage = (num) => {
      setPage(prev => prev + num)
    }
   console.log(page)
    return (
      <>
      <form className="search--bar" onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="search workouts..."
          value={query}
          onChange={(e) => {setQuery(e.target.value); setPage(0)}}
        ></input>
        <button disabled={isLoading}>
          <span className="material-symbols-outlined">search</span>
        </button>
      </form>
      <Pagination
       currPageItemsNum={currPageItemsNum}
       page={page}
       limit={limit}
       flipPage={(num)=> flipPage(num)}
        />
      </>
    );
}