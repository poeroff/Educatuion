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
    src: '/L02/C03/A04/EE4-L02-C03-A04-P01.JPG',
    title:
      '왼쪽에는 배 위에서 낚시하고 있는 남매 앞에 큰 물고기가 나타나 여자아이가 놀라 일어서는 모습, 오른쪽에는 일어선 여자아이가 물에 빠질 위험에 처해 남자아이가 말리는 모습',
    alt: '왼쪽에는 배 위에서 낚시하고 있는 남매 앞에 큰 물고기가 나타나 여자아이가 놀라 일어서는 모습, 오른쪽에는 일어선 여자아이가 물에 빠질 위험에 처해 남자아이가 말리는 모습',
    height: '271px',
  };

  const data: HighlightProps[] = [
    {
      text: 'The fish is big, big, big!',
      highlightChar: 'i',
      color: 'red',
    },
    {
      text: 'Sister! Sit, sit, sit down.',
      highlightChar: 'i',
      color: 'red',
    },
  ];

  const audioList = [{ audioSrc: '/L02/C03/A04/EE4-L01-C03-A04-P01-01.mp3' }, { audioSrc: '/L02/C03/A04/EE4-L01-C03-A04-P01-02.mp3' }];

  return <EEL02C03A04P01 headerInfo={headerInfo} questionInfo={questionInfo} imageInfo={imageInfo} audioList={audioList} data={data} />;
};

export default P01;
