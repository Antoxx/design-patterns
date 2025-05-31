type Item = object

interface Renderer {
    render(items: Item[]): void
}

class ConsoleRenderer implements Renderer {
    render(items: Item[]) {
        console.table(items)
    }
}

class HtmlRenderer implements Renderer {
    render(items: Item[]) {
        const keys = Object.keys(items[0])
        const renderLine = (item: Item) => '<tr>' + keys.map((key: keyof Item) => `<td>${item[key]}</td>`).join('') + '</tr>'
        const output = [
            '<table>',
            '<tr>',
            keys.map((key) => `<th>${key}</th>`).join(''),
            '</tr>',
            items.map(renderLine).join(''),
            '</table>',
        ]

        console.log(output.join(''))
    }
}

class MarkdownRenderer implements Renderer {
    render(items: object[]) {
        const keys = Object.keys(items[0])
        const renderLine = (item: Item) => '|' + keys.map((key: keyof Item) => `${item[key]}`).join('|') + '|\n'
        const output = [
            '|',
            keys.map((key) => `${key}`).join('|'),
            '|\n',
            '|',
            keys.map(() => '---').join('|'),
            '|\n',
            items.map(renderLine).join(''),
        ]

        console.log(output.join(''))
    }
}

class Context {
    constructor (private renderer: Renderer) {}

    setRenderer (renderer: Renderer) {
        this.renderer = renderer
        return this
    }

    process (items: object[]) {
        return this.renderer.render(items)
    }
}

// Usage

const persons = [
  { name: 'Anton', city: 'Rostov-on-Don' },
  { name: 'Sergei', city: 'Saint Petersburg' },
  { name: 'Ivan', city: 'Lipetsk' },
]

const context = new Context(new ConsoleRenderer())

console.group('Console Renderer:')
context.process(persons)
console.groupEnd()

console.group('\nHTML Renderer:')
context.setRenderer(new HtmlRenderer())
context.process(persons)
console.groupEnd()

console.group('\Markdown Renderer:')
context.setRenderer(new MarkdownRenderer())
context.process(persons)
console.groupEnd()
