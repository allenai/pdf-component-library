import { UiContext } from '@allenai/pdf-components';
import * as React from 'react';
import { useContext, useEffect, useMemo, useState } from 'react';
import { ResultType } from '../data/2201.12091';
import { query } from '../data/FakeServer';

export interface PDODContextType {
  term: string | false;
  setTerm: React.Dispatch<React.SetStateAction<string | false>>;
  results: (ResultType & { idx: number })[];
}

const INIT: PDODContextType = {
  term: false,
  setTerm: () => console.error('PDOD context not init : ('),
  results: [],
};

export const PDODContext = React.createContext<PDODContextType>(INIT);
PDODContext.displayName = 'PDODContext';

export const usePDODContext = (): PDODContextType => useContext(PDODContext);

export const PDODContextProvider: React.FunctionComponent<{ children: React.ReactNode }> = (props: {
  children: React.ReactNode;
}) => {
  const { children } = props;
  const [term, setTerm] = useState<string | false>(false);
  const [results, setResults] = useState<(ResultType & { idx: number })[]>([]);
  const value: PDODContextType = useMemo(
    () => ({ term, setTerm, results }),
    [term, setTerm, results]
  );
  const { setIsShowingOutline, isShowingOutline } = useContext(UiContext);
  useEffect(() => {
    if (term === false) {
      setIsShowingOutline(false);
      setResults([]);
    } else {
      // TODO fetch search results here
      setResults(query(term).slice(0, 10).map((item, idx) => ({ ...item, idx })));
      setIsShowingOutline(true);
    }
  }, [term]);

  useEffect(() => {
    if (!isShowingOutline) {
      setTerm(false);
    }
  }, [isShowingOutline, setTerm]);

  return <PDODContext.Provider value={value}>{children}</PDODContext.Provider>;
};
