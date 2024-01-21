import { type ApiUser } from 'funi-types'
import { User } from './User.ts'
import { Users } from './Users.ts'

export class Client {
    readonly #token: string
    readonly #apiBase = 'https://backend-universe.deno.dev'
    readonly #user: User
    readonly #users = new Users(this)

    constructor (options: {
        token: string
        user: ApiUser
    }) {
        this.#token = options.token
        this.#user = new User(this, options.user)
        this.#users.set(this.#user.id, this.#user)
    }

    get user (): User {
        return this.#user
    }

    get token (): string {
        return this.#token
    }

    get apiBase (): string {
        return this.#apiBase
    }

    get users (): Users {
        return this.#users
    }

    static async login (
        { token, email, password }: {
            token?: string
            email: string
            password: string
        } | {
            token: string
            email?: string
            password?: string
        }
    ): Promise<Client> {
        if (!token) {
            const data = await fetch(
                'https://backend-universe.deno.dev/auth/authorize',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            )
                .then(async (r) => await (r.json() as Promise<{ token: string }>))
            token = data.token
        }
        const user = await fetch(
            'https://backend-universe.deno.dev/api/users/@me',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then(async (r) => await (r.json() as Promise<ApiUser>))
        return new Client({
            token,
            user
        })
    }
}
