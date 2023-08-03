import Header from "../../components/Home/Header"
import Navbar from "../../components/navigate/Navbar"
import Layout from "../../hocs/layouts/Layout"




function Home() {
  return (
    <Layout>
      <Navbar/>
      <div className="pt-28">
        <Header/>
      </div>
    </Layout>
  )
}

export default Home
