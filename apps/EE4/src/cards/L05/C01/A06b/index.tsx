// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue, useRecoilValueLoadable, useResetRecoilState, useSetRecoilState } from 'recoil';
import { getPageId, postUserLog } from '@maidt-cntn/api';
import { pageDataAtom, pageAtom, studentAtom } from '@/stores';
import { IAudioPlayerProps, IQuestionProps, Page, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

import P01 from './01';
import P02 from './02';

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

export function A06b() {
  const { page, setPage } = usePageData();

  return (
    <Page selectedPage={page.selectedPage} setPage={setPage}>
      <P01 />
      <P02 />
    </Page>
  );
}

export default A06b;