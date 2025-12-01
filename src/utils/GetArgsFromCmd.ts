import minimist from 'minimist'

const GetArgsFromCmd = (): string[] => {
    const args = minimist(process.argv.slice(2))
    return args._ ?? []
}

export default GetArgsFromCmd
