import type { BashType, ProcessType } from '../types.js'

type IProps = {
    bash: BashType
    process: ProcessType
}

const FillProcessWithBash = ({ bash, process }: IProps): ProcessType => {
    process.size = bash.size
    process.reloadBrowser = bash.reloadBrowser
    process.plugins = bash.plugins?.length
        ? bash.plugins
        : (process.plugins ?? [])
    process.blockedUrls = bash.blockedUrls?.length
        ? bash.blockedUrls
        : (process.blockedUrls ?? [])
    process.url = bash.urlParams
        ? process.url + bash.urlParams
        : process.urlParams
          ? process.url + process.urlParams
          : process.url
    bash.doBefore?.length &&
        process.tests[0] &&
        process.tests[0].commands.unshift(...bash.doBefore)
    bash.doAfter?.length &&
        process.tests[0] &&
        process.tests[0].commands.push(...bash.doAfter)
    return process
}

export default FillProcessWithBash
