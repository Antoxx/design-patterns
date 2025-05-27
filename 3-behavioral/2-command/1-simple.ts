interface Command {
    name: string
    execute(): void
}

class LogCommand implements Command {
    name = 'Log'

    constructor (private payload: string) {}

    execute () {
        console.log(`> ${this.payload}`)
    }
}

class AccountUpdaterCommand implements Command {
    name = 'AccountUpdater'

    constructor (private receiver: Receiver, private amount: number) {}

    execute () {
        this.receiver.account += this.amount
    }
}

class Receiver {
    name: string
    account: number

    constructor (name: string, account: number) {
        this.name = name
        this.account = account
    }
}

class Invoker {
    private startCommand: Command
    private finishCommand: Command
    private mainCommands: Command[]

    onStart (command: Command) {
        this.startCommand = command
    }
    onFinish (command: Command) {
        this.finishCommand = command
    }
    setOperations (commands: Command[]) {
        this.mainCommands = commands
    }

    operate () {
        if (this.startCommand) {
            this.startCommand.execute()
        }

        if (Array.isArray(this.mainCommands)) {
            this.mainCommands.map(c => c.execute())
        }

        if (this.finishCommand) {
            this.finishCommand.execute()
        }
    }
}

// Usage (Client code)
const receiver = new Receiver('User 123', 1000)

const invoker = new Invoker()
invoker.onStart(new LogCommand('start'))
invoker.setOperations([
    new AccountUpdaterCommand(receiver, -100),
    new AccountUpdaterCommand(receiver, -300),
    new AccountUpdaterCommand(receiver, 50),
])
invoker.onFinish(new LogCommand('finish'))
invoker.operate()

console.assert(receiver.account === 650, `Receiver account != 650`, receiver.account)