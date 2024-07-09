//Page: EE4-L12-C03-A04-P01

import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import useFile from '@/utils/fileDownLoad';
import { useEffect, useState } from 'react';
import getFileList from '@/utils/getFileList';
import EEL01C03A04P01 from '@/Pages/EEL01C03A04P01';
import { IImageProps, HighlightProps } from '@/Pages/EEL01C03A04P01';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Sounds and Letters 3',
  };

  const questionInfo: IQuestionProps = {
    text: 'th의 소리를 생각하며 잘 들어 봅시다.',
  };

  const imageInfo: IImageProps = {
    src: '/L12/C03/A04/EE4-L12-C03-A04-P01.JPG',
    title: '왼쪽에는 3개의 토마토 열매가 열린 나무에 물을 주고 있는 아이들의 모습, 오른쪽에는 30개의 토마토 열매가 열린 나무를 보며 기뻐하는 아이들의 모습',
    alt: '왼쪽에는 3개의 토마토 열매가 열린 나무에 물을 주고 있는 아이들의 모습, 오른쪽에는 30개의 토마토 열매가 열린 나무를 보며 기뻐하는 아이들의 모습',
    height: '271px',
  };

  const data: HighlightProps[] = [
    {
      text: 'It’s Wednesday today. Three tomatoes.',
      highlightChar: 'Th',
      color: 'red',
    },
    {
      text: 'It’s Thursday today. Thirty tomatoes!',
      highlightChar: 'Th',
      color: 'red',
    },
  ];

  const audioList = [{ audioSrc: '/L12/C03/A04/EE4-L12-C03-A04-P01-01.mp3' }, { audioSrc: '/L12/C03/A04/EE4-L12-C03-A04-P01-02.mp3' }];

  return <EEL01C03A04P01 headerInfo={headerInfo} questionInfo={questionInfo} imageInfo={imageInfo} audioList={audioList} data={data} />;
};

export default P01;
