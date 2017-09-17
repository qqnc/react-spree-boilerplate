import Resource from "./Resource"
import Address from "./Address"

export default class User extends Resource {
  static relationships = {
    addresses: {
      shipping: Address,
      billing: Address
    }
  }

  constructor(data) {
    super()
    const shipping = data.ship_address
    const billing = data.bill_address
    this.id = data.id
    this.email = data.email
    this.login = data.login
    this.addresses = {
      shipping: (shipping ? new Address(shipping) : undefined),
      billing: (billing ? new Address(billing) : undefined)
    }
  }
}
