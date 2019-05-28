let sha256      = require('sha256')

let Users = require('../models/Users')

let signup = (req, res) => {
    let password = req.body.password
    req.body.password = sha256(password)

    let user = new Users(req.body)

    Users.findOne({email: req.body.email}, (err, rep) => {
        if (!err && rep !== null) {
          res.status(403).json({type: "UserAlreadyExist"})
        } else {
            user.save((err, rep) => {
                if (!err) {
                    res.json(rep)
                } else {
                    res.status(400).json({
                        error: err,
                        type: "DatabaseValidationError"
                    })
                }
            })
        }
    })
}

let signin = (req, res) => {
    Users.findOne({email: req.body.email, password: sha256(req.body.password)}, ['firstName', 'lastName', 'role'], (err, rep) => {
        if (!err && rep !== null) {
          res.json({
            user: rep
          })
        } else {
            res.status(403).json({type: "UserNotFound"})
        }
    })
}

let list = (req, res) => {
	Users.find({}, ['_id', 'firstName', 'lastName'], (err, rep) => {
		if (!err && rep !== null) {
			res.json(rep)
		} else {
			res.status(403).json({type: "UsersNotFound"})
		}
	})
}

let modify = (req, res) => {
    delete req.body.email
    delete req.body.role
    delete req.body._id

    Users.updateOne({_id: req.body.id}, {$set: req.body}, (err, rep) => {
        if (!err && rep !== null) {
            if (rep.ok == rep.n)
                res.json({message: "UserEdited"})
            else
                res.json({message: "UserNotEdited"})
        } else {
            res.status(404).json({type: "NoDataFound", error: err})
        }
    })
}

let getInfo = (req, res) => {
	Users.findOne({_id :req.params.id}, ['email', 'firstName', 'lastName', 'role'], (err, rep) => {
		if (!err && rep !== null) {
			res.json({user: rep})
		}  else {
			res.status(404).json({type: "NoDataFound", error: err})
		}
	})
}

let deleteUser = (req, res) => {
    Users.deleteOne({_id :req.params.id}, (err, rep) => {
		if (!err && rep !== null) {
            if (rep.ok == rep.n)
                res.json({message: "UserDeleted"})
            else
                res.json({message: "UserNotDeleted"})
		}  else {
			res.status(404).json({type: "NoDataFound", error: err})
		}
	})
}

module.exports = {
    signup,
    signin,
    list,
    modify,
    getInfo,
    deleteUser
}
