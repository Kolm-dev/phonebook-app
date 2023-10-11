import express from "express"
import fs from "fs"
import cors from "cors"
import contactRoutes from "./routes/contactRoutes"

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({ origin: "http://localhost:5173" }))
app.use(express.json())

app.use("/contacts", contactRoutes)

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
