// Reexport the native module. On web, it will be resolved to SwipeCleanModule.web.ts
// and on native platforms to SwipeCleanModule.ts
export { default } from './SwipeCleanModule';
export { default as SwipeCleanView } from './SwipeCleanView';
export * from  './SwipeClean.types';
