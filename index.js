const express = require('express')
const cors = require('cors')

const app = express()
const {initializeDatabase} = require('./db/db.connection')
const {CCode} = require('./models/cCode.module')


app.use(cors())
app.use(express.json())

initializeDatabase()

app.get('/', (req, res) => {
    res.send("Hello from 1801ME59")
})

// GET ALL API
app.get('/codes', async(req, res) => {
    try{
        const allCodes = await CCode.find()
        res.json(allCodes)
    }
    catch(error) {
        res.status(500).json({message: "Internal Server Error"})
    }
})

app.get('/codes/:id', async(req, res) => {
    const codeId = req.params.id
    try{
        const code = await CCode.find({ srNo: codeId })
        res.json(code)
    }
    catch(error) {
        res.status(500).json({message: "Internal Server Error"})
    }
})


app.post('/codes', async(req,res) => {
    const { srNo, code } = req.body;
    try{
        const newCode = new CCode({ srNo, code })
        await newCode.save()
        res.status(201).json(newCode)
    }
    catch(error){
        res.status(500).json({message: "Internal Server Error"})
    }
})

app.put('/codes/:id', async(req, res) => {
    const codeId = req.params.id 
    const codeToUpdate = req.body 
    try{
        const updatedCode = await CCode.findByIdAndUpdate(codeId, codeToUpdate, {new: true})
        if(!updatedCode) {
            res.status(404).json({message: "Code not found"})
        }
        res.status(200).json(updatedCode)
    } 
    catch(error) {
        res.status(500).json({message: "Internal Server Error"})
    }
})

app.delete('/codes/:id', async(req, res) => {
    const codeId = req.params.id 
    try{
        const deletedCode = await CCode.findByIdAndDelete(codeId)
        if(!deletedCode) {
            res.status(404).json({error: "Code not found"})
        }
        res.status(200).json({message: "Code deleted successfully", code: deletedCode})
    }
    catch(error) {
        console.error(error)
        res.status(500).json({message: "Internal Server Error"})
    }
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})