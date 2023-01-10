import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import {BsSuitHeartFill, BsDownload} from 'react-icons/bs'
import { Blurhash } from 'react-blurhash'
import axios from 'axios'
import { likePhoto } from '../features/imagesSlice'

const Images = () => {

    const dispatch = useAppDispatch()
    const allPhotos = useAppSelector((state) => state.images.allPhotos) // Select All Photos

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


    const renderPhotos = allPhotos.map(photo => (
        <div key={photo.id} className='photo_container'>
            <a className='photo_wrapper'>
                <img src={photo.urls.small} title={photo.description} alt={photo.description} onLoad={() => setIsLoaded(true)} />
                {!isLoaded && <Blurhash hash={photo.blur_hash} width='300px' height='300px' />}
            </a>
            <div className='photo_handle'>
                <div className='likes_container'>
                    <i onClick={() => dispatch(likePhoto(photo.id))} className={photo.liked_by_user? 'liked' : "likes"}><BsSuitHeartFill /></i>
                    <p>{photo.likes} Liked this</p>
                </div>
                <a className='download' href={photo.urls.full} download={photo.description} target='_blank' rel='noreferrer' onClick={(e) => downloadApi(photo.links.download_location)} ><BsDownload /></a>
            </div>
        </div>
    ))


  return (
    <div className='images_container'>
        {renderPhotos}
    </div>
  )
}

export default Images