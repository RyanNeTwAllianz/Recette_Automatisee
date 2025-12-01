import GetArgsFromCmd from './utils/GetArgsFromCmd.js'
import Init from './utils/Init.js'
import End from './utils/End.js'
import ReadFile from './utils/ReadFile.js'
import ParcourForm from './utils/ParcourForm.js'
import CreateFile from './utils/CreateFile.js'
import GeneratePdf from './utils/GeneratePdf.js'
import CreateFolder from './utils/GenerateFolder.js'
import RefactoParcours from './utils/RefactoParcours.js'
import GenerateHTML from './utils/GenerateHTML.js'
import ChangePage from './utils/ChangePage.js'

const Main = async () => {
    const files = GetArgsFromCmd()
    let browser = (await Init()).browser
    let reloadBrowser = true

    for (const file of files) {
        const process = await ReadFile(file)
        CreateFolder('./screenshots/' + process.name)

        if (process.reloadBrowser) browser = (await Init()).browser

        process.url =
            process.url + (process.tests[0]?.commands[0]?.target ?? '')

        const { page } = await ChangePage({ browser, process })
        const parcours = await ParcourForm({ page, process })

        const fileName = './output/' + process.name + '.json'
        await CreateFile({ parcours, fileName })
        await GeneratePdf({ parcours, page, process })
        await End({ browser, process })

        const refactoParcours = RefactoParcours(parcours)
        await GenerateHTML({ data: refactoParcours, process })
        reloadBrowser = process.reloadBrowser
    }
}

await Main()

export default Main
