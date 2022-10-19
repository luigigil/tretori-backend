import { IProduct } from '~/domains/product/product.types'

export const productArrayFixture: IProduct[] = [
  {
    name: 'Product 2',
    plan: 'plan 2',
    size: 'size 2',
    type: 'type 2',
  },
  {
    name: 'Product 3',
    plan: 'plan 3',
    size: 'size 3',
    type: 'type 3',
  },
]

export const oneProductFixture: IProduct = {
  id: 3,
  name: 'Product 1',
  plan: 'plan 1',
  size: 'size 1',
  type: 'type 1',
}
