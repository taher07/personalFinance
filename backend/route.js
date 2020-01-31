const express = require('express')
const router = express.Router()
const entry = require('./model')
const cors = require('cors')

var whitelist = ['http://localhost:3000', 'http://localhost:3001']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

router.get('/',(req,res) => {
    entry.find().then(data => res.json(data)).catch(err => res.status(400).json({message: err}))
})

router.post('/add',(req,res) => {
    const newEntry = {
        nature: req.body.nature,
        amount: req.body.amount,
        narration:  req.body.narration
    }
    const addEntry = new entry(newEntry)
    addEntry.save().then(() => res.json('Record added successfully')).catch(err => res.status(400).json({message: err}))
})

router.get('/info',(req,res) => {
    let capAmt = 0
    let expAmt = 0
    entry.find().then(data => {
        data.forEach(item => {
            if(item.nature === 'Capital')
                capAmt += item.amount
            else
                expAmt += item.amount
        })
        res.json({
            "totalCap": capAmt,
            "totalExp": expAmt,
            "netEff": capAmt - expAmt
        })
    }).catch(err => res.status(400).json({message: err}))}) 

router.get('/info/year/:year',cors(corsOptions),(req,res) => {
    entry.find().then(data => {
            data.forEach(item => {
                if (item.date.split(' ')[3] === req.params.year)
                    res.json(item)
            })
    }).catch(err => res.status(400).json({message: err}))
})

router.get('/info/month/:month',(req,res) => {
    entry.find().then(data => {
            let intermediate = []
            data.forEach(item => {
                if (item.date.split(' ')[1] === req.params.month)
                    intermediate.push(item)
            })
            res.json(intermediate)
    }).catch(err => res.status(400).json({message: err}))
})

router.get('/analyze',(req,res) => {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    months.forEach(item => {
        entry.find({date: {$regex: item + '+'}}).then(data => {
            res.json({
                month: item,
                data: data
            })
        }).catch(err => res.status(400).json({message: err}))
    })
})

router.post('/send',(req,res) => {
    const nodeMailer = require('nodemailer')
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    })
    const mailOptions = {
        from: 'Taher Lunavadi',
        to: 'taherlunawadi@gmail.com',
        subject: req.body.subject,
        html: req.body.template
    }
    transporter.sendMail(mailOptions).then(() => console.log('mail sent successfully')).catch(err => console.log(err))
})

module.exports = router