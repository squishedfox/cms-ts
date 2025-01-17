declare namespace Express {
  export interface IServiceCollection {
    addService(
      key: string,
      instanceOrFactory: object | Function,
    ): IServiceCollection;
    getService<T>(key: string): T | null;
  }
  export interface Request {
    services: IServiceCollection;
  }
}
