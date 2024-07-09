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
    text: 'o의 소리를 생각하며 잘 들어 봅시다.',
  };

  const imageInfo: IImageProps = {
    src: '/L05/C03/A04/EE4-L05-C03-A04-P01.JPG',
    title:
      '왼쪽에는 아기 캥거루가 종이와 풀, 가위를 들고 있고, 엄마 캥거루는 상자를 가지고 있는 모습, 오른쪽에는 여우 모양의 상자를 자랑하고 있는 아기 캥거루와 그 상자를 보고 박수 치고 있는 엄마 캥거루의 모습',
    alt: '왼쪽에는 아기 캥거루가 종이와 풀, 가위를 들고 있고, 엄마 캥거루는 상자를 가지고 있는 모습, 오른쪽에는 여우 모양의 상자를 자랑하고 있는 아기 캥거루와 그 상자를 보고 박수 치고 있는 엄마 캥거루의 모습',
    height: '271px',
  };

  const data: HighlightProps[] = [
    {
      text: 'Mom, do you have a box?',
      highlightChar: 'o',
      color: 'red',
    },
    {
      text: 'Look! It’s a fox box!',
      highlightChar: 'o',
      color: 'red',
    },
  ];

  const audioList = [{ audioSrc: '/L05/C03/A04/EE4-L05-C03-A04-P01-01.mp3' }, { audioSrc: '/L05/C03/A04/EE4-L05-C03-A04-P01-02.mp3' }];

  return <EEL02C03A04P01 headerInfo={headerInfo} questionInfo={questionInfo} imageInfo={imageInfo} audioList={audioList} data={data} />;
};

export default P01;
