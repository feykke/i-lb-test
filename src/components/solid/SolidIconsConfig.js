import { solidIcons } from '../../icons/solid.js'

export default class SolidIconsConfig extends HTMLElement {
    classes = []

    static get observedAttributes() {
        return ['icon', 'size', 'color', 'class']
    }
    
    get iconName() {
        return this.getAttribute('icon') || (this.textContent || '').trim()
    }
    
    get template() {
        return `
        ${solidIcons[this.iconName]}
        `
    }

    get style() {
        return `
    <style>
        :host {
            display: inline-block;
            --icon-color: ${this.getAttribute('color') || '#363636'};
            --icon-size: ${this.getAttribute('size') || '32px'};
        }

        svg {
            fill: var(--icon-color);
            width: var(--icon-size);
            height: var(--icon-size)
        }
    </style>
        `
    }   

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.addClasses(this.template)
        this.render()
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'icon' && (newValue !== oldValue):
                newValue ? this.setAttribute('icon', newValue): this.removeAttribute('icon')
                break
            case 'size' && (newValue !== oldValue):
                if(newValue !== oldValue) {
                    newValue ? this.setAttribute('size', newValue): this.removeAttribute('size')
                } 
                break
            case 'color' && (newValue !== oldValue):
                newValue ? this.setAttribute('color', newValue): this.removeAttribute('color')
                break
            case 'class' && (newValue !== oldValue): 
                this.classes = newValue.split(' ') || []
                break
        }
        this.render()
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
