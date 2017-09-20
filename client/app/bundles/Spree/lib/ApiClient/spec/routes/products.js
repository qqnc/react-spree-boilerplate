/* eslint-env mocha */
import { Product } from "../../resources"
import Collection from "../../resources/Collection"
import * as mock from "../mock"

const products = Array.from(Array(10), (_, i) => mock.product(i + 1))

describe("/products", () => {
  const reply = {
    products,
    ...mock.pagination({ page: 1, totalCount: products.length })
  }

  it("returns a collection of products", async function () {
    this.scope
      .get("/products")
      .query(true)
      .reply(200, reply)

    const collection = await this.client.route("/products")
    collection.should.be.instanceof(Collection)
    collection.Entity.should.equal(Product)
  })

  it("accepts a search parameter", async function () {
    this.scope
    .get("/products")
    .query({ q: { name: "test" } })
    .reply(200, reply)

    const collection = await this.client.route("/products", {
      search: {
        name: "test"
      }
    })
    collection.should.be.instanceof(Collection)
    collection.Entity.should.equal(Product)
  })

  it("accepts pagination parameters", async function () {
    this.scope
    .get("/products")
    .query({ page: 2, per_page: 15 })
    .reply(200, reply)

    const collection = await this.client.route("/products", { page: 2, perPage: 15 })
    collection.should.be.instanceof(Collection)
    collection.Entity.should.equal(Product)
  })
})

describe("/products/:id", () => {
  beforeEach(function () {
    this.scope
      .get("/products/1")
      .reply(200, products[0])
  })

  it("returns a product by id", function () {
    return this.client.route("/products/1").should.eventually.be.instanceof(Product)
  })
})
