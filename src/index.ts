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
import type { BashType, ProcessType } from './types.js'
import CreateCookie from './utils/CreateCookie.js'
import FillProcessWithBash from './utils/FillProcessWithBash.js'

const Main = async () => {
    const bashes = GetArgsFromCmd()
    let browser = null
    let reloadBrowser = true

    for (const b of bashes) {
        const bash = await ReadFile<BashType>(b)

        for (const [index, file] of bash.tests.entries()) {
            let process = await ReadFile<ProcessType>(file)
            process.name = file
            process = FillProcessWithBash({ bash, process })

            CreateFolder('./screenshots/' + process.name)

            if (reloadBrowser) browser = (await Init({ process })).browser
            if (!browser) continue

            await CreateCookie({ browser, cookies: bash.cookies })
            const { page, net } = await ChangePage({ browser, process })
            const csl = await ConsoleListener({ page, process })
            const parcours = await ParcourForm({ page, process })

            await GeneratePdf({ parcours, page, process })
            reloadBrowser =
                bash.tests.length === index + 1 ? true : process.reloadBrowser
            process.reloadBrowser = reloadBrowser
            await End({ browser, process, page })

            const time = GetTodayDateAndTime()
            await CreateFile({
                array: parcours,
                fileName: `./output/parcours_${process.name}_${time}.json`,
            })
            await CreateFile({
                array: csl,
                fileName: `./output/console_${process.name}_${time}.json`,
            })
            await CreateFile({
                array: net,
                fileName: `./output/network_${process.name}_${time}.json`,
            })

            const refactoParcours = RefactoParcours(parcours)
            await GenerateHTML({ data: refactoParcours, process })
        }
    }
}

await Main()

export default Main
