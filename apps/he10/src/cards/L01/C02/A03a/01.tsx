import { Box, IAudioPlayerProps, Input, InputStatus, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { ChangeEvent, useState } from 'react';
import HE01103, { IApiInfo } from '@maidt-cntn/pages/HE-011-03';
import { L01C02A03a } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const apiInfo: IApiInfo = {
    userId: userId,
    pageId: 'P01',
    submitDataWithResult: submitDataWithResult,
    initData: initData,
    saveData: saveData,
    changeData: changeData,
    pageIds: pageIds,
  };

  const [cardData, setCardData] = useRecoilState(L01C02A03a);

  const [isCorrect, setIsCorrect] = useState<boolean[]>([]);

  const setValue = (value: string[]) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: value } }));
  };

  const handleInputChangeEvent = ({ target }: ChangeEvent<HTMLInputElement>, idx: number) => {
    const { name, value } = target;
    setCardData(prev => {
      const newValues = JSON.parse(JSON.stringify(prev));
      newValues.p01.answer[idx] = value;
      return newValues;
    });
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C02/A03/HE1-L01-C02-A03-01.mp3',
    captionSrc: '/L01/C02/A03/HE1-L01-C02-A03-01.srt',
  };

  const questionText = 'What is the girl going to do tomorrow? Fill in the blanks.';

  const answerText = 'read<br/>some<br/>recent<br/>news<br/>articles';

  const contentsArea = (
    <Box background={'var(--color-blue-100)'} useRound padding='40px 20px 40px 20px'>
      <Typography useGap={false}>She is going to </Typography>
      <Input
        ariaLabel='1번 답란'
        marginLeft={10}
        name='value0'
        value={cardData.p01.answer[0]}
        maxLength={20}
        width='100px'
        onChange={e => handleInputChangeEvent(e, 0)}
        status={
          isCorrect[0] !== undefined
            ? isCorrect[0]
              ? InputStatus.ENABLE
              : InputStatus.ERROR
            : isNotEmptyString(cardData.p01.answer[0])
            ? InputStatus.ENABLE
            : InputStatus.DEFAULT
        }
        readOnly={isCorrect[0] !== undefined}
      />
      <Input
        ariaLabel='2번 답란'
        marginLeft={10}
        name='value1'
        value={cardData.p01.answer[1]}
        maxLength={20}
        width='100px'
        onChange={e => handleInputChangeEvent(e, 1)}
        status={
          isCorrect[1] !== undefined
            ? isCorrect[1]
              ? InputStatus.ENABLE
              : InputStatus.ERROR
            : isNotEmptyString(cardData.p01.answer[1])
            ? InputStatus.ENABLE
            : InputStatus.DEFAULT
        }
        readOnly={isCorrect[1] !== undefined}
      />
      <Input
        ariaLabel='3번 답란'
        marginLeft={10}
        name='value2'
        value={cardData.p01.answer[2]}
        maxLength={20}
        width='120px'
        onChange={e => handleInputChangeEvent(e, 2)}
        status={
          isCorrect[2] !== undefined
            ? isCorrect[2]
              ? InputStatus.ENABLE
              : InputStatus.ERROR
            : isNotEmptyString(cardData.p01.answer[2])
            ? InputStatus.ENABLE
            : InputStatus.DEFAULT
        }
        readOnly={isCorrect[2] !== undefined}
      />
      <Input
        ariaLabel='4번 답란'
        marginLeft={10}
        name='value3'
        value={cardData.p01.answer[3]}
        maxLength={20}
        width='100px'
        onChange={e => handleInputChangeEvent(e, 3)}
        status={
          isCorrect[3] !== undefined
            ? isCorrect[3]
              ? InputStatus.ENABLE
              : InputStatus.ERROR
            : isNotEmptyString(cardData.p01.answer[3])
            ? InputStatus.ENABLE
            : InputStatus.DEFAULT
        }
        readOnly={isCorrect[3] !== undefined}
      />
      <Input
        ariaLabel='5번 답란'
        marginLeft={10}
        name='value4'
        value={cardData.p01.answer[4]}
        maxLength={20}
        width='130px'
        onChange={e => handleInputChangeEvent(e, 4)}
        status={
          isCorrect[4] !== undefined
            ? isCorrect[4]
              ? InputStatus.ENABLE
              : InputStatus.ERROR
            : isNotEmptyString(cardData.p01.answer[4])
            ? InputStatus.ENABLE
            : InputStatus.DEFAULT
        }
        readOnly={isCorrect[4] !== undefined}
      />{' '}
      .
    </Box>
  );

  return (
    <HE01103
      apiInfo={apiInfo}
      headerInfo={headerInfo}
      audioInfo={audioInfo}
      value={cardData.p01.answer}
      answer={cardData.p01.solution}
      answerText={answerText}
      contentsArea={contentsArea}
      questionText={questionText}
      setValue={setValue}
      setIsCorrect={setIsCorrect}
    />
  );
};

export default P01;
