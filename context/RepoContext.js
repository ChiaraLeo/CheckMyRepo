import { createContext } from 'react';

export const RepoContext = createContext({
  user: null,
  existRepoUser: 'initial',
  setExistRepoUser: () => {},
  setUser: () => {},
  repo: null,
  setRepo: () => {}
});

export const RepoContextProvider = RepoContext.Provider