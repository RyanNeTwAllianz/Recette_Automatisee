import path from 'path'
import { readFile } from 'fs/promises'

const ReadFile = async <T>(p: string): Promise<T> => {
    const fullPath = path.resolve(`./const/${p}.json`)

    const data = await readFile(fullPath, 'utf8')
    return JSON.parse(data)
}

export default ReadFile
