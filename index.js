require('dotenv').config()
const app = require('./src/app')
const port = process.env.PORT ?? 5500 
const wweb = require('./src/wweb')

try {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
        wweb.start()
    })
} catch (err) {
    throw new Error("An error ocurred trying to start server.", err)
}
