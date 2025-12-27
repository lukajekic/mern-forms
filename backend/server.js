const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')

const connectDB = require('./utils/db')
const app = express()
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
	origin: process.env.FRONTEND_URL,
	credentials: true
}))
const userroutes = require('./routes/UserRoutes')
app.use('/api/user', userroutes)
const formsroutes = require('./routes/FormsRoutes')
app.use('/api/form', formsroutes)
const responsesroutes = require('./routes/ResponsesRoutes')
app.use('/api/response', responsesroutes)
const analyticsrouter = require('./routes/AnalyticsRoutes')
app.use('/api/analytics', analyticsrouter)




connectDB()
	.then(() => {
		const port = process.env.PORT || 3000
		app.listen(port)
	})
	.catch((err) => {
        console.log("MONGODB CONECTION FAILED")
		console.log(err)

	})
