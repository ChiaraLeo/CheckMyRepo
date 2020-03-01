import * as React from 'react';

const RepoContext = React.createContext({
  user: 'User',
  setUser: () => {},
  repo: 'Repo',
  success: null,
  message: ''
});

export const RepoContextProvider = RepoContext.Provider

export const RepoContextConsumer = RepoContext.Consumer