import { useSyncExternalStore } from 'react';

type Listener = () => void;

/**
 * Minimal global store built on `useSyncExternalStore`.
 * `useStore(selector)` re-renders only when the selected value changes (by `Object.is`).
 */
export function createStore<T>(initialState: T) {
  let state = initialState;
  const listeners = new Set<Listener>();

  const getState = () => state;

  const setState = (update: Partial<T> | ((prev: T) => Partial<T>)) => {
    const patch = typeof update === 'function' ? update(state) : update;
    state = { ...state, ...patch };
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener: Listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  function useStore<S>(selector: (s: T) => S): S {
    return useSyncExternalStore(subscribe, () => selector(state), () => selector(state));
  }

  return { getState, setState, subscribe, useStore };
}
