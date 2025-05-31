type Item = object
enum Renderer {
    Console,
    HTML,
    Markdown,
}

const RENDERERS = {
    [Renderer.Console]: (items: Item[]) => {
        console.table(items)
    },
    [Renderer.HTML]: (items: Item[]) => {
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
    },
    [Renderer.Markdown]: (items: Item[]) => {
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
    },
}

// Usage

const persons = [
  { name: 'Anton', city: 'Rostov-on-Don' },
  { name: 'Sergei', city: 'Saint Petersburg' },
  { name: 'Ivan', city: 'Lipetsk' },
]

console.group('Console Renderer:')
RENDERERS[Renderer.Console](persons)
console.groupEnd()

console.group('\nHTML Renderer:')
RENDERERS[Renderer.HTML](persons)
console.groupEnd()

console.group('\Markdown Renderer:')
RENDERERS[Renderer.Markdown](persons)
console.groupEnd()
