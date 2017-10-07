import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Catalog } from "../../product"
import { Page, Pagination, QuickSearch } from "../../page"
import { getPageProducts } from "../../../redux/selectors/page"

const HomePageApp = ({ products }) => (
  <Page>
    <QuickSearch />
    <Page.Content>
      {products && <Catalog products={products} />}
    </Page.Content>
    <Pagination />
  </Page>
)

HomePageApp.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object)
}

const props = state => ({
  products: getPageProducts(state)
})

export default connect(props)(HomePageApp)