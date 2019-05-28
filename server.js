let server

let express    	= require("express")
let morgan     	= require("morgan")

let app         = express()
let bodyParser  = require("body-parser")
let mongoose    = require("mongoose")

let users              = require('./routes/users')

const port = 3001
const portdb = "localhost:27017"
const name = "KytCat"

mongoose.connect("mongodb://" + portdb + "/" + name, { useNewUrlParser: true })
.then(() => {
	console.log('connected to mongodb')
})

server = app.listen(port, () => {console.log( "Express server listening on port " + port)})


app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(morgan("tiny"))


app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization')
	next()
})

app.use('/users',  users)


process.on('uncaughtException', err => {
	console.log(err)
})

app.get('/', (req, res) => {
    res.json("Karim valide mon KytCat stp")
})

function stop() {
    server.close()
}

module.exports = app
module.exports.stop = stop
