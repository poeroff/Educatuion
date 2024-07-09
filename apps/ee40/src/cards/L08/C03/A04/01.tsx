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
    text: '잘 듣고, ch의 소리를 생각하며 문장을 읽어봅시다.',
  };

  const imageInfo: IImageProps = {
    src: '/L08/C03/A04/EE4-L08-C03-A04-P01.JPG',
    title:
      '왼쪽에는 초콜릿으로 만들어진 의자와 과자로 만들어진 집을 손가락으로 가리키는 남자아이의 모습, 오른쪽에는 초콜렛 의자를 먹고 있는 남자아이의 모습',
    alt: '왼쪽에는 초콜릿으로 만들어진 의자와 과자로 만들어진 집을 손가락으로 가리키는 남자아이의 모습, 오른쪽에는 초콜렛 의자를 먹고 있는 남자아이의 모습',
    height: '271px',
  };

  const data: HighlightProps[] = [
    {
      text: 'Look! That is a chocolate chair.',
      highlightChar: 'ch',
      color: 'red',
    },
    {
      text: 'My lunch is chocolate.',
      highlightChar: 'ch',
      color: 'red',
    },
  ];

  const audioList = [{ audioSrc: '/L08/C03/A04/EE4-L08-C03-A04-P01-01.mp3' }, { audioSrc: '/L08/C03/A04/EE4-L08-C03-A04-P01-02.mp3' }];

  return <EEL02C03A04P01 headerInfo={headerInfo} questionInfo={questionInfo} imageInfo={imageInfo} audioList={audioList} data={data} />;
};

export default P01;
