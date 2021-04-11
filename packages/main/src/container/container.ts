import * as awilix from 'awilix'

// Create the container and set the injectionMode to PROXY (which is also the default).
const container = awilix.createContainer<AppContainerAttributes>({
  injectionMode: awilix.InjectionMode.PROXY,
})


export default container