import { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { AiOutlineStar,AiFillStar } from "react-icons/ai";
import styles from "./styles.module.scss";
import cn from "classnames";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { enums } from "@/utils/enums";
import { addApiKey } from "@/utils/addApiKey";
import Link from "next/link";

const SearchSection = ({ handleCloseSearch }) => {
  const { baseApiUrl } = enums;
  const [searchText, setSearchText] = useState("");
  const [searchDatas, setSearchDatas] = useState([]);
  const [favouriteMovies, setFavouriteMovies] = useState(JSON.parse(localStorage.getItem("favouriteMovies")) || []);

  const changeSearchText = (event) => setSearchText(event.target.value);

  const getSearchData = async () => {
    try {
      const { data: { results } } = await axios.get(
        addApiKey(`${baseApiUrl}/search/movie?query=${searchText}&page=1`)
      );

      if (results) {
        setSearchDatas(results)
        console.log(results)
      }
    } catch (error) {
      console.log(error)
    }
  };

  let searchTimeout = "";

  useEffect(() => {
    clearTimeout(searchTimeout);

    if (searchText) {
      searchTimeout = setTimeout(async () => {
        getSearchData();
      }, 250);
    }

    return () => clearTimeout(searchTimeout);
  }, [searchText]);

  const handleFavIcon = (id) => {
    if (favouriteMovies.includes(id)) {
      const filteredFavMovies = favouriteMovies.filter((movieId) => movieId !== id);
  
      setFavouriteMovies(filteredFavMovies);
  
      localStorage.setItem("favouriteMovies", JSON.stringify(filteredFavMovies));
    } else {
      const newFavMovies = [...favouriteMovies, id];
  
      setFavouriteMovies(newFavMovies);
  
      localStorage.setItem("favouriteMovies", JSON.stringify(newFavMovies));
    }
  }

  return (
    <div className={cn("p-1", styles.search)}>
      <div className={cn("w-container mr-auto ml-auto", styles.searchInner)}>
        <div className="flex items-center">
          <HiOutlineSearch className="mr-1" />
          <input
            placeholder="Film, dizi, kişi ara"
            className="flex-1 border-none outline-none"
            value={searchText}
            onChange={changeSearchText}
          />
          <ImCross
            onClick={handleCloseSearch}
            className="text-light cursor-pointer"
          />
        </div>
        <div className={styles.searchResult}>
          <div className={cn(styles.searchResultWrapper)}>
            <div className={cn("w-container mr-auto ml-auto", styles.searchResultWrapperInner)}>
            {searchDatas.map((searchData) => (
              <div key={searchData.id} className={styles.searchResultWrapperItemWrapper}>
                <Link onClick={handleCloseSearch} className="flex items-center" href={`/movie/${ searchData.id }`}>
                  <HiOutlineSearch className="mr-1" /> {searchData.original_title}
                </Link>
                  {
                    favouriteMovies.includes(searchData.id) ?
                      <AiFillStar className={cn("ml-1", styles.favIcon, styles.favIconActive)} onClick={()=>{
                        handleFavIcon(searchData.id)
                      }} /> :
                      <AiOutlineStar className={cn("ml-1", styles.favIcon)} onClick={()=>{
                        handleFavIcon(searchData.id)
                      }} />
                  }
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
