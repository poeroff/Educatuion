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
    text: 'sh의 소리를 생각하며 잘 들어 봅시다.',
  };

  const imageInfo: IImageProps = {
    src: '/L10/C03/A04/EE4-L10-C03-A04-P01.JPG',
    title:
      '왼쪽에는 개구리가 자판기에서 물고기 모양 신발을 얻고 놀라 하는 모습, 오른쪽에는 개구리가 자판기에서 물고기가 그려진 셔츠를 얻고 기뻐하는 모습',
    alt: '왼쪽에는 개구리가 자판기에서 물고기 모양 신발을 얻고 놀라 하는 모습, 오른쪽에는 개구리가 자판기에서 물고기가 그려진 셔츠를 얻고 기뻐하는 모습',
    height: '271px',
  };

  const data: HighlightProps[] = [
    {
      text: 'I have a fish shoe.',
      highlightChar: 'sh',
      color: 'red',
    },
    {
      text: 'I have a fish shirt.',
      highlightChar: 'sh',
      color: 'red',
    },
  ];

  const audioList = [{ audioSrc: '/L10/C03/A04/EE4-L10-C03-A04-P01-01.mp3' }, { audioSrc: '/L10/C03/A04/EE4-L10-C03-A04-P01-02.mp3' }];

  return <EEL02C03A04P01 headerInfo={headerInfo} questionInfo={questionInfo} imageInfo={imageInfo} audioList={audioList} data={data} />;
};

export default P01;
