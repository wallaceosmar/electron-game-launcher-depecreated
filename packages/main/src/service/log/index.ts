import log from 'electron-log'

// override console log functions
Object.assign(console, log.functions)

export { log }