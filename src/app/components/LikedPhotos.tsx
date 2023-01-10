import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import axios from 'axios'
import {BsSuitHeartFill, BsDownload} from 'react-icons/bs'
import { Blurhash } from 'react-blurhash'
import { dislikePhoto, likePhoto } from '../features/imagesSlice'
import { motion, spring } from 'framer-motion'

const LikedPhotos = () => {

    const dispatch = useAppDispatch()
    const likedImages = useAppSelector((state) => state.images.likedPhotos) // Select all Liked Photos
    const [isLoaded, setIsLoaded] = useState(false)

    const downloadApi = async <T = string> (endpoint: string): Promise<void> => {
        const response = await axios.get(`${endpoint}`).then(res => {
            return res.data.url
        }).catch(err => {
            if(err instanceof Error) {
                console.log(err.message)
            }
        })

        return response
    }


    const renderPhotos = likedImages.map(photo => (
        <motion.div 
        key={photo.id} 
        className='photo_container'

        initial={{opacity: 0, x: "-50vw"}}
        animate={{opacity: 1, x: "0vw", transition: {duration: 0.5}}}
        exit={{x: "+50vw", transition: {duration: 0.5}}}
        transition={spring}
        >
            
            <a className='photo_wrapper'>
                <img src={photo.urls.small} title={photo.description} alt={photo.description} onLoad={() => setIsLoaded(true)} />
                {!isLoaded && <Blurhash hash={photo.blur_hash} width='300px' height='300px' />}
            </a>
            <div className='photo_handle'>
                <div className='likes_container'>
                    <i onClick={() => dispatch(dislikePhoto(photo.id))} className={photo.liked_by_user? 'liked' : "likes"}><BsSuitHeartFill /></i>
                    <p>{photo.likes} Liked this</p>
                </div>
                <a className='download' href={photo.urls.full} download={photo.description} target='_blank' rel='noreferrer' onClick={(e) => downloadApi(photo.links.download_location)} ><BsDownload /></a>
            </div>
        </motion.div>
    ))

  return (
    <div className='liked_page'>
        <div className='images_container'>
          {renderPhotos}
        </div>
    </div>
  )
}


export default LikedPhotos