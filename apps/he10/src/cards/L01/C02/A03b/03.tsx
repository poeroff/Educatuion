import { Box, BoxWrap, IAudioPlayerProps, Input, NameTag, Question, TMainHeaderInfoTypes, Typography, Image, Dropdown } from '@maidt-cntn/ui';
import { ChangeEvent, useState } from 'react';
import HE01103, { IApiInfo } from '@maidt-cntn/pages/HE-011-03';
import styled from '@emotion/styled';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { L01C02A03b } from './store';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const apiInfo: IApiInfo = {
    userId: userId,
    pageId: 'P03',
    submitDataWithResult: submitDataWithResult,
    initData: initData,
    saveData: saveData,
    changeData: changeData,
    pageIds: pageIds,
  };

  const [cardData, setCardData] = useRecoilState(L01C02A03b);

  const dropArr1: string[] = ['13th', '14th'];
  const dropArr2: string[] = ['studio', 'camera'];
  const dropArr3: string[] = ['400', '500'];
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false, false]);
  const [isCorrect, setIsCorrect] = useState<boolean[]>([]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C02/A03/HE1-L01-C02-A03-02.mp3',
    captionSrc: '/L01/C02/A03/HE1-L01-C02-A03-02.srt',
  };

  const questionText = 'Fill in the each blank with one word using information from the talk.';

  const handleInputChangeEvent = ({ target }: ChangeEvent<HTMLInputElement>, idx: number) => {
    const { name, value } = target;
    setCardData(prev => {
      const newValues = JSON.parse(JSON.stringify(prev));
      newValues.p03.answer[idx] = value;
      return newValues;
    });
  };

  const setValue = (value: string[]) => {
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: value } }));
  };

  const handleDropdownClick = (index: number, value: string | undefined) => {
    setOpenDropdown(openDropdown.map((val, idx) => idx === index));

    setCardData(prev => {
      const newValues = JSON.parse(JSON.stringify(prev));
      newValues.p03.answer[index] = value;
      return newValues;
    });
  };

  const contentsArea = (
    <>
      <BoxWrap marginTop={100}>
        <Box useFull>
          <Box>
            <Box hAlign='flex' marginBottom={'20px'}>
              <NameTag color='#4CBBB4' label='Notice' style={{ width: '97px', color: 'white' }} />
              <Typography color='var(--color-gray-900)' weight='800' style={{ fontSize: '32px', lineHeight: '48px' }}>
                NEW Library Opening!
              </Typography>
            </Box>
            <BoldText>Opening Day :</BoldText>
            <Box hAlign='flex-start'>
              <Typography>Monday, March (1)</Typography>
              <Dropdown
                isError={isCorrect[0] === false}
                readOnly={isCorrect[0] !== undefined}
                width='264px'
                selectedValue={cardData.p03.answer[0]}
                dropdownList={dropArr1}
                isOpen={openDropdown[0]}
                onClick={value => handleDropdownClick(0, value)}
                ariaLabel={'1번 답란'}
              />
            </Box>
          </Box>
          <Box>
            <BoldText>Improvements</BoldText>
          </Box>
          <Box hAlign='flex-start'>
            <Question type='dot' size='small'>
              a larger and more comfortable space
            </Question>
          </Box>
        </Box>
        <Box width='200px' useFull>
          <Image
            src={'/L01/C02/A03/HE1-L01-C02-A03-02.jpg'}
            width='180px'
            height='240px'
            alt='많은 양의 책이 꽂힌 서가가 가지런히 있는 도서관'
            style={{ borderRadius: '8px' }}
          />
        </Box>
      </BoxWrap>
      <Box hAlign='flex-start'>
        <Question type='dot' size='small'>
          a brand-new (2)
        </Question>
        <Dropdown
          isError={isCorrect[1] === false}
          readOnly={isCorrect[1] !== undefined}
          width='264px'
          selectedValue={cardData.p03.answer[1]}
          dropdownList={dropArr2}
          isOpen={openDropdown[1]}
          onClick={value => handleDropdownClick(1, value)}
          ariaLabel={'2번 답란'}
          type='up'
        />
        <Typography>for virtual</Typography>
      </Box>
      <Box hAlign='flex-start'>
        <Typography>meetings and live-streaming videos</Typography>
      </Box>
      <Box hAlign='flex-start'>
        <Question type='dot' size='small'>
          more than (3)
        </Question>
        <Dropdown
          type='up'
          isError={isCorrect[2] === false}
          readOnly={isCorrect[2] !== undefined}
          width='264px'
          selectedValue={cardData.p03.answer[2]}
          dropdownList={dropArr3}
          isOpen={openDropdown[2]}
          onClick={value => handleDropdownClick(2, value)}
          ariaLabel={'3번 답란'}
        />
        <Typography>new books for everyone’s taste</Typography>
      </Box>
    </>
  );

  const answerText = '(1) 14th<br/>(2) studio<br/>(3) 500';

  return (
    <HE01103
      apiInfo={apiInfo}
      headerInfo={headerInfo}
      audioInfo={audioInfo}
      value={cardData.p03.answer}
      answer={cardData.p03.solution}
      contentsArea={contentsArea}
      answerText={answerText}
      questionText={questionText}
      setValue={setValue}
      setIsCorrect={setIsCorrect}
    />
  );
};

const BoldText = styled.span`
  font-weight: var(--font-weight-bold);
  font-size: 28px;
  line-height: 42px;
  padding: 4px 0px;
`;

export default P03;
