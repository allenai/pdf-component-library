import { UiContext } from '@allenai/pdf-components';
import * as React from 'react';
import { useContext, useEffect, useMemo, useState } from 'react';

export interface PDODContextType {
  term: string | false;
  setTerm: React.Dispatch<React.SetStateAction<string | false>>;
}

const INIT: PDODContextType = {
  term: false,
  setTerm: () => console.error('PDOD context not init : ('),
};

export const PDODContext = React.createContext<PDODContextType>(INIT);
PDODContext.displayName = 'PDODContext';

export const usePDODContext = (): PDODContextType => useContext(PDODContext);

export const PDODContextProvider: React.FunctionComponent<{ children: React.ReactNode }> = (props: {
  children: React.ReactNode;
}) => {
  const { children } = props;
  const [term, setTerm] = useState<string | false>(false);
  const value: PDODContextType = useMemo(() => ({ term, setTerm }), [term, setTerm]);
  const { setIsShowingOutline } = useContext(UiContext);
  useEffect(() => {
    if (term === false) {
      setIsShowingOutline(false);
    } else {
      // TODO fetch search results here
      setIsShowingOutline(true);
    }
  }, [term]);

  return <PDODContext.Provider value={value}>{children}</PDODContext.Provider>;
};
