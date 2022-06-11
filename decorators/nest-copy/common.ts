const PATH_METADATA = 'path'
import 'reflect-metadata';

export function Controller() {
  const path = '/';

  return (target: object) => { // NOTE: target = class like AppController. save this in Reflect.
    Reflect.defineMetadata(PATH_METADATA, path, target);
    // Reflect.defineMetadata(HOST_METADATA, host, target);
    // Reflect.defineMetadata(SCOPE_OPTIONS_METADATA, scopeOptions, target);
    // Reflect.defineMetadata(VERSION_METADATA, versionOptions, target);
  };
}

export function Module(metadata: any) {
  return (target: Function) => {
    for (const property in metadata) {
      if (metadata.hasOwnProperty(property)) {
        Reflect.defineMetadata(property, (metadata as any)[property], target);
      }
    }
  };
}

export function Get(path?: any) {
  return (target: any, name:any, descriptor:any) => {
    return descriptor
  }
}