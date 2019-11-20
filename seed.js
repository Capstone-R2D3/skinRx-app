const Products = require('./server/models/products')
const {db} = require('./server/models/index')
 
const seedAllProducts = [
   { name: 'Testing' },
   { name: 'Name 2' },
]
 
async function seed() {
   try {
       await db.sync({force: true})
       await Products.bulkCreate(seedAllProducts)
       await db.close()
   } catch (error) {
       console.log(error)
   }
}
 
seed()