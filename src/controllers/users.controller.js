import { Router } from 'express'
import {usersService} from '../services/index.js'

const usersController = Router({ mergeParams: true })

usersController.get("/", (req, res) => {
    const users = usersService.getAllUsers()
    return res.json(users)
})

usersController.post("/", (req, res) => {
    const user = req.body
    const newUser = usersService.createUser(user)
    return res.json(newUser)
})


usersController.put("/:id", (req, res) => {
    const user = req.body
    const userId = req.params.id
    const updatedUser = usersService.updateUser(userId, user)
    return res.json(updatedUser)
})



export { usersController }