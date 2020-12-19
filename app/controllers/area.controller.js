const db = require('../models')
const { v4: uuidv4 } = require('uuid')
const Area = db.area

exports.findAll = (req, res) => {
    Area.findAll()
        .then((data) => {
            res.send({
                status: true,
                message: 'The request has succeeded',
                data: {
                    area: data,
                },
            }).status(200)
        })
        .catch((err) => {
            res.send({
                status: false,
                message: 'The request has not succeeded',
                data: null,
            }).status(500)
        })
}

exports.findOne = (req, res) => {
    Area.findOne({
        where: { uuid: req.params.uuid }
    }).then(data => {
        res.send({
            status: true,
            message: 'The request has succeeded',
            data: {
                area: data,
            },
        }).status(200)
    }).catch(err => {
        res.send({
            status: false,
            message: 'The request has not succeeded',
            data: null,
        }).status(500)
    });

}

exports.create = (req, res) => {
    //create uuid version 4
    const uuid = uuidv4()

    // datetime
    const timestamp = new Date().getTime()

    // variables params
    var params = {
        uuid: uuid,
        created_at: timestamp,
        created_id: req.userId,
        name: req.body.name,
        status: 1,
    }

    Area.create(params)
        .then((data) => {

            data = {
                uuid: data.uuid,
                created_at: data.created_at,
                name: data.name,
                status: data.status
            }

            //return json
            return res.status(200).send({
                status: true,
                message: 'The request has succeeded',
                data: {
                    area: data,
                },
            })
        })
        .catch((err) => {
            //return json
            res.status(500).send({
                status: false,
                message: 'The request has not succeeded',
                message_error: err.message || 'Some error occurred while creating data',
                data: null,
            })
        })
}

exports.update = (req, res) => {

    const area = Area.findOne({ where: { uuid: req.params.uuid } })

    if (!area) {
        return res.status(404).send({
            status: false,
            message: 'The request has not succeeded',
            data: 'Uuid não existe.',
        })
    }

    Area.update(req.body, {
        where: { uuid: req.params.uuid },
    })
        .then(() => {
            return res.status(200).send({
                status: true,
                message: 'Os dados foram atualizados com sucesso.',
            })
        })
        .catch((err) => {
            return res.status(500).send({
                status: false,
                message: 'The request has not succeeded',
                data: err,
            })
        })
}

exports.delete = (req, res) => {
    const uuid = req.params.uuid

    const uuidExists = Area.findOne({ where: { uuid: uuid } })

    if (!uuidExists) {
        return res.status(500).send({
            status: false,
            message: 'The request has not succeeded',
            message_error: 'Não existe esse uuid.',
        })
    }

    Area.destroy({
        where: {
            uuid: uuid
        }
    }).then(data => {
        return res.status(200).send({
            status: false,
            message: 'Registro excluído com sucesso.',
        })
    }).catch(err => {
        return res.status(500).send({
            status: false,
            message: 'The request has not succeeded',
            message_error: err
        })
    })
}
