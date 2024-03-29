const jsonServer = require('json-server')
const server = jsonServer.create()
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
    res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if (req.method === 'POST') {
        console.log("é post. \nbody:\n")
        console.log(req.body)
        console.log('\n\n\n')
        req.body.createdAt = Date.now()
    }
    if (req.method === 'GET') {
        console.log("é get!!")

    }
    // Continue to JSON Server router
    next()
})

// Use default router
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running by module on port 3000')
})