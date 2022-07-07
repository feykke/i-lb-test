import { twoColorsIcons } from '../../icons/twoColors.js'

export default class TwoColorsIconsConfig extends HTMLElement {
    icon = ''
    fillColor = ''
    strokeColor = ''
    size = ''
    classes = []

    static get observedAttributes() {
        return ['icon', 'fill', 'stroke', 'size', 'class']
    }

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.addClasses(this.icon)
        this.render()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch(name) {
            case 'icon':
                this.icon = twoColorsIcons[newValue] || ''
                break
            case 'size':
                this.size = newValue || ''
                break
            case 'fill':
                this.fillColor = newValue || ''
                break
            case 'stroke':
                this.strokeColor = newValue || ''
                break
            case 'class':
                this.classes = newValue.split(' ')
                break
        }

        this.render()
    }

    get style() {
        return `
            <style>
                :host {
                    display: inline-block;
                    --icon-fill: ${this.fillColor};
                    --icon-stroke: ${this.strokeColor};
                    --icon-size: ${this.size}
                }

                svg {
                    fill: var(--icon-fill, #ccc);
                    stroke: var(--icon-stroke, #363636);
                    width: var(--icon-size, 32px);
                    height: var(--icon-size, 32px)
                }
            </style>
        `
    }

    get template() {
        return `${this.icon}`
    }

    addClasses(element) {
        this.classes.forEach(className => {
            element.classList.add(className)
        })
    }

    render() {
        this.shadowRoot.innerHTML = `${this.style}${this.template}`
    }
}