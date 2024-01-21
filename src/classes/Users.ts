import { type ApiUser } from 'funi-types'
import { User } from './User.ts'
import { Cache } from './Cache.ts'

export class Users extends Cache<User['id'], User> {
    /**
     * fetch a user from the api
     * @param {number} id
     * @param {boolean} [force]
     * @returns {Promise<User>}
     */
    async fetch (id: number, force?: boolean): Promise<User> {
        let user: User | undefined = this.get(id)
        if (!user || force) {
            const data = await fetch(`${this.client.apiBase}/api/users/${id}`)
                .then(async (r) => await (r.json() as Promise<ApiUser>))
            user = new User(this.client, data)
            this.set(user.id, user)
        }
        return user
    }
}
