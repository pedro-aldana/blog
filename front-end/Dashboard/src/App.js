import {BrowserRouter as Router,Routes,Route, useLocation} from 'react-router-dom'
import store from './store'
import {Helmet,HelmetProvider} from 'react-helmet-async'
import {Provider} from 'react-redux'
import Rutas from './hocs/routes/Rutas'



function App() {
  return (
    <HelmetProvider>
    <Helmet>
      <title>MDT | Dashboard</title>
      <meta name='description' content='agencia de software y marketing digital crea una pagina wed' />
      <link rel='canonical' href='https://www.mdtagency.com' />
      <meta name="robots" content='all' />
      <link rel="canonical" href="https://www.mdtagency.com/" />
      <meta name="author" content='Mdtagency' />
      <meta name="publisher" content='Mdtagency' />

       {/* Social Media Tags */}
       <meta property="og:title" content='MDT | Software Agency' />
        <meta property="og:description" content='Agencia de software y marketing digital. Servicios de creacion de pagina web y desarrollo de aplicaciones.' />
        <meta property="og:url" content="https://www.murkiva.com/" />
        <meta property="og:image" content='https://bafybeicwrhxloesdlojn3bxyjqnxgsagtd4sl53a7t4cn4vfe2abmybzua.ipfs.w3s.link/lightbnuilbg.jpg' />

        <meta name="twitter:title" content='MDT | Software Agency' />
        <meta
            name="twitter:description"
            content='Agencia de software y marketing digital. Servicios de creacion de pagina web y desarrollo de aplicaciones.'
        />
        <meta name="twitter:image" content='https://bafybeicwrhxloesdlojn3bxyjqnxgsagtd4sl53a7t4cn4vfe2abmybzua.ipfs.w3s.link/lightbnuilbg.jpg' />
        <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
    <Provider store={store}>
      <Router>
        
        <Rutas/>
      </Router>
    </Provider>
   </HelmetProvider>  
  );
}

export default App;
