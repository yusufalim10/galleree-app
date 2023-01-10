import React from 'react'
import Images from './Images'
import Searchbar from './Searchbar'
import { Link, Outlet } from 'react-router-dom'
import { MdCamera } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '../store'
import { homePageClick, likedPageClick } from '../features/navbarSlice'
import { motion, spring } from 'framer-motion'

const Homepage = () => {

  return (
    <motion.div 
      className='root_page'
      initial={{opacity: 0, x: "-50vw"}}
      animate={{opacity: 1, x: "0vw", transition: {duration: 0.5}}}
      exit={{x: "+50vw", transition: {duration: 0.5}}}
      transition={spring}
    >

        <Images />

    </motion.div>
  )
}

export const HomeLayout = () => {

  const dispatch = useAppDispatch()
  const onHome = useAppSelector((state) => state.navbar.onHomepage)
  const onLiked = useAppSelector((state) => state.navbar.onLikedPage)

    return (
      <>
        <ul className='home_navbar'>
          <li className='home_link' onClick={() => dispatch(homePageClick())}>
            <Link to='/'>
              <h1>alleree <i><MdCamera /></i></h1>
            </Link>
          </li>
          <li className='route_links'>
            <ul>
              <li className='links' onClick={() => dispatch(homePageClick())}>
                <Link to='/'>
                  Home
                </Link>
              </li>
              <li className='links' onClick={() => dispatch(likedPageClick())}>
                <Link to='/liked-photos'>
                  Liked Photos
                </Link>
              </li>
              <li className={onLiked? "selectUI onLiked" : "selectUI"}>
                <div></div>
              </li>
            </ul>
          </li>
          <li className='searchbar_container'>
            <Searchbar />
          </li>
        </ul>
        <div className='page_container'>
          <Outlet />
        </div>
      </>
    )
}

export default Homepage