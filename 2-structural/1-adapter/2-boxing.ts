import assert from 'assert'

interface Universal {
    universalMethod: () => unknown
}

class Specific {
    method () {
        return '123'
    }
}

class SpecificAdapter implements Universal {
    private specific: Specific

    constructor (specific: Specific) {
        this.specific = specific
    }

    universalMethod () {
        return this.specific.method()
    }
}

const specific = new Specific()
const adapter = new SpecificAdapter(specific)

assert.equal(adapter.universalMethod(), '123')

