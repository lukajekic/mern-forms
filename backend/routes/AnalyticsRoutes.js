const express = require('express')
const { getQuestionAnalytics } = require('../controllers/ResponsesController')
const router = express.Router()

router.get('/question', getQuestionAnalytics)

module.exports = router