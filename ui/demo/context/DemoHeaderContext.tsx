import * as React from 'react';

export type Props = {
  children?: React.ReactElement | Array<React.ReactElement>;
};

export interface IDemoHeaderContext {
  isShowingNoteTaking: boolean;
  setIsShowingNoteTaking: (isShowingNoteTaking: boolean) => void;
}

export const DemoHeaderContext = React.createContext<IDemoHeaderContext>({
  isShowingNoteTaking: false,
  setIsShowingNoteTaking: isShowingNoteTaking => {
    console.warn(
      `Unable to call setIsShowingNoteTaking(${isShowingNoteTaking}), the provider may not be set up correctly.`
    );
  },
});

export const DemoHeaderContextProvider: React.FunctionComponent<Props> = ({ children }: Props) => {
  const [isShowingNoteTaking, setIsShowingNoteTaking] = React.useState<boolean>(false);
  const value: IDemoHeaderContext = {
    isShowingNoteTaking,
    setIsShowingNoteTaking,
  };

  return <DemoHeaderContext.Provider value={value}>{children}</DemoHeaderContext.Provider>;
};
