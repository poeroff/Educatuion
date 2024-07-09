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
    text: 'i의 소리를 생각하며 잘 들어 봅시다.',
  };

  const imageInfo: IImageProps = {
    src: '/L07/C03/A04/EE4-L07-C03-A04-P01.JPG',
    title:
      '왼쪽에는 다양한 색과 종의 강아지 9마리와 고양이 5마리가 놀고 있는 모습, 오른쪽에는 강아지와 고양이의 주인이 강아지와 고양이의 밥을 챙겨주고 있고 아직 밥을 받지 못한 강아지들과 고양이들이 줄을 서고 있는 모습',
    alt: '왼쪽에는 다양한 색과 종의 강아지 9마리와 고양이 5마리가 놀고 있는 모습, 오른쪽에는 강아지와 고양이의 주인이 강아지와 고양이의 밥을 챙겨주고 있고 아직 밥을 받지 못한 강아지들과 고양이들이 줄을 서고 있는 모습',
    height: '271px',
  };

  const data: HighlightProps[] = [
    {
      text: 'I have nine dogs and five cats.',
      highlightChar: 'i',
      color: 'red',
    },
    {
      text: 'Line up! It’s time for lunch.',
      highlightChar: 'i',
      color: 'red',
    },
  ];

  const audioList = [{ audioSrc: '/L07/C03/A04/EE4-L07-C03-A04-P01-01.mp3' }, { audioSrc: '/L07/C03/A04/EE4-L07-C03-A04-P01-02.mp3' }];

  return <EEL02C03A04P01 headerInfo={headerInfo} questionInfo={questionInfo} imageInfo={imageInfo} audioList={audioList} data={data} />;
};

export default P01;
