const { Message, User, Room } = require("../models");

class roomController {
    static async readRoom(req, res, next) {
        try {
            const room = await Room.findAll()
            res.status(200).json(room)
        } catch (error) {
            console.log(error);

        }
    }

    static async readRoomDetail(req, res, next) {
        const { id } = req.params
        try {
            const room = await Room.findByPk(id)
            res.status(200).json(room)
        } catch (error) {
            console.log(error);

        }
    }

    static async addRoom(req, res, next) {
        const { name, imageUrl } = req.body
        try {
            const room = await Room.create({ name, imageUrl })

            res.status(201).json(room)
        } catch (error) {
            console.log(error);

        }
    }
}
module.exports = roomController