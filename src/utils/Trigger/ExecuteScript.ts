import type { Page } from 'puppeteer'

type IProps = {
    page: Page
    script: string
}

const ExecuteScript = async ({ page, script }: IProps) => {
    try {
        await page.evaluate(script)
    } catch (e) {
        console.log(e)
    }
}

export default ExecuteScript
