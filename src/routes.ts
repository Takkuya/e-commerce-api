import { Router } from 'express'
import { ensureSellerAuthentication } from './middleware/ensureSellerAuthentication'
import { CreateProductController } from './useCases/Product/CreateProduct/CreateProductController'
import { ListAllProductsController } from './useCases/Product/ListAllProducts/ListAllProductsController'
import { ListProductController } from './useCases/Product/ListProduct/ListProductController'
import { QueryProductController } from './useCases/Product/QueryProduct/QueryProductController'
import { UpdateProductController } from './useCases/Product/UpdateProduct/UpdateProductController'
import { AuthenticateSellerController } from './useCases/Seller/AuthenticateSeller/AuthenticateSellerController'
import { CreateSellerController } from './useCases/Seller/CreateSeller/CreateSellerController'
import { RefreshTokenSellerController } from './useCases/Seller/RefreshTokenSeller/RefreshTokenSellerController'

const router = Router()

const createSellerController = new CreateSellerController()
const authenticateSellerController = new AuthenticateSellerController()

const createProductController = new CreateProductController()
const listAllProductsController = new ListAllProductsController()
const listProductController = new ListProductController()
const updateProductController = new UpdateProductController()
const queryProductController = new QueryProductController()

const refreshTokenSellerController = new RefreshTokenSellerController()

router.post('/refresh-token', refreshTokenSellerController.handle)

// seller
router.post('/new-seller', createSellerController.handle)
router.post('/login', authenticateSellerController.handle)

// product
router.post(
  '/new-product/:sellerId',
  ensureSellerAuthentication,
  createProductController.handle
)

router.get('/list-all-products', listAllProductsController.handle)

router.get(
  '/list-products/:sellerId',
  ensureSellerAuthentication,
  listProductController.handle
)

router.get('/search-products', queryProductController.handle)

router.put(
  '/update-product/:productId',
  ensureSellerAuthentication,
  updateProductController.handle
)

export { router }
