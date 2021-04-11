
interface ElectronApi {
  readonly versions: Readonly<NodeJS.ProcessVersions>
  readonly onCloseWindow(): void
  readonly onMinimizeWindow(): void
}

declare interface Window {
  electron: Readonly<ElectronApi>
  electronRequire?: NodeRequire
}
