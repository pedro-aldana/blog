import {BrowserRouter as Router,Routes,Route, useLocation} from 'react-router-dom'
import Home from '../../containers/pages/Home'
import Error404 from '../../containers/errors/Error404'
import Dashboard from '../../containers/pages/Dashboard'
import ResetPassword from '../../containers/pages/auth/ResetPassword'
import ResetPasswordConfirm from '../../containers/pages/auth/ResetPasswordConfirm'
import Blog from '../../containers/pages/blog/Blog'
import EditPost from '../../containers/pages/blog/EditPost'


// import { AnimatePresence } from 'framer-motion'

function AnimatedRoutes() {
  const location = useLocation()
  return (

    // <AnimatePresence>
    
        <Routes location={location} key={location.pathname}>
                {/* Pagina de Error */}
                <Route path='*' element={<Error404/>}/> 

                {/* Pagina Home */}
                <Route path='/' element={<Home/>}/>
                <Route path="/forgot_password" element={<ResetPassword />} />
                <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
                <Route path='/blog' element={<Blog/>}/> 
                <Route path='/blog/:slug' element={<EditPost/>}/> 
                <Route path='/Dashboard' element={<Dashboard/>}/>
                
        </Routes>

    // </AnimatePresence> 
  )
}

export default AnimatedRoutes
