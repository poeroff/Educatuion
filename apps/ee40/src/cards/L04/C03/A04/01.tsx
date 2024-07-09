//Page: EE4-L04-C03-A04-P01

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
    text: 'e의 소리를 생각하며 잘 들어 봅시다.',
  };

  const imageInfo: IImageProps = {
    src: '/L04/C03/A04/EE4-L04-C03-A04-P01.JPG',
    title: '왼쪽에는 빨간 물감이 묻은 붓과 파렛트를 들고 있는 무당 벌레가 노란색 침대, 계란, 초록색 헬멧, 노란색 종이 있는 방에 들어간 모습, 오른쪽에는 빨간 물감이 묻은 붓과 파렛트를 들고 있는 무당 벌레가 침대, 계란, 헬멧, 그리고 종을 모두 빨간색으로 칠한 모습',
    alt: '왼쪽에는 빨간 물감이 묻은 붓과 파렛트를 들고 있는 무당 벌레가 노란색 침대, 계란, 초록색 헬멧, 노란색 종이 있는 방에 들어간 모습, 오른쪽에는 빨간 물감이 묻은 붓과 파렛트를 들고 있는 무당 벌레가 침대, 계란, 헬멧, 그리고 종을 모두 빨간색으로 칠한 모습',
    height: '271px',
  };

  const data: HighlightProps[] = [
    {
      text: 'I like red.',
      highlightChar: 'e',
      color: 'red',
    },
    {
      text: 'A red bed, a red egg, and a red helmet!',
      highlightChar: 'e',
      color: 'red',
    },
  ];

  const audioList = [{ audioSrc: '/L04/C03/A04/EE4-L04-C03-A04-P01-01.mp3' }, { audioSrc: '/L04/C03/A04/EE4-L04-C03-A04-P01-02.mp3' }];

  return <EEL01C03A04P01 headerInfo={headerInfo} questionInfo={questionInfo} imageInfo={imageInfo} audioList={audioList} data={data} />;
};

export default P01;
