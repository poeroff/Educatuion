// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IAudioPlayerProps, IQuestionProps, Page, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import P01 from './01';
import P02 from './02';
import P03 from './03';

export type BaseProps = {
  src?: string;
  alt?: string;
};

export type P04ListProps = {
  isClick?: boolean;
  audioSrc?: string;
  data?: { question: string; answer: string; type: string; color: string }[];
};

export type P04PageProps = {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  audioInfo?: IAudioPlayerProps;
  headImage?: string;
  list: P04ListProps[];
};

export type PageProps = {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  audioInfo?: IAudioPlayerProps;
  headImage?: string;
  list: BaseProps[];
  pageNumber?: number;
  mainKey?: number;
  subKey?: string;
};

export function A06a() {
  const { page, setPage } = usePageData();

  return (
    <Page selectedPage={page.selectedPage} setPage={setPage}>
      <P01 />
      <P02 />
      <P03 />
    </Page>
  );
}

export default A06a;
