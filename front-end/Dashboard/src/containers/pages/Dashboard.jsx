
import { connect } from "react-redux";
import Layout from "../../hocs/layouts/Layout";

function Dashboard() {
  return (
    <Layout>
      Dashboard
    </Layout>
  )
}

const mapStateToProps = state =>({

})

export default connect(mapStateToProps,{

})(Dashboard)

