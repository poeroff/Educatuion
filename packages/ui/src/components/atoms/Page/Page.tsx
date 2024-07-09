import { Children, useEffect } from 'react';
import { IPageAtom } from '@maidt-cntn/ui';

type PageProps = {
  selectedPage: number;
  setPage: (page: (prev: IPageAtom) => IPageAtom) => void;
  children?: React.ReactNode;
};

export const Page = ({ selectedPage = 0, setPage, children }: PageProps) => {
  const pages = Children.toArray(children);

  useEffect(() => {
    setPage(prev => {
      return { ...prev, selectedPage: 1, pageTotalNums: children ? Children.toArray(children).length : 1 };
    });
  }, []);

  return <>{pages[selectedPage - 1]}</>;
};

export default Page;
