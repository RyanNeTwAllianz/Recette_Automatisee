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
import GetTodayDateAndTime from './utils/GetTodayDateAndTime.js'

const Main = async () => {
    const files = GetArgsFromCmd()
    let browser = null
    let reloadBrowser = true

    for (const file of files) {
        const process = await ReadFile(file)
        process.name = file
        process.url =
            process.url + (process.tests[0]?.commands[0]?.target ?? '')

        CreateFolder('./screenshots/' + process.name)
        CreateFolder('./output/' + process.name)

        if (reloadBrowser) browser = (await Init({ process })).browser
        if (!browser) continue

        const { page, net } = await ChangePage({ browser, process })
        const csl = await ConsoleListener({ page, process })
        const parcours = await ParcourForm({ page, process })

        await GeneratePdf({ parcours, page, process })
        await End({ browser, process, page })

        const time = GetTodayDateAndTime()
        await CreateFile({
            array: parcours,
            fileName: `./output/${process.name}/parcours_${time}.json`,
        })
        await CreateFile({
            array: csl,
            fileName: `./output/${process.name}/console_${time}.json`,
        })
        await CreateFile({
            array: net,
            fileName: `./output/${process.name}/network_${time}.json`,
        })

        const refactoParcours = RefactoParcours(parcours)
        await GenerateHTML({ data: refactoParcours, process })
        reloadBrowser = process.reloadBrowser
    }
}

await Main()

export default Main
