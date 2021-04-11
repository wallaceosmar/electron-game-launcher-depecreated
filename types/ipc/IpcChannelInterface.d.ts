declare interface IpcChannelInterface {
    getName(): IpcChannel;
  
    handle(event: IpcMainEvent, request: T): void;
}