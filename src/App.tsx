import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import Homepage, { HomeLayout } from './app/components/Homepage'
import LikedPhotos from './app/components/LikedPhotos'
import { AnimatePresence } from 'framer-motion'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<HomeLayout />}>
        <Route index element={<Homepage />} />
        <Route path='/liked-photos' element={<LikedPhotos />} />
      </Route>
    )
  )

  return (
    <div className="App">
      <AnimatePresence>
        <RouterProvider router={router} />
      </AnimatePresence>
    </div>
  )
}



export default App
