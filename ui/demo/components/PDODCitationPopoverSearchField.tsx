import { Input } from 'antd';
import * as React from 'react';
const { Search } = Input;

import { usePDODContext } from './PDODContext';

export const PDODCitationPopoverSearchField: React.FunctionComponent = () => {
  const { setTerm } = usePDODContext();
  const onSearch = React.useCallback((value: string) => {
    setTerm(value);
  }, []);

  return <Search placeholder="search within this paper" onSearch={onSearch} enterButton />;
};
