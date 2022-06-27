require('dotenv').config()

const svgo = require('@figma-export/transform-svg-with-svgo')
const { solidSvgoConfig, outlineSvgoConfig, twoColorsSvgoConfig } = require('./optimizationConfig.cjs')

const fileId = process.env.FILE_ID

const outputters = [
    require('@figma-export/output-components-as-svg')({
        output: './assets',
    })
]

module.exports = {
    commands: [
        ['components', {
            fileId,
            onlyFromPages: ['solid'],
            transformers: [svgo({ multipass: true, plugins: solidSvgoConfig })],
            outputters
        }],
        ['components', {
            fileId,
            onlyFromPages: ['outline'],
            transformers: [svgo({ multipass: true, plugins: outlineSvgoConfig })],
            outputters
        }],
        ['components', {
            fileId,
            onlyFromPages: ['two-colors'],
            transformers: [svgo({ multipass: true, plugins: twoColorsSvgoConfig })],
            outputters
        }]
    ]
}