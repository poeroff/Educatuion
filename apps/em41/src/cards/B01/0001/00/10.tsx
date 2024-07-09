import { BottomSheet, Box, EStyleButtonTypes, ETagLine, Input, InputStatus, IQuestionProps, Label, Tag, Typography, Image } from '@maidt-cntn/ui';
import { ChangeEvent, useEffect, useState } from 'react';
import { B01_0001_00 } from './store';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString, isNumber } from '@maidt-cntn/util/CommonUtil';
import { Container } from '@maidt-cntn/ui/math';

const P10 = () => {
  const pageNumber = 'P10';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B01_0001_00);
  const { userId } = useRecoilValue(studentAtom);

  const [isShow, setShow] = useState<boolean>(false);
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='10' type='icon' />
        시각을 읽어 보세요.
      </>
    ),
    mark: cardData[pageNumber].isSubmitted ? (cardData[pageNumber].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
        },
        {
          subKey: 2,
          type: 'NUMBER',
          value: 0,
        },
        {
          subKey: 3,
          type: 'NUMBER',
          value: 0,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData[pageNumber].isSubmitted) {
      setShow(!isShow);
      return;
    }
    const isCorrect1 = cardData[pageNumber].answer.value1 === cardData[pageNumber].solution.value1;
    const isCorrect2 = cardData[pageNumber].answer.value2 === cardData[pageNumber].solution.value2;
    const isCorrect3 = cardData[pageNumber].answer.value3 === cardData[pageNumber].solution.value3;

    const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;

    setCardData(prev => ({
      ...prev,
      [pageNumber]: {
        ...prev[pageNumber],
        isSubmitted: true,
        isCorrect,
        isCorrect1,
        isCorrect2,
        isCorrect3,
      },
    }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData[pageNumber].answer.value1,
            isAnswer: true,
          },
          {
            subKey: 2,
            type: 'NUMBER',
            value: cardData[pageNumber].answer.value2,
            isAnswer: true,
          },
          {
            subKey: 3,
            type: 'NUMBER',
            value: cardData[pageNumber].answer.value3,
            isAnswer: true,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageNumber, userSubmission, isCorrect);
  };

  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!isNumber(value)) {
      return;
    }
    const userInputs = {
      ...cardData[pageNumber].answer,
      [name]: value,
    };
    setCardData(prev => ({
      ...prev,
      [pageNumber]: {
        ...prev[pageNumber],
        answer: userInputs,
      },
    }));
    changeData(pageNumber, 1, Number(name.replace('value', '')), value);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageNumber]: {
            ...prev[pageNumber],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageNumber].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId={'targetContainer'}
      questionInfo={questionInfo}
      headerInfo={null}
      background={'var(--color-white)'}
      submitLabel={cardData[pageNumber].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData[pageNumber].answer.value1 || !cardData[pageNumber].answer.value2 || !cardData[pageNumber].answer.value3}
      submitBtnColor={
        !cardData[pageNumber].answer.value1 || !cardData[pageNumber].answer.value2 || !cardData[pageNumber].answer.value3
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      onSubmit={submitAnswer}
      useRound
    >
      <Box display='flex' type='line' justifyContent='center' padding={'24px 17px'} borderRadius={16}>
        <Image src={'/B00/DJC410006.png'} alt={'짧은바늘은 숫자 10과 11 사이, 긴바늘은 숫자 5, 초바늘은 2를 가리키고 있는 시계 그림입니다.'} />
      </Box>
      <Box hAlign='center' flexDirection='column'>
        <Box marginTop='40px'>
          <Input
            width='80px'
            textAlign='start'
            name='value1'
            ariaLabel='시 입력란'
            value={cardData[pageNumber].answer.value1.toString()}
            onChange={handleInputChangeEvent}
            maxLength={3}
            readOnly={cardData[pageNumber].isSubmitted}
            status={
              cardData[pageNumber].isSubmitted
                ? cardData[pageNumber].isCorrect1
                  ? InputStatus.ENABLE
                  : InputStatus.ERROR
                : isNotEmptyString(cardData[pageNumber].answer.value1)
                ? InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
          />
          <Typography>시</Typography>
          <Input
            width='80px'
            textAlign='start'
            ariaLabel='분 입력란'
            name='value2'
            value={cardData[pageNumber].answer.value2.toString()}
            onChange={handleInputChangeEvent}
            maxLength={3}
            readOnly={cardData[pageNumber].isSubmitted}
            status={
              cardData[pageNumber].isSubmitted
                ? cardData[pageNumber].isCorrect2
                  ? InputStatus.ENABLE
                  : InputStatus.ERROR
                : isNotEmptyString(cardData[pageNumber].answer.value1)
                ? InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
          />
          <Typography>분</Typography>
          <Input
            width='80px'
            textAlign='start'
            ariaLabel='초 입력란'
            name='value3'
            value={cardData[pageNumber].answer.value3.toString()}
            onChange={handleInputChangeEvent}
            maxLength={3}
            readOnly={cardData[pageNumber].isSubmitted}
            status={
              cardData[pageNumber].isSubmitted
                ? cardData[pageNumber].isCorrect3
                  ? InputStatus.ENABLE
                  : InputStatus.ERROR
                : isNotEmptyString(cardData[pageNumber].answer.value1)
                ? InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
          />
          <Typography>초</Typography>
        </Box>
      </Box>
      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
                <Typography>10,25,10</Typography>
              </Box>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{cardData[pageNumber].commentary}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};
export default P10;
