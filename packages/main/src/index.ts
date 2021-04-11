import '/@/service/log'
import { app } from 'electron'
import { container } from '/@/container'

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {

  /**
   * Workaround for TypeScript bug
   * @see https://github.com/microsoft/TypeScript/issues/41468#issuecomment-727543400
   */
  const env = import.meta.env

  // Install "React.js devtools BETA"
  if (env.MODE === 'development') {
    app.whenReady()
      .then(() => import('electron-devtools-installer'))
      .then(({default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS }) => {
        return installExtension(REACT_DEVELOPER_TOOLS)
          .then(() => installExtension(REDUX_DEVTOOLS))
          .catch(e => console.error('Failed install extension:', e))
      })
      .catch(e => console.error('Failed install extension:', e))
  }

  // Auto-updates
  if (env.PROD) {
    app.whenReady()
      .then(() => import('./autoupdater'))
      .then(({autoUpdater}) => autoUpdater.checkForUpdatesAndNotify())
      .catch((e) => console.error('Failed check updates:', e))
  }

  // Declare the class of main proccess
  // (new MainProcess()).init()
  container.cradle.mainprocess.init()
}
