import { Router } from 'express'
import { CreateProductController } from './useCases/Product/CreateProduct/CreateProductController'
import { ListProductController } from './useCases/Product/ListProduct/ListProductController'
import { CreateSellerController } from './useCases/Seller/CreateSeller/CreateSellerController'

const router = Router()

const createProductController = new CreateProductController()
const listProductController = new ListProductController()

const createSellerController = new CreateSellerController()

// seller
router.post('/new-seller', createSellerController.handle)
router.get('/products/:sellerId', listProductController.handle)

// product
router.post('/new-product/:sellerId', createProductController.handle)

router.get('/teste', (req: any, res: any) => {
  return res.json({ message: 'A api está rodandno e funcionando normalmente' })
})

export { router }
