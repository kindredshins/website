import React, { useContext } from 'react';
import { withRouter } from 'next/router';

const RouterContext = React.createContext();
export const useRouter = () => useContext(RouterContext);

export const RouterContextProvider = withRouter(({ router, children }) => {
  return (
    <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
  );
});
