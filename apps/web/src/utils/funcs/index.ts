export const withWindow = (callback: () => void) =>
  typeof window != 'undefined' && callback();

export const getLocalStorageItem = (item: string) =>
  withWindow(() => localStorage.getItem(item)) || '';

export const setLocalStorageItem = (item: string, value: string) =>
  withWindow(() => localStorage.setItem(item, value));

export const dispatchCustomEvent = <T>(
  name: string,
  target: Document | Window = document,
  detail: T
) => target.dispatchEvent(new CustomEvent(name, { detail }));
