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
import ConsoleListener from './utils/ConsoleListener.js'
import NetworkListener from './utils/NetworkListener.js'

const Main = async () => {
    const files = GetArgsFromCmd()
    let browser = (await Init()).browser
    let reloadBrowser = false

    for (const file of files) {
        const process = await ReadFile(file)
        CreateFolder('./screenshots/' + process.name)
        CreateFolder('./output/' + process.name)

        if (process.reloadBrowser) browser = (await Init()).browser

        process.url =
            process.url + (process.tests[0]?.commands[0]?.target ?? '')

        const { page } = await ChangePage({ browser, process })
        const net = await NetworkListener({ page, process })
        const csl = await ConsoleListener({ page, process })
        const parcours = await ParcourForm({ page, process })

        await CreateFile({
            array: parcours,
            fileName: './output/' + process.name + '/' + process.name + '.json',
        })
        await GeneratePdf({ parcours, page, process })
        await End({ browser, process, page })

        await CreateFile({
            array: csl,
            fileName:
                './output/' +
                process.name +
                '/console_' +
                process.name +
                '.json',
        })
        await CreateFile({
            array: net,
            fileName:
                './output/' +
                process.name +
                '/network_' +
                process.name +
                '.json',
        })
        const refactoParcours = RefactoParcours(parcours)
        await GenerateHTML({ data: refactoParcours, process })
        reloadBrowser = process.reloadBrowser
    }
}

await Main()

export default Main
