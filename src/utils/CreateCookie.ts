import type { Browser } from 'puppeteer'
import type { CookieType } from '../types.js'

type IProps = {
    browser: Browser
    cookies?: CookieType[] | undefined
}

const CreateCookie = async ({ browser, cookies }: IProps) => {
    if (!cookies?.length) return

    for (const cookie of cookies) await browser.setCookie(cookie)

    console.log('Cookies created')
}

export default CreateCookie
