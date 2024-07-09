import { Box, TMainHeaderInfoTypes, IAudioPlayerProps, Typography, Input, Dropdown } from '@maidt-cntn/ui';
import HE02501, { IApiInfo, IImageView } from '@maidt-cntn/pages/HE-025-01';
import { useState } from 'react';
import usePageData from '@/hooks/usePageData';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C03A02b } from './store';
import { studentAtom } from '@/stores/student';

const P01 = () => {
  const { changeData, initData, saveData, submitDataWithResult } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C03A02b);

  const apiInfo: IApiInfo = {
    pageId: 'P01',
    changeData,
    initData,
    pageIds,
    saveData,
    submitDataWithResult,
    userId,
  };

  const setValue = (value: string[]) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: value } }));
  };

  const dropArr1: string[] = ['teacher', 'friend'];
  const dropArr2: string[] = ['asking', 'worrying'];

  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false]);

  const [isErrorList, setIsErrorList] = useState<boolean[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const answerText = '1) friend <br/>2) worrying';
  const questionText = 'Choose the correct words to complete the woman’s advice.';
  const imageInfo: IImageView = {
    src: '/L01/C03/A02/HE1-L01-C03-A02.jpg',
    alt: '한 여성이 웃으며 무언가를 말하고 있는 모습',
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Think Ahead',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C03/A02/HE1-L01-C03-A02-01.mp3',
    captionSrc: '/L01/C03/A02/HE1-L01-C03-A02-01.srt',
  };

  const handleDropdownClick = (index: number, value: string | undefined) => {
    setOpenDropdown(openDropdown.map((val, idx) => idx === index));

    setCardData(prev => {
      const newValues = JSON.parse(JSON.stringify(prev));
      newValues.p01.answer[index] = value;
      return newValues;
    });
  };

  const boxNode: React.ReactNode = (
    <>
      <Box hAlign='flex-start'>
        <Typography>Tell your 1)</Typography>
        <Dropdown
          selectedValue={cardData.p01.answer[0]}
          isError={isErrorList[0]}
          ariaLabel='1번 답란'
          readOnly={isSubmitted}
          width='264px'
          dropdownList={dropArr1}
          isOpen={openDropdown[0]}
          onClick={value => handleDropdownClick(0, value)}
        />
        <Typography>about</Typography>
      </Box>
      <Box hAlign='flex-start'>
        <Typography>your concern instead of 2)</Typography>
        <Dropdown
          selectedValue={cardData.p01.answer[1]}
          isError={isErrorList[1]}
          ariaLabel='2번 답란'
          readOnly={isSubmitted}
          width='264px'
          dropdownList={dropArr2}
          isOpen={openDropdown[1]}
          onClick={value => handleDropdownClick(1, value)}
        />
      </Box>
      <Box>
        <Typography>about it too much.</Typography>
      </Box>
    </>
  );

  return (
    <HE02501
      apiInfo={apiInfo}
      setValue={setValue}
      imageWidth='250px'
      answer={cardData.p01.solution}
      answerText={answerText}
      boxNode={boxNode}
      headerInfo={headerInfo}
      audioInfo={audioInfo}
      imageInfo={imageInfo}
      questionText={questionText}
      value={cardData.p01.answer}
      wordArr={[]}
      showBoxNode={false}
      onSubmit={result => {
        setIsErrorList(result);
        setIsSubmitted(true);
      }}
    />
  );
};

export default P01;
