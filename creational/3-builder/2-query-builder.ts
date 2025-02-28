import assert from 'assert'

// Builder

class QueryBuilder {
    table: string

    opts: Partial<{
        select: string
        where: Record<string, any>
        limit: number
    }> = {}

    constructor (table: string) {
        this.table = table
    }

    select (select: string) {
        this.opts.select = select
        return this
    }

    where (where: Record<string, any>) {
        if (!this.opts.where) {
            this.opts.where = {}
        }

        Object.assign(this.opts.where, where)
        return this
    }

    limit (limit: number) {
        this.opts.limit = limit
        return this
    }

    execute () {
        const { select, where, limit } = this.opts
        let query = `SELECT ${select || '*'} FROM ${this.table}`

        const whereParts: string[] = []
        Object.entries(where || {}).forEach(([col, val]) => {
            whereParts.push(`${col} = '${val}'`)
        })

        if (whereParts.length > 0) {
            query += ` WHERE ${whereParts.join(' AND ')}`
        }

        if (limit && limit > 0) {
            query += ` LIMIT ${limit}`
        }

        return query
    }
}

// Testing

const queryBuilder1 = new QueryBuilder('users')
assert.equal(queryBuilder1.execute(), `SELECT * FROM users`)

const queryBuilder2 = new QueryBuilder('goods')
queryBuilder2.where({ name: 'Super product' }).limit(1)
assert.equal(queryBuilder2.execute(), `SELECT * FROM goods WHERE name = 'Super product' LIMIT 1`)

const queryBuilder3 = new QueryBuilder('items')
queryBuilder3.where({ code: 123, name: 'My item' }).where({ id: 1 }).limit(1)
assert.equal(queryBuilder3.execute(), `SELECT * FROM items WHERE code = '123' AND name = 'My item' AND id = '1' LIMIT 1`)

// Service as Director
class UserService {
    table = 'users'

    findSuperAdmin () {
        const qb = new QueryBuilder(this.table)
        return qb.where({ role: 'SUPERADMIN' }).limit(1).execute()
    }
}

const userService = new UserService()
assert.equal(userService.findSuperAdmin(), `SELECT * FROM users WHERE role = 'SUPERADMIN' LIMIT 1`)