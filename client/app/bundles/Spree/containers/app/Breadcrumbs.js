import { connect } from "react-redux"
import { Breadcrumbs } from "../../components/app"
import { getBreadcrumb } from "../../redux/selectors/taxonomies"

const props = (state, { taxonId }) => ({
  taxons: getBreadcrumb(state, { id: taxonId })
})

export default connect(props)(Breadcrumbs)
