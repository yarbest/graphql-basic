import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
dotenv.config()
import { graphqlHTTP } from 'express-graphql'

import { requestsResolver } from './requestsResolver'
import { schema } from './schemas/userSchema'

const app = express()
app.use(cors())

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema,
  rootValue: requestsResolver,
}))

const PORT = process.env.PORT ?? 5000

app.listen(PORT, () => {
  console.log('Server is running on port 5000')
})
