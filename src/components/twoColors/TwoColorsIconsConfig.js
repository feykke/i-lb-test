import { twoColorsIcons } from '../../icons/twoColors.js'

export default class TwoColorsIconsConfig extends HTMLElement {
    classes = []

    static get observedAttributes() {
        return ['icon', 'fill', 'stroke', 'size', 'class']
    }
    
    get iconName() {
        return this.getAttribute('icon') || (this.textContent || '').trim()
    }
    
    get template() {
        return `
        ${twoColorsIcons[this.iconName]}
        `
    }

    get style() {
        return `
    <style>
        :host {
            display: inline-block;
            --icon-stroke: ${this.getAttribute('stroke') || '#363636'};
            --icon-fill: ${this.getAttribute('fill') || '#CCC'};
            --icon-size: ${this.getAttribute('size') || '32px'};
        }

        svg {
            stroke: var(--icon-stroke);
            fill: var(--icon-fill);
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
                newValue !== null? this.setAttribute('icon', newValue): this.removeAttribute('icon')
                break
            case 'size' && (newValue !== oldValue): 
                newValue !== null? this.setAttribute('size', newValue): this.removeAttribute('size')
                break
            case 'stroke' && (newValue !== oldValue):
                newValue !== null? this.setAttribute('stroke', newValue): this.removeAttribute('stroke')
                break
            case 'fill' && (newValue !== oldValue):
                newValue !== null? this.setAttribute('fill', newValue): this.removeAttribute('fill')
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