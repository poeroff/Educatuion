//Page: EE4-L11-C03-A04-P01

import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import useFile from '@/utils/fileDownLoad';
import { useEffect, useState } from 'react';
import getFileList from '@/utils/getFileList';
import EEL02C03A04P01 from '@/Pages/EEL02C03A04P01';
import { IImageProps, HighlightProps } from '@/Pages/EEL02C03A04P01';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Sounds and Letters 3',
  };

  const questionInfo: IQuestionProps = {
    text: 'cl의 소리를 생각하며 잘 들어 봅시다.',
  };

  const imageInfo: IImageProps = {
    src: '/L11/C03/A04/EE4-L11-C03-A04-P01.JPG',
    title: '왼쪽에는 더러워져 울고 있는 구름 모양의 시계를 청소하기 위해 아이들이 청소도 구를 들고 준비하는 모습, 오른쪽에는 깨끗해져 활짝 웃는 구름 모양의 시계를 보고 기뻐하는 아이들의 모습',
    alt: '왼쪽에는 더러워져 울고 있는 구름 모양의 시계를 청소하기 위해 아이들이 청소도 구를 들고 준비하는 모습, 오른쪽에는 깨끗해져 활짝 웃는 구름 모양의 시계를 보고 기뻐하는 아이들의 모습',
    height: '271px',
  };

  const data: HighlightProps[] = [
    {
      text: 'The cloud clock is sad. Let’s clean.',
      highlightChar: 'cl',
      color: 'red',
    },
    {
      text: 'The cloud clock is happy now.',
      highlightChar: 'cl',
      color: 'red',
    },
  ];

  const audioList = [{ audioSrc: '/L11/C03/A04/EE4-L11-C03-A04-P01-01.mp3' }, { audioSrc: '/L11/C03/A04/EE4-L11-C03-A04-P01-02.mp3' }];

  return <EEL02C03A04P01 headerInfo={headerInfo} questionInfo={questionInfo} imageInfo={imageInfo} audioList={audioList} data={data} />;
};

export default P01;
