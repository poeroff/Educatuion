// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue, useRecoilValueLoadable, useResetRecoilState, useSetRecoilState } from 'recoil';
import { getPageId, postUserLog } from '@maidt-cntn/api';
import { pageDataAtom, pageAtom, studentAtom } from '@/stores';
import { IAudioPlayerProps, IQuestionProps, Page, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

import P01 from './01';
import P02 from './02';
import P03 from './03';
import P04 from './04';
import usePageData from '@/hooks/usePageData';

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

export const listData = [
  {
    src: '/L01/C01/A06/EE4-L01-C01-A06-P01-02.jpg',
    alt: '활짝 웃고 있는 표정',
  },
  {
    src: '/L01/C01/A06/EE4-L01-C01-A06-P01-03.jpg',
    alt: '웃고 있는 표정',
  },
  {
    src: '/L01/C01/A06/EE4-L01-C01-A06-P01-04.jpg',
    alt: '기분이 좋지 않은 표정',
  },
];

export function A07b() {
  const { page, setPage } = usePageData();

  return (
    <Page selectedPage={page.selectedPage} setPage={setPage}>
      <P01 />
      <P02 />
      <P03 />
      <P04 />
    </Page>
  );
}

export default A07b;
