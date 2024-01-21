import { type ApiGroup, type ApiUser, type unixtime } from 'funi-types'
import { type Client } from './Client.ts'

export class Group {
    readonly #client: Client
    readonly #id: number
    #created_at: unixtime
    #name: string
    #owner_id: ApiUser['id']
    #member_ids: Array<ApiUser['id']>
    #description: string | null

    constructor (client: Client, data: ApiGroup) {
        this.#client = client
        this.#id = data.id
        this.#created_at = data.created_at
        this.#name = data.name
        this.#owner_id = data.owner_id
        this.#member_ids = data.member_ids
        this.#description = data.description ?? null
    }

    get client (): Client {
        return this.#client
    }

    get id (): number {
        return this.#id
    }

    get createdAt (): unixtime {
        return this.#created_at
    }

    get name (): string {
        return this.#name
    }

    get ownerId (): ApiUser['id'] {
        return this.#owner_id
    }

    get memberIds (): Array<ApiUser['id']> {
        return this.#member_ids
    }

    get description (): string | null {
        return this.#description
    }

    async fetch (): Promise<this> {
        const data = await fetch(this.#client.apiBase + '/api/groups/' + this.#id)
        const json = await data.json() as ApiGroup
        this.#created_at = json.created_at
        this.#name = json.name
        this.#owner_id = json.owner_id
        this.#member_ids = json.member_ids
        this.#description = json.description ?? null
        return this
    }

    toJSON (): ApiGroup {
        return {
            id: this.#id,
            created_at: this.#created_at,
            name: this.#name,
            owner_id: this.#owner_id,
            member_ids: this.#member_ids,
            description: this.#description
        }
    }
}
