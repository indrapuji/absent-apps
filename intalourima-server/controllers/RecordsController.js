const {User, Record} = require('../models')
const createErrors = require('http-errors')
const serverUrl = require('../helpers/serverUrl')
const changeRespon = require('../helpers/changeRespon')

class RecordsController {
  static checkInRecord = async (req, res, next) => {
    try {
      console.log(req.body)
      console.log('ooooo')
      const {id} = req.UserData
      const {event, long, lat, tanggal, masuk} = req.body
      if (!event || !long || !lat || !tanggal || !masuk) {
        throw createErrors(400, 'Input all require field')
      }
      const userData = User.findOne({where: {id}})
      if (!userData) throw createErrors(401, 'User not found!')
      let image_url = null
      if (req.file) image_url = serverUrl + req.file.path
      console.log('=-=-', req.file)
      const data = await Record.create({
        user_id: id,
        event,
        long,
        lat,
        loc: 'none',
        tanggal,
        masuk,
        image_url
      })
      res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }

  static checkOutRecord = async (req, res, next) => {
    try {
      const {recordId, keluar} = req.body
      console.log(recordId)
      await Record.update({keluar}, {where: {id: recordId}})
      res.status(200).json({msg: 'Data Updated'})
      console.log(recordId, keluar)
    } catch (error) {
      next(error)
    }
  }

  static getRecordbyId = async (req, res, next) => {
    try {
      const {id} = req.params
      const recordData = await Record.findOne({where: {id}, include: [{model: User}]})
      if (!recordData) {
        throw createErrors(404, 'Data not found')
      }
      res.status(200).json(recordData)
    } catch (error) {
      next(error)
    }
  }

  static getAllRecord = async (req, res, next) => {
    try {
      let {user_id} = req.query
      let option = {
        where: {},
        include: [{model: User}],
        order: [['id', 'DESC']]
      }
      if (user_id) {
        option.where.user_id = user_id
      }

      const allRecord = await Record.findAll(option)
      res.status(200).json(
        allRecord.map((item) => {
          return {
            id: item.id,
            nama: item.User.nama,
            role: item.User.role,
            event: item.event,
            masuk: item.masuk,
            keluar: item.keluar,
            long: item.long,
            lat: item.lat,
            loc: item.loc,
            tanggal: item.tanggal
          }
        })
      )
    } catch (error) {
      next(error)
    }
  }

  static getHistory = async (req, res, next) => {
    try {
      const {id} = req.UserData
      let option = {where: {user_id: id}, order: [['id', 'DESC']]}
      const allRecord = await Record.findAll(option)
      res.status(200).json(changeRespon(allRecord))
    } catch (error) {
      next(error)
    }
  }

  static getLeaderBoard = async (req, res, next) => {
    try {
      const {tanggal, event} = req.body
      let option = {
        where: {},
        include: [{model: User}],
        order: [['id', 'DESC']]
      }

      if (tanggal) {
        option.where.tanggal = tanggal
      }
      if (event) {
        option.where.event = event
      }
      const allRecord = await Record.findAll(option)
      console.log(allRecord)
      res.status(200).json(allRecord)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = RecordsController
