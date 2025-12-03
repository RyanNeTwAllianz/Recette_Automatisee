import type { Browser, Page } from 'puppeteer'
import type { ProcessType } from '../types.js'
import Click from './Trigger/Click.js'
import NetworkListener from './NetworkListener.js'

type IProps = {
    browser: Browser
    process: ProcessType
}

const ChangePage = async ({
    browser,
    process,
}: IProps): Promise<{ page: Page }> => {
    const pages = await browser.pages()
    const page = pages.length > 0 ? pages[0] : await browser.newPage()

    if (!!!page) throw new Error('Page not found')

    await page.goto(process.url, { waitUntil: 'networkidle2', timeout: 100000 })
    await NetworkListener({ page, process })

    await Click({
        page,
        selector: process.acceptCookies
            ? '#az-cmp-btn-accept'
            : '#az-cmp-btn-refuse',
    })
    console.log('Cookies ' + process.acceptCookies ? 'accpeted' : 'refused')

    return { page }
}

export default ChangePage
