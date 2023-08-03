import {BrowserRouter as Router,Routes,Route, useLocation} from 'react-router-dom'



import { AnimatePresence } from 'framer-motion'
import Home from '../../containers/pages/Home';
import Error404 from '../../containers/errors/Error404';
import Blog from '../../containers/pages/Blog';
import PostDetail from '../../containers/pages/PostDetail';
import Category from '../../containers/pages/Category';
import Search from '../../containers/pages/Search';
import Register from '../../containers/pages/Register';

function AnimatedRoutes() {
  const location = useLocation()
  return (

    <AnimatePresence>
    
        <Routes location={location} key={location.pathname}>
                {/* Pagina de Error */}
                <Route path='*' element={<Error404/>}/> 

                {/* Pagina Home */}
                <Route path='/' element={<Home/>}/>
                <Route path='/blog' element={<Blog/>}/>
                <Route path="/blog/:slug" element={<PostDetail />} />
                <Route path="/category/:slug" element={<Category/>} />
                <Route path="/s=:term" element={<Search />} />
                <Route path="/registro" element={<Register />} />
               
        </Routes>

    </AnimatePresence> 
  )
}

export default AnimatedRoutes
