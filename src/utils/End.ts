import type { Browser, Page } from 'puppeteer'
import { Plugins, type ProcessType } from '../types.js'

type IProps = {
    browser: Browser
    process: ProcessType
    page: Page
    time?: number
}

const End = async ({ browser, process, page, time = 500 }: IProps) => {
    await new Promise((resolve) => setTimeout(resolve, time))

    if ((process.plugins ?? []).includes(Plugins.TRACKING))
        await page.tracing.stop()

    if (process.reloadBrowser) {
        await browser.close()
        console.log('Browser Closed')
        await new Promise((resolve) => setTimeout(resolve, time))
    }
}

export default End
