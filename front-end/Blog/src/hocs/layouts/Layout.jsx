import { connect } from "react-redux";
import {motion} from 'framer-motion'

function Layout({children}) {
    return(
        <motion.div
            initial={{opacity: 0, transition: {duration:0.5}}}
            animate={{opacity: 1, transition: {duration:0.5}}}
            exit={{opacity: 0, transition: {duration:0.5}}}
        >
            {children}
        </motion.div>
    )
}

const mapStateToProp = state =>({

})

// para exportar las variables de estado con redux
export default connect(mapStateToProp,{

}) (Layout)