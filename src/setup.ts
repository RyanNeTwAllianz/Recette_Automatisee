import { mkdir } from 'node:fs'

const Setup = async () => {
    mkdir('/const', { recursive: true }, (err) => {
        if (err) throw err
    })

    mkdir('/output', { recursive: true }, (err) => {
        if (err) throw err
    })

    mkdir('/screenshots', { recursive: true }, (err) => {
        if (err) throw err
    })

    console.log('Setup done !')
}

export default Setup
