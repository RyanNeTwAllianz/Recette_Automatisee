import type { Browser, CookieData } from 'puppeteer'
import ReadFile from './ReadFile.js'

type IProps = {
    browser: Browser
}

const CreateCookie = async ({ browser }: IProps) => {
    const maxAge = 33696000
    const expires = Math.floor(Date.now() / 1000) + maxAge

    await browser.setCookie(
        {
            name: 'OptanonConsent',
            value: 'isIABGlobal=false&datestamp=Thu%20Dec%2004%202025%2010%3A33%3A04%20GMT%2B0100%20(heure%20normale%20d%E2%80%99Europe%20centrale)&version=6.19.0&hosts=&consentId=72b84b90-2a2c-4abb-9afa-f338cacf2d94&interactionCount=1&landingPath=NotLandingPage&groups=901%3A1%2C902%3A1%2C903%3A1%2C904%3A1%2C905%3A1%2C906%3A1%2C907%3A1%2C908%3A1%2C909%3A1%2C910%3A1%2C911%3A1%2C912%3A1%2C913%3A1&AwaitingReconsent=false',
            domain: '.allianz.fr',
            path: '/',
            expires,
            httpOnly: false,
            secure: true,
            sameParty: false,
        },
        {
            name: 'OptanonAlertBoxClosed',
            value: '2025-12-05T17:26:19.151Z',
            domain: '.allianz.fr',
            path: '/',
            expires,
            httpOnly: false,
            secure: true,
            sameParty: false,
        }
    )
    console.log('Cookie created')
}

export default CreateCookie
