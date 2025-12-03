import type { Page } from 'puppeteer'
import { Plugins, type NetWorkType, type ProcessType } from '../types.js'

type IProps = {
    page: Page
    process: ProcessType
}

const NetworkListener = async ({
    page,
    process,
}: IProps): Promise<NetWorkType[]> => {
    if (!process.plugins.includes(Plugins.NETWORK)) return []

    let net: NetWorkType[] = []
    page.on('request', (request) => {
        net.push({
            url: request.url(),
            method: request.method(),
            headers: request.headers(),
        })
    })

    return net
}

export default NetworkListener
