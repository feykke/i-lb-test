const { readdir, readFile, writeFile } = require('fs/promises')
const path = require('path')

const solidPath = path.resolve('assets/solid')
const outlinePath = path.resolve('assets/outline')
const twoColorsPath = path.resolve('assets/two-colors')

const clear = (svg) => {
    while (svg.indexOf('\r\n') >= 0 || svg.indexOf('\r') >= 0 || svg.indexOf('\n') >= 0) {
        svg = svg.replace('\r\n', '').replace('\r', '').replace('\n', '')
    }
    return svg
}

async function createSolid () {
    const files = await readdir(solidPath, (err, files) => files)
    const filesPath = files.map(file => {
        return {file, path: `${solidPath}\\${file}`} 
    })
    const svgs = filesPath.map(async filePath => {
        return { 
            name: filePath.file.replace('.svg', ''),
            svg: (await readFile(filePath.path)).toString()
         } 
    })

    Promise.all(svgs).then(result => {
        const obj = result.map(el => {
            return `\t${el.name}: '${clear(el.svg)}',\r\n`
        })
        const fileContent = `export const solidIcons = {\r\n${obj.join('')}}`
        writeFile('icons\\solid.js', fileContent)
    })
}

async function createOutline() {
    const files = await readdir(outlinePath, (err, files) => files)
    const filesPath = files.map(file => {
        return {file, path: `${outlinePath}\\${file}`}
    })
    const svgs = filesPath.map(async filePath => {
        return {
            name: filePath.file.replace('.svg', ''),
            svg: (await readFile(filePath.path)).toString()
        }
    })

    Promise.all(svgs).then(result => {
        const obj = result.map(el => {
            return `\t${el.name}: '${clear(el.svg)}',\r\n`
        })
        const fileContent = `export const outlineIcons = {\r\n${obj.join('')}}`
        writeFile('icons\\outline.js', fileContent)
    })
} 

async function createTwoColors() {
    const files = await readdir(twoColorsPath, (err, files) => files)
    const filesPath = files.map(file => {
        return {file, path: `${twoColorsPath}\\${file}`}
    })
    const svgs = filesPath.map(async filePath => {
        return {
            name: filePath.file.replace('.svg', ''),
            svg: (await readFile(filePath.path)).toString()
        }
    })

    Promise.all(svgs).then(result => {
        const obj = result.map(el => {
            return `\t${el.name}: '${clear(el.svg)}',\r\n`
        })
        const fileContent = `export const twoColorsIcons = {\r\n${obj.join('')}}`
        writeFile('icons\\twoColors.js', fileContent)
    })
}



export {
    createSolid,
    createOutline,
    createTwoColors
}