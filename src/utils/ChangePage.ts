import type { Browser, Page } from 'puppeteer'
import type { NetWorkType, ProcessType } from '../types.js'
import Click from './Trigger/Click.js'
import TrackingListener from './TrackingListener.js'
import NetworkListener from './NetworkListener.js'
import ExecuteScript from './Trigger/ExecuteScript.js'

type IProps = {
    browser: Browser
    process: ProcessType
}

const ChangePage = async ({
    browser,
    process,
}: IProps): Promise<{ page: Page; net: NetWorkType[] }> => {
    const pages = await browser.pages()
    const page = pages.length > 0 ? pages[0] : await browser.newPage()

    if (!!!page) throw new Error('Page not found')

    const net = await NetworkListener({ page, process, browser })
    await TrackingListener({ page, process })
    await page.goto(process.url, { waitUntil: 'networkidle2', timeout: 100000 })

    if (process.acceptCookies) {
        await ExecuteScript({
            page,
            script: `document.cookie = "OptanonConsent=isIABGlobal=false&datestamp=Thu%20Dec%2004%202025%2010%3A33%3A04%20GMT%2B0100%20(heure%20normale%20d%E2%80%99Europe%20centrale)&version=6.19.0&hosts=&consentId=72b84b90-2a2c-4abb-9afa-f338cacf2d94&interactionCount=1&landingPath=NotLandingPage&groups=901%3A1%2C902%3A1%2C903%3A1%2C904%3A1%2C905%3A1%2C906%3A1%2C907%3A1%2C908%3A1%2C909%3A1%2C910%3A1%2C911%3A1%2C912%3A1%2C913%3A1&AwaitingReconsent=false; domain=.allianz.fr; path=/; max-age=33696000";
                document.cookie = "OptanonAlertBoxClosed=2025-12-05T09:26:19.151Z; domain=.allianz.fr; path=/; max-age=33696000";`,
        })
    }

    console.log('Cookies ', process.acceptCookies ? 'accpeted' : 'denied')

    return { page, net }
}

export default ChangePage
