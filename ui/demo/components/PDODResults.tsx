import * as React from 'react';
import { Divider, List, Typography } from 'antd';
import { usePDODContext } from './PDODContext';
import { scrollToId } from '@allenai/pdf-components';

export const PDODResults: React.FunctionComponent = () => {
  const { results, term } = usePDODContext();
  return (
    <React.Fragment>
      <Divider orientation="left" style={{ fontSize: '0.6em', fontWeight: 'bold' }}>{`Results for: "${term}"`}</Divider>
      <List
        size="small"
        dataSource={results}
        bordered
        renderItem={(result, idx) => <List.Item onClick={() => scrollToId(`results-${idx}`)}>{result.tokens.map(token => token.text).join(' ').replace('- ', '')}</List.Item>}
      />
    </React.Fragment>
  );
};
