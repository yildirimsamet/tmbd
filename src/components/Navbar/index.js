import { dropdownData } from "@/staticData";
import Dropdown from "../Dropdown";
import { TiPlus } from 'react-icons/ti';
import { HiOutlineSearch } from 'react-icons/hi';
import { ImCross } from 'react-icons/im';
import Link from "next/link";
import { useState } from "react";
import SearchSection from "../SearchSection";
import styles from './styles.module.scss';
import cn from "classnames";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
  }

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  }

  return (
    <nav className={cn('bg-primary w-fullScreenWidth flex items-center relative', styles.navbar)}>
      <div className="w-container mr-auto ml-auto flex justify-between pr-4 pl-4">
        <div className="flex items-center">
        <Link href='/'>
        <img className="w-15 h-2 mr-1" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" />
        </Link>
          {dropdownData.map(({ title, dropdownList }, index) => (
            <Dropdown key={index} title={title} dropdownList={dropdownList} dropdownOpenSide="down" />
          ))}
        </div>
        <div className="flex items-center">
          <TiPlus className="text-white text-2xl cursor-pointer mr-2"/>
          <div className="p-1 mr-2 text-white rounded-sm cursor-pointer hover:text-black hover:bg-white">TR</div>
          <Link href="#" className="text-white mr-2">Giriş</Link>
          <Link href="#" className="text-white mr-2" >TMDB'ye Katıl</Link>
          {
            isSearchOpen ?
              <ImCross onClick={handleCloseSearch} className="text-white text-2xl cursor-pointer"/> :
              <HiOutlineSearch onClick={handleOpenSearch} className="text-secondary text-2xl cursor-pointer" />
          }
        </div>
      </div>
      { isSearchOpen && <SearchSection  handleCloseSearch={handleCloseSearch}/> }
    </nav>
  );
};

export default Navbar;
