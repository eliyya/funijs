import { type Client } from './Client.ts'

export class Cache<T, V> extends Map<T, V> {
    readonly #client: Client

    constructor (client: Client) {
        super()
        this.#client = client
    }

    get client (): Client {
        return this.#client
    }
}
