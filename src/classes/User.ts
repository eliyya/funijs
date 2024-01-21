import { type Client } from './Client.ts'
import { type ApiUser } from 'funi-types'

export class User {
    readonly #client: Client
    readonly #id: number
    #username: string
    #displayname: string | null = null
    #avatar: string | null = null

    constructor (client: Client, data: ApiUser) {
        this.#client = client
        this.#id = data.id
        this.#username = data.username
        this.#displayname = data.displayname ?? null
        if (data.avatar) {
            this.#avatar = `${this.#client.apiBase}/imgs/avatar/${data.avatar}`
        }
    }

    get client (): Client {
        return this.#client
    }

    get id (): number {
        return this.#id
    }

    get username (): string {
        return this.#username
    }

    get displayName (): string | null {
        return this.#displayname
    }

    get avatar (): string | null {
        return this.#avatar
    }

    async fetch (): Promise<this> {
        const data = await fetch(this.#client.apiBase + '/api/users/' + this.#id)
        const json = await data.json() as ApiUser
        this.#username = json.username
        this.#displayname = json.displayname ?? null
        if (json.avatar) {
            this.#avatar = `${this.#client.apiBase}/imgs/avatar/${json.avatar}`
        }
        return this
    }

    toJSON (): ApiUser {
        return {
            id: this.#id,
            username: this.#username,
            displayname: this.#displayname,
            avatar: this.#avatar
        }
    }
}
