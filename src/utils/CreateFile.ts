import { writeFile } from 'fs/promises'
import type { Parcours, ProcessType } from '../types.js'

type IProps = {
    parcours: Parcours[]
    fileName: string
}

const CreateFile = async ({ parcours, fileName }: IProps) => {
    await writeFile(fileName, JSON.stringify(parcours), 'utf-8')

    console.log('File created => ' + fileName)
}

export default CreateFile
