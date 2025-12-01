import type { Browser } from 'puppeteer'
import type { ProcessType } from '../types.js'

type IProps = {
    browser: Browser
    process: ProcessType
    time?: number
}

const End = async ({ browser, process, time = 5000 }: IProps) => {
    await new Promise((resolve) => setTimeout(resolve, time))

    if (process.reloadBrowser) {
        await browser.close()
        console.log('Browser Closed')
        await new Promise((resolve) => setTimeout(resolve, 1000))
    }
}

export default End
