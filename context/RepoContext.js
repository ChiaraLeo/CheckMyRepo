import { createContext } from 'react';

export const RepoContext = createContext({
  user: null,
  setUser: () => {},
  repo: null,
  setRepo: () => {}
});

export const RepoContextProvider = RepoContext.Provider