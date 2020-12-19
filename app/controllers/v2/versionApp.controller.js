const db = require('../../models')
const { v4: uuidv4 } = require('uuid')
const VersionApp = db.versionApp

exports.findOne = (req, res) => {
    VersionApp.findOne({
        attributes: ["uuid", "created_at", "name", "version", "updated_at", "status"],
        where: { uuid: req.params.uuid }
    }).then(data => {
        res.send({
            status: true,
            message: 'The request has succeeded',
            data: {
                version: data,
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

exports.update = (req, res) => {

    const version = VersionApp.findOne({ where: { uuid: req.params.uuid } })

    if (!version) {
        return res.status(404).send({
            status: false,
            message: 'The request has not succeeded',
            data: 'Uuid não existe.',
        })
    }

    VersionApp.update(req.body, {
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

exports.create = (req, res) => {
    //create uuid version 4
    const uuid = uuidv4()

    // datetime
    const timestamp = new Date().getTime()
console.log(timestamp)
    // variables params
    var params = {
        uuid: uuid,
        created_at: timestamp,
        name: req.body.name,
        version: req.body.version,
        status: 1,
    }

    VersionApp.create(params)
        .then((data) => {

            data = {
                uuid: data.uuid,
                created_at: data.created_at,
                name: data.name,
                version: data.version,
                status: data.status
            }

            //return json
            return res.status(200).send({
                status: true,
                message: 'The request has succeeded',
                data: {
                    version: data,
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