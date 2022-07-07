import { outlineIcons } from '../../icons/outline.js'
export default class OutlineIconsConfig extends HTMLElement {
    icon = ''
    color = ''
    size = ''
    classes = []

    static get observedAttributes() {
        return ['icon', 'color', 'size', 'class']
    }

    constructor() {
        super()
        this.attachShadow({ mode: "open" })
        this.addClasses(this.icon)
        this.render()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch(name) {
            case 'icon':
                this.icon = outlineIcons[newValue] || ''
                break
            case 'color':
                this.color = newValue || ''
                break
            case 'size':
                this.size = newValue || ''
                break
            case 'class':
                this.classes = newValue.split(' ') || []
                break
        }

        this.render()
    }

    get style() {
        return `
            <style>
                :host {
                    display: inline-block;
                    --icon-color: ${this.color};
                    --icon-size: ${this.size}
                }

                svg {
                    stroke: var(--icon-color, #363636);
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
        this.shadowRoot.innerHTML=`${this.style}${this.template}`
    }
}