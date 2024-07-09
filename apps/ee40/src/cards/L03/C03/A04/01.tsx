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
    text: 'u의 소리를 생각하며 잘 들어 봅시다.',
  };

  const imageInfo: IImageProps = {
    src: '/L03/C03/A04/EE4-L03-C03-A04-P02.JPG',
    title: '왼쪽에는 토끼가 신나하며 달리는 모습, 오른쪽에는 화난 표정의 코끼리가 컵 위에 앉은 토끼를 바라보고 있는 모습',
    alt: '왼쪽에는 토끼가 신나하며 달리는 모습, 오른쪽에는 화난 표정의 코끼리가 컵 위에 앉은 토끼를 바라보고 있는 모습',
    height: '271px',
  };

  const data: HighlightProps[] = [
    {
      text: 'I can run. it’s fun.',
      highlightChar: 'u',
      color: 'red',
    },
    {
      text: 'Stand up. It’s my cup.',
      highlightChar: 'u',
      color: 'red',
    },
  ];

  const audioList = [{ audioSrc: '/L03/C03/A04/EE4-L03-C03-A04-P01-01.mp3' }, { audioSrc: '/L03/C03/A04/EE4-L03-C03-A04-P01-02.mp3' }];

  return <EEL02C03A04P01 headerInfo={headerInfo} questionInfo={questionInfo} imageInfo={imageInfo} audioList={audioList} data={data} />;
};

export default P01;
