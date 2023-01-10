
import { search } from '../features/searchSlice'
import { useAppDispatch, useAppSelector } from '../store'
import {CgSearch} from 'react-icons/cg'

import { isImageValid, searchImage } from '../features/imagesSlice'
import { photosModel } from '../models/photosModel'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Searchbar = () => {

    const dispatch = useAppDispatch()
    const searchValue = useAppSelector((state) => state.search.searchValue) // Access search value

    const [imageResult, setImageResult] = useState<photosModel[]>([])

    const searchAPI = async <T extends photosModel> (): Promise<photosModel[]> => {
        const response = await axios.get(`https://api.unsplash.com/search/photos?page=1&per_page=20&query=${searchValue}&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`).then(res => {
            return res.data.results
        }).catch(err => {
            if(err instanceof Error) {
                console.log(err.message)
            }
        })

        return response
    }

    useEffect(() => {
        searchAPI().then(res => {
            if(isImageValid(res)) {

                const loadedImages = res.map(image => ({
                    id: image.id,
                    created_at: image.created_at,
                    width: image.width,
                    height: image.height,
                    blur_hash: image.blur_hash,
                    likes: image.likes,
                    liked_by_user: image.liked_by_user,
                    description: image.description,
                    user: {
                        id: image.user.id,
                        username: image.user.username,
                        profile_image: image.user.profile_image
                    },
                    urls: image.urls,
                    links: {
                        download: image.links.download,
                        download_location: image.links.download_location
                    }
                }))

                setImageResult(loadedImages)
            }
        }).catch(err => {
            if(err instanceof Error) {
                console.log(err.message)
            }
        })
    }, [searchValue])

    const onSearchSubmit = (e:any) => {
        e.preventDefault()

        dispatch(searchImage(imageResult))

        dispatch(search(""))
    }

  return (
    <div className='searchbar'>

        
        <form onSubmit={onSearchSubmit} className='searchbar_form'>
            <input 
            type="search" 
            name='searchBar'
            value={searchValue}
            onChange={(e) => dispatch(search(e.target.value))}
            placeholder='Search image...'
            />

            <button type='submit'><CgSearch /></button>
        </form>
    </div>
  )
}

export default Searchbar