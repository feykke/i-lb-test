import { twoColorsIcons } from '../icons/twoColors.js'

export default class TwoColorsIconsConfig extends HTMLElement {
    constructor() {
        super()
        this.build()
    }

    build () {
        const shadow = this.attachShadow({mode: 'open'})
        this.createRootElement(shadow)

    }

    createRootElement(shadow) {
        const iconName = this.getAttribute('icon')
        if(iconName) {
            shadow.innerHTML = twoColorsIcons[iconName]
        }

        this.updateIconStyles(shadow)
    }

    updateSize(svg) {
        const size = this.getAttribute('size')
        svg.setAttribute('height', size? size : '24px')
        svg.setAttribute('width', size? size : '24px')
    }

    updateClass(rootElement) {
        const classesNames = this.getAttribute('class')
        const classesList = classesNames.split(' ')
        classesList.forEach(className => {
            rootElement.children[0].classList.add(className)
        })
    }

    updateColorAndBgColor(rootElement) {
        const inColor = this.getAttribute('inColor')
        const outColor = this.getAttribute('outColor')
        const bgColor = this.getAttribute('bgColor')
        rootElement.children[0].setAttribute('style', `background-color: ${bgColor}; fill: ${inColor}; stroke: ${outColor}`)
    }

    updateIconStyles(rootElement) {
        const svg = rootElement.querySelector('svg')
        this.updateSize(svg)
        this.updateColorAndBgColor(rootElement) 
        this.updateClass(rootElement) 
    }
}