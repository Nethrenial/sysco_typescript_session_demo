import { v4 } from 'uuid'
import { Service } from "../core/index.js";


class UsersService extends Service {

    createUser(user) {

        try {
            const existinEmail = this.db.prepare("SELECT * FROM users WHERE email = ?").get(user.email)
            if (existinEmail) {
                throw new Error("User with this email already exists")
            }
            const createUserResult = this.db.prepare("INSERT INTO users (first_name,last_name,email,address) VALUES (?, ?, ?, ?)").run(user.first_name, user.last_name, user.email, user.address)
            const lastInsertId = createUserResult.lastInsertRowid
            const createdUser = this.db.prepare("SELECT * FROM users WHERE id = ?").get(lastInsertId)
            return createdUser
        } catch (error) {
            this.logger.error("Error in UsersService.createUser", error)
        }
    }

    updateUser(userId, user) {
        try {
            const existingUser = this.db.prepare("SELECT * FROM users WHERE id = ?").get(userId)
            if (!existingUser) {
                throw new Error("User not found")
            }
            console.log("user", existingUser)
            this.db.prepare("UPDATE users SET first_name = ?, last_name = ?, email = ?, address = ? WHERE id = ?").run(
                user.first_name ?? existingUser.first_name, 
                user.last_name ?? existingUser.last_name, 
                user.email ?? existingUser.email, 
                user.address?? existingUser.address,
                userId
            )
            const updatedUser = this.db.prepare("SELECT * FROM users WHERE id = ?").get(userId)
            return updatedUser
        } catch (error) {
            this.logger.error("Error in UsersService.updateUser", error)
        }
    }

    getAllUsers() {
        try {
            const users = this.db.prepare("SELECT * FROM users").all()
            return users
        } catch (error) {
            this.logger.error("Error in UsersService.getAllUsers", error)
        }
    }
}

export const usersService = new UsersService()