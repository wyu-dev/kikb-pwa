// Script untuk generate PNG icons dari SVG
// Jalankan: node generate-icons.js
import { readFileSync, writeFileSync } from 'fs'

const svgContent = readFileSync('./public/logo.svg', 'utf-8')

// Encode SVG as base64 data URI untuk digunakan dalam img tag
const base64SVG = Buffer.from(svgContent).toString('base64')
const dataURI = `data:image/svg+xml;base64,${base64SVG}`

console.log('SVG encoded. Untuk generate PNG icons, gunakan tool seperti:')
console.log('  npx sharp-cli --input public/logo.svg --output public/icons/icon-192x192.png resize 192 192')
console.log('  npx sharp-cli --input public/logo.svg --output public/icons/icon-512x512.png resize 512 512')
console.log('\nAtau letakkan fail PNG manual di public/icons/')
