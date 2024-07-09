import { Box, BoxWrap, IAudioPlayerProps, Input, NameTag, Question, TMainHeaderInfoTypes, Typography, Image, InputStatus } from '@maidt-cntn/ui';
import { ChangeEvent, useState } from 'react';
import HE01103, { IApiInfo } from '@maidt-cntn/pages/HE-011-03';
import styled from '@emotion/styled';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { L01C02A03a } from './store';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
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

  const [cardData, setCardData] = useRecoilState(L01C02A03a);

  const [isCorrect, setIsCorrect] = useState<boolean[]>([]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C02/A03/HE1-L01-C02-A03-02.mp3',
    captionSrc: '/L01/C02/A03/HE1-L01-C02-A03-02.srt',
  };

  const questionText = 'Fill in the each blank with one word using information from the talk.';

  const setValue = (value: string[]) => {
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: value } }));
  };

  const handleInputChangeEvent = ({ target }: ChangeEvent<HTMLInputElement>, idx: number) => {
    const { name, value } = target;
    setCardData(prev => {
      const newValues = JSON.parse(JSON.stringify(prev));
      newValues.p03.answer[idx] = value;
      return newValues;
    });
  };

  const answerText = `
  (1) March 14th<br/>
  (2) Comfortable<br/>
  (3) studio<br/>
  (4) virtual<br/>
  (5) 500<br/>
  (6) taste<br/>`;

  const contentsArea = (
    <>
      <BoxWrap>
        <Box useFull>
          <Box>
            <Box hAlign='flex' marginBottom={'20px'}>
              <NameTag color='#4CBBB4' label='Notice' style={{ width: '97px', color: 'white' }} />
              <Typography color='var(--color-gray-900)' weight='800' style={{ fontSize: '32px', lineHeight: '48px' }}>
                NEW Library Opening!
              </Typography>
            </Box>
            <BoldText>Opening Day :</BoldText>
            <Typography>Monday, (1)</Typography>
            <Input
              inputSize='x-small'
              value={cardData.p03.answer[0]}
              onChange={e => handleInputChangeEvent(e, 0)}
              placeholder=''
              textAlign='left'
              width='150px'
              maxLength={30}
              readOnly={isCorrect[0] !== undefined}
              status={
                isCorrect[0] !== undefined
                  ? isCorrect[0]
                    ? InputStatus.ENABLE
                    : InputStatus.ERROR
                  : isNotEmptyString(cardData.p03.answer[0])
                  ? InputStatus.ENABLE
                  : InputStatus.DEFAULT
              }
              ariaLabel='1번 답란'
            />
            <Input
              inputSize='x-small'
              marginLeft={10}
              value={cardData.p03.answer[1]}
              onChange={e => handleInputChangeEvent(e, 1)}
              placeholder=''
              textAlign='left'
              width='150px'
              maxLength={30}
              readOnly={isCorrect[1] !== undefined}
              status={
                isCorrect[1] !== undefined
                  ? isCorrect[1]
                    ? InputStatus.ENABLE
                    : InputStatus.ERROR
                  : isNotEmptyString(cardData.p03.answer[1])
                  ? InputStatus.ENABLE
                  : InputStatus.DEFAULT
              }
              ariaLabel='1번 답란'
            />
          </Box>
          <Box>
            <BoldText>Improvements</BoldText>
          </Box>
          <Box hAlign='flex-start'>
            <Question type='dot' size='small'>
              a larger and more (2)
            </Question>
            <Input
              inputSize='x-small'
              value={cardData.p03.answer[2]}
              onChange={e => handleInputChangeEvent(e, 2)}
              textAlign='left'
              width='240px'
              maxLength={30}
              readOnly={isCorrect[2] !== undefined}
              status={
                isCorrect[2] !== undefined
                  ? isCorrect[2]
                    ? InputStatus.ENABLE
                    : InputStatus.ERROR
                  : isNotEmptyString(cardData.p03.answer[2])
                  ? InputStatus.ENABLE
                  : InputStatus.DEFAULT
              }
              ariaLabel='2번 답란'
            />
            <Typography>space</Typography>
          </Box>
          <Box hAlign='flex-start' marginTop={5}>
            <Question type='dot' size='small'>
              a brand-new (3)
            </Question>
            <Input
              inputSize='x-small'
              value={cardData.p03.answer[3]}
              onChange={e => handleInputChangeEvent(e, 3)}
              textAlign='left'
              width='150px'
              maxLength={30}
              readOnly={isCorrect[3] !== undefined}
              status={
                isCorrect[3] !== undefined
                  ? isCorrect[3]
                    ? InputStatus.ENABLE
                    : InputStatus.ERROR
                  : isNotEmptyString(cardData.p03.answer[3])
                  ? InputStatus.ENABLE
                  : InputStatus.DEFAULT
              }
              ariaLabel='3번 답란'
            />
            <Typography>for (4)</Typography>
            <Input
              inputSize='x-small'
              value={cardData.p03.answer[4]}
              onChange={e => handleInputChangeEvent(e, 4)}
              textAlign='left'
              width='150px'
              maxLength={30}
              readOnly={isCorrect[4] !== undefined}
              status={
                isCorrect[4] !== undefined
                  ? isCorrect[4]
                    ? InputStatus.ENABLE
                    : InputStatus.ERROR
                  : isNotEmptyString(cardData.p03.answer[4])
                  ? InputStatus.ENABLE
                  : InputStatus.DEFAULT
              }
              ariaLabel='4번 답란'
            />
          </Box>
          <Box hAlign='flex-start'>
            <Typography>meetings and live-streaming videos</Typography>
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
          more than (5)
        </Question>
        <Input
          inputSize='x-small'
          value={cardData.p03.answer[5]}
          onChange={e => handleInputChangeEvent(e, 5)}
          textAlign='left'
          width='100px'
          maxLength={30}
          readOnly={isCorrect[5] !== undefined}
          status={
            isCorrect[5] !== undefined
              ? isCorrect[5]
                ? InputStatus.ENABLE
                : InputStatus.ERROR
              : isNotEmptyString(cardData.p03.answer[5])
              ? InputStatus.ENABLE
              : InputStatus.DEFAULT
          }
          ariaLabel='5번 답란'
        />
        <Typography>new books for everyone’s (6)</Typography>
        <Input
          inputSize='x-small'
          value={cardData.p03.answer[6]}
          onChange={e => handleInputChangeEvent(e, 6)}
          textAlign='left'
          width='150px'
          maxLength={30}
          readOnly={isCorrect[6] !== undefined}
          status={
            isCorrect[6] !== undefined
              ? isCorrect[6]
                ? InputStatus.ENABLE
                : InputStatus.ERROR
              : isNotEmptyString(cardData.p03.answer[6])
              ? InputStatus.ENABLE
              : InputStatus.DEFAULT
          }
          ariaLabel='6번 답란'
        />
      </Box>
    </>
  );

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

export default P01;
