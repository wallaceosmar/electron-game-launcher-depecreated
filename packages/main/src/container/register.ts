import { asClass, asValue } from 'awilix'
import container from './container'
//
import { MainProcess } from '/@/MainProcess'

// Here you will register all services
container.register({
    // Variables
    env: asValue(import.meta.env),

    // Class
    mainprocess: asClass(MainProcess).singleton(),
})

export default container