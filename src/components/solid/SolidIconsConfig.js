import { solidIcons } from '../../icons/solid.js'
export default class SolidIconsConfig extends HTMLElement {
    icon = ''
    size = ''
    color = ''
    classes = []

    static get observedAttributes() {
        return ['icon', 'size', 'color', 'class']
    }   
    
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.addClasses(this.icon)
        this.render()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'icon':
                this.icon = solidIcons[newValue] || ''
                break
            case 'size': 
                this.size = newValue || ''
                break
            case 'color':
                this.color = newValue || ''
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
                    fill: var(--icon-color, #363636);
                    width: var(--icon-size, 32px);
                    height: var(--icon-size, 32px)
                }
            </style>
        `
    }   

    get template() {
        return `
            ${this.icon}
        `
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
