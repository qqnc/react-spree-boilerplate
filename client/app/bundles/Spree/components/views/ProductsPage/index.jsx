import React from "react"
import PropTypes from "prop-types"
import { Row, Col } from "react-bootstrap"
import { Card } from "../../product"
import { Loader } from "../../shared"

const ProductsPage = ({ children }) => (
  <div>
    {children}
  </div>
)

ProductsPage.Title = () => (<h2>Products</h2>)

ProductsPage.Content = ({ loading, products }) => (
  <Loader loading={loading}>
    <Row>
      {products && products.map(p => (
        <Col xs={12} sm={6} md={3} key={p.id}>
          <Card product={p} />
        </Col>
      ))}
    </Row>
  </Loader>
)

ProductsPage.propTypes = {
  children: PropTypes.node
}

ProductsPage.Content.propTypes = {
  loading: PropTypes.bool.isRequired,
  products: PropTypes.arrayOf(PropTypes.object)
}

export default ProductsPage
