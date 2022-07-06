import { solidIcons } from '../../icons/solid.js'

// export default class SolidIconsConfig extends HTMLElement {
//     constructor () {
//         super()
//         this.build()
//     }

//     build() {
//         const shadow = this.attachShadow({ mode: 'open' })
//         this.createRootElement(shadow)
//     }

//     createRootElement(shadow) {
//         const iconName = this.getAttribute('icon')
//         if (iconName) {
//             shadow.innerHTML = solidIcons[iconName]
//         }
//         this.updateIconStyles(shadow)

//         return shadow
//     }

//     updateSize(svg) {
//         const size = this.getAttribute('size')
//         svg.setAttribute('height', size? size : '24px')
//         svg.setAttribute('width', size? size : '24px')
//     }

//     updateColorAndBgColor(rootElement) {
//         const color = this.getAttribute('color')
//         const bgColor = this.getAttribute('bgColor')
//         rootElement.children[0].setAttribute('style', `background-color: ${bgColor}; color: ${color}`)
//     }

//     updateClass(rootElement) {
//         const classesNames = this.getAttribute('class')
//         const classesList = classesNames.split(' ')
//         classesList.forEach(className => {
//             rootElement.children[0].classList.add(className)
//         })
//     }

//     updateIconStyles(rootElement) {
//         const svg = rootElement.querySelector('svg')
//         this.updateSize(svg)
//         this.updateColorAndBgColor(rootElement) 
//         this.updateClass(rootElement) 
//     }
// }

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

    render() {
        this.shadowRoot.innerHTML = `${this.style}${this.template}`
    }
}
