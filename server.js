import express from 'express'
import mongoose from 'mongoose'
import Cards from './dbCards.js'
import Cors from 'cors'

//App config
const app = express()
const port =process.env.port || 8001;
const connection_url = `mongodb+srv://admin:A76FebvVpxxSB6DY@cluster0.w51mg.mongodb.net/tinderdb?retryWrites=true&w=majority`
// const connection_url = `mongodb+srv://admin:dVdYw1oJeWwF2dRI@cluster0.hft9m.mongodb.net/tinderdb?retryWrites=true&w=majority`

// Middleware

app.use(express.json())
app.use(Cors())
// DB configs
// mongoose.connect(connection_url, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
// })
mongoose.connect(connection_url)

// API Endpoints
app.get('/',(req,res) => res.status(200).send('Hello!!'));
app.post('/tinder/cards',(req,res)=>{
    const dbCard = req.body;
    Cards.create(dbCard, (err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})
app.get('/tinder/cards', (req,res)=>{
    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })

})


// Listener
app.listen(port,() => console.log(`listening on localhost:  ${port}`));
