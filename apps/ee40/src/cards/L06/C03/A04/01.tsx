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
    text: 'a의 소리를 생각하며 잘 들어 봅시다.',
  };

  const imageInfo: IImageProps = {
    src: '/L06/C03/A04/EE4-L06-C03-A04-P01.JPG',
    title: '왼쪽에는 Jake라는 이름을 가진 남자아이가 케이크를 만들 준비를 하고 있는 모습, 오른쪽에는 남자아이가 케이크 위에 크림을 짜는 모습',
    alt: '왼쪽에는 Jake라는 이름을 가진 남자아이가 케이크를 만들 준비를 하고 있는 모습, 오른쪽에는 남자아이가 케이크 위에 크림을 짜는 모습',
    height: '271px',
  };

  const data: HighlightProps[] = [
    {
      text: 'My name is Jake.',
      highlightChar: 'a',
      color: 'red',
    },
    {
      text: 'Let’s make a cake.',
      highlightChar: 'a',
      color: 'red',
    },
  ];

  const audioList = [{ audioSrc: '/L06/C03/A04/EE4-L06-C03-A04-P01-01.mp3' }, { audioSrc: '/L06/C03/A04/EE4-L06-C03-A04-P01-02.mp3' }];

  return <EEL02C03A04P01 headerInfo={headerInfo} questionInfo={questionInfo} imageInfo={imageInfo} audioList={audioList} data={data} />;
};

export default P01;
