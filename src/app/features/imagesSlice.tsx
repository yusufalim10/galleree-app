import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { photosModel, photosState } from '../models/photosModel'

const initialState: photosState = {
    allPhotos: [],
    likedPhotos: [],
    isFocused: false,
    status: "idle" || "pending" || "success" || "failed",
    error: null,
}

export const isImageValid = (object: unknown): object is photosModel[] => {
    if(object !== null && typeof object === "object") {
        return true
    }

    return false
}

export const fetchImages = createAsyncThunk('images/fetchImages', async <T extends photosModel > (): Promise<T[]> => {

    const response = await axios.get(`https://api.unsplash.com/photos?page=1&per_page=20&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`).then(res => {
        return res.data
    }).catch(err => {
        if(err instanceof Error) {
            console.log(err.message)
        }
    })


    return response

})

export const imagesSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
        searchImage: (state, action: PayloadAction<photosModel[]>) => {

            state.allPhotos = action.payload
        
        },

        likePhoto: (state, action: PayloadAction<string>) => {
            const thePhoto = state.allPhotos.find(photo => photo.id === action.payload)
            const index = state.allPhotos.findIndex(photo => photo.id === action.payload)

            if(state.allPhotos[index].liked_by_user) {

                state.allPhotos[index].likes = state.allPhotos[index].likes - 1
                state.allPhotos[index].liked_by_user = false

                state.likedPhotos = state.likedPhotos.filter(photo => photo.id !== action.payload)

            } else {

                state.allPhotos[index].likes = state.allPhotos[index].likes + 1
                state.allPhotos[index].liked_by_user = true
                
                if(thePhoto) {
                    state.likedPhotos = state.likedPhotos.concat(thePhoto)
                }

            }


        },

        dislikePhoto: (state, action: PayloadAction<string>) => {
            const index = state.allPhotos.findIndex(photo => photo.id === action.payload)
            state.allPhotos[index].likes = state.allPhotos[index].likes - 1
            state.allPhotos[index].liked_by_user = false
            state.likedPhotos = state.likedPhotos.filter(photo => photo.id !== action.payload)
        },

    },
    extraReducers(builder) {
        builder
            .addCase(fetchImages.pending, (state) => {
                state.status = "loading"
                
            })
            .addCase(fetchImages.fulfilled, (state, action) => {
                state.status = "success"

                const loadedImages = action.payload.map(image => ({
                    id: image.id,
                    created_at: image.created_at,
                    width: image.width,
                    height: image.height,
                    blur_hash: image.blur_hash,
                    likes: image.likes,
                    liked_by_user: image.liked_by_user,
                    description: image.description,
                    user: image.user,
                    urls: image.urls,
                    links: {
                        download: image.links.download,
                        download_location: `${image.links.download_location}&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
                    }
                }))

                state.allPhotos = state.allPhotos.concat(loadedImages)
            })
    }
})

export const { searchImage, likePhoto, dislikePhoto } = imagesSlice.actions

export default imagesSlice.reducer