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
    text: 'br의 소리를 생각하며 잘 들어 봅시다.',
  };

  const imageInfo: IImageProps = {
    src: '/L09/C03/A04/EE4-L09-C03-A04-P01.JPG',
    title:
      '왼쪽에는 가방 속에서 붓을 찾고 있는 여자아이의 모습, 오른쪽에는 여자아이가 찾던 붓을 그 아이의 남동생이 먹고 있는 모습과 화가 난 표정의 여자아이 모습',
    alt: '왼쪽에는 가방 속에서 붓을 찾고 있는 여자아이의 모습, 오른쪽에는 여자아이가 찾던 붓을 그 아이의 남동생이 먹고 있는 모습과 화가 난 표정의 여자아이 모습',
    height: '271px',
  };

  const data: HighlightProps[] = [
    {
      text: 'Where is my brown brush?',
      highlightChar: 'br',
      color: 'red',
    },
    {
      text: 'My brother is eating my brush!',
      highlightChar: 'br',
      color: 'red',
    },
  ];

  const audioList = [{ audioSrc: '/L09/C03/A04/EE4-L09-C03-A04-P01-01.mp3' }, { audioSrc: '/L09/C03/A04/EE4-L09-C03-A04-P01-02.mp3' }];

  return <EEL02C03A04P01 headerInfo={headerInfo} questionInfo={questionInfo} imageInfo={imageInfo} audioList={audioList} data={data} />;
};

export default P01;
