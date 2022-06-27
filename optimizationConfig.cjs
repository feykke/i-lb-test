const solidSvgoConfig = [
    { name: 'removeTitle', active: false },
    { name: 'sortAttrs', params: { xmlnsOrder: 'alphabetical' } },
    { name: 'removeAttrs', params: { attrs: 'fill' } },
    { name: 'addAttributesToSVGElement', params: { attribute: { fill: "currentColor" } } }
]

const outlineSvgoConfig = [
    { name: 'removeTitle', active: false },
    { name: 'sortAttrs', params: { xmlnsOrder: 'alphabetical' } },
    { name: 'removeAttrs', params: { attrs: 'stroke' } },
    { name: 'addAttributesToSVGElement', params: { attribute: { stroke: "currentColor" } } }
]

const twoColorsSvgoConfig = [
    { name: 'removeTitle', active: false },
    { name: 'sortAttrs', params: { xmlnsOrder: 'alphabetical' } },
    { name: 'removeAttrs', params: { attrs: ['fill', 'stroke'] } },
    { name: 'addAttributesToSVGElement', params: { attribute: { stroke: "#363636", fill: "#0897E9" } } }
]

module.exports = {
    solidSvgoConfig,
    outlineSvgoConfig,
    twoColorsSvgoConfig
}