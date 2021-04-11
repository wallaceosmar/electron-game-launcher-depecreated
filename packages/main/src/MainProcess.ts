import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { URL } from 'url'
import _ from 'lodash'
import { Container } from '/@/container'

const env = import.meta.env

class MainProcess extends Container {
    
    private mainWindow: BrowserWindow| null = null;

    constructor (context: AppContainerAttributes ) {
        super(context)
        this.createWindow = this.createWindow.bind(this)
    }

    /**
     * 
     * @returns 
     */
    public init(ipcChannels: IpcChannelInterface[] = []): MainProcess {
        app.on('ready', this.createWindow)
        app.on('window-all-closed', this.onWindowAllClosed)
        app.on('second-instance', this.onSecondInstance)
        app.on('activate', this.onActivate)

        // Register ipc
        this.registerIpcChannels(ipcChannels)

        return this
    }

    /**
     * 
     * @param ipcChannels 
     */
    private registerIpcChannels(ipcChannels: IpcChannelInterface[]) {
        _.forEach(ipcChannels, channel => ipcMain.on(channel.getName(), (event, request) => channel.handle(event, request) ))
    }
    
    /**
     * 
     */
    private onSecondInstance() {
        if ( this.mainWindow ) {
            if ( this.mainWindow.isMinimized() ) {
                this.mainWindow.restore()
            }
            
            this.mainWindow.focus()
        }
    }
    
    /**
     * 
     */
    private onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    }
    
    /**
     * 
     */
    private onActivate() {
        if (!this.mainWindow) {
            this.createWindow()
        }
    }

    /**
     * 
     */
    private async createWindow () {
        this.mainWindow = new BrowserWindow({
            show: true,
            webPreferences: {
                preload: join(__dirname, '../../preload/dist/index.cjs'),
                contextIsolation: this.context.env.MODE !== 'test',   // Spectron tests can't work with contextIsolation: true
                enableRemoteModule: this.context.env.MODE === 'test', // Spectron tests can't work with enableRemoteModule: false
            },
        })
    
        /**
         * URL for main window.
         * Vite dev server for development.
         * `file://../renderer/index.html` for production and test
         */
        const pageUrl = this.context.env.MODE === 'development'
            ? this.context.env.VITE_DEV_SERVER_URL
            : new URL('../renderer/dist/index.html', 'file://' + __dirname).toString()
    
        if (env.MODE === 'development') {
            this.mainWindow.webContents.openDevTools()
        }
    
        await this.mainWindow.loadURL(pageUrl)
    }

}

export { MainProcess }