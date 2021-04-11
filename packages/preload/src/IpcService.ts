import { ipcRenderer, IpcRenderer } from 'electron'
import _ from 'lodash'

export class IpcService {
    
    private ipcRenderer: IpcRenderer = ipcRenderer;

    /**
     * 
     * @param channel 
     * @param request 
     * @returns 
     */
    public send<T>(channel: IpcChannel, request: IpcRequest = {}): Promise<T> {
        
        // If there's no responseChannel let's auto-generate it
        if ( _.isUndefined(request.responseChannel) ) {
            request.responseChannel = `${channel}_response_${new Date().getTime()}`
        }
    
        const ipcRenderer = this.ipcRenderer
        ipcRenderer.send(channel, request)
    
        // This method returns a promise which will be resolved when the response has arrived.
        return new Promise(resolve => {
            ipcRenderer.once( _.defaultTo(request.responseChannel, ''), (event, response) => resolve(response))
        })
    }
}