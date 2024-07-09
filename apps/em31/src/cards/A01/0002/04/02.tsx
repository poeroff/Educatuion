import { Box, Input, InputStatus, IQuestionProps, Label, OverlayTooltip, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import EM00801, { IBoxData } from '@maidt-cntn/math/pages/EM-008-01';
import { ChangeEvent, useEffect } from 'react';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { A01_0002_04 } from '@/cards/A01/0002/04/store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import fox from '@/assets/example/EM-008/fox.png';
import styled from '@emotion/styled';

const P02 = () => {
  const pageNumber = 'P02';
  const pageKey = 'p02';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0002_04);
  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: cardData[pageKey].answer.value1,
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'NUMBER',
          value: cardData[pageKey].answer.value2,
          isAnswer: true,
        },
        {
          subKey: 3,
          type: 'NUMBER',
          value: cardData[pageKey].answer.value3,
          isAnswer: true,
        },
      ],
    },
  ];
  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const userInputs = {
      ...cardData[pageKey].answer,
      [name]: value,
    };
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer: userInputs,
      },
    }));
    changeData(pageNumber, 1, Number(name.replace('value', '')), value);
  };
  const submitAnswer = (state: boolean[]) => {
    const isCorrect = state.every(val => val);
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: state } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData[pageKey].answer.value1,
            isAnswer: true,
            isCorrect: state[0],
          },
          {
            subKey: 2,
            type: 'NUMBER',
            value: cardData[pageKey].answer.value2,
            isAnswer: true,
            isCorrect: state[1],
          },
          {
            subKey: 3,
            type: 'NUMBER',
            value: cardData[pageKey].answer.value3,
            isAnswer: true,
            isCorrect: state[2],
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageNumber, userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer:
              {
                value1: userSubmissionList[0].inputData[0]?.value,
                value2: userSubmissionList[0].inputData[1]?.value,
                value3: userSubmissionList[0].inputData[2]?.value,
              } || cardData[pageKey].answer,
            isSubmitted,
            isCorrect: isSubmitted
              ? [
                  userSubmissionList[0].inputData[0]?.isCorrect,
                  userSubmissionList[0].inputData[1]?.isCorrect,
                  userSubmissionList[0].inputData[2]?.isCorrect,
                ]
              : [false, false, false],
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

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '배달한 물건 수 구하기',
  };

  const checkIsCorrect = (isCorrect: boolean[]) => {
    return Array.isArray(isCorrect) ? isCorrect.every(value => value) : isCorrect;
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄴ' type='paint' background='var(--color-grey-600)' color='var(--color-white)' />수 모형이 모두 몇 개인지 알아보세요.
      </>
    ),
    mark: cardData[pageKey].isSubmitted ? (checkIsCorrect(cardData[pageKey].isCorrect) ? 'correct' : 'incorrect') : 'none',
  };

  const tooltip = (
    <FoxSpeak>
      <OverlayTooltip type='cloud' place='top' isShow>
        351은
        <br /> 백 모형 3개,
        <br />십 모형 5개,
        <br />일 모형 1개로
        <br />
        나타내요.
      </OverlayTooltip>
    </FoxSpeak>
  );

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  const figureData: IBoxData[] = [
    { count: 3, ariaLabel: '백 모형' },
    { count: 5, ariaLabel: '십 모형' },
    { count: 1, ariaLabel: '일 모형' },
    { count: 2, ariaLabel: '백 모형' },
    { count: 4, ariaLabel: '십 모형' },
    { count: 6, ariaLabel: '일 모형' },
  ];

  const inputNodes = [
    <Box key={1} width='100%' height='100%'>
      <Box backgroundColor='var(--color-green-200)' marginBottom='4px' padding='12px 0' textAlign='center' borderRadius='8px'>
        백 모형
      </Box>
      <Box borderRadius='8px' width='210px' background='white' hAlign='center' padding='8px 16px' border='1px solid var(--color-grey-400)'>
        <Input
          type='number'
          width='52px'
          maxLength={5}
          name={'value1'}
          value={cardData[pageKey].answer.value1}
          readOnly={cardData[pageKey].isSubmitted}
          status={
            cardData[pageKey].isSubmitted
              ? !cardData[pageKey].isCorrect[0]
                ? InputStatus.ERROR
                : InputStatus.ENABLE
              : !isNotEmptyString(cardData[pageKey].answer.value1)
              ? InputStatus.DEFAULT
              : InputStatus.ENABLE
          }
          onChange={handleInputChangeEvent}
          title='백모형 개수의 답 입력란'
        />
        <Typography>개</Typography>
      </Box>
    </Box>,
    <Box key={2} width='100%' height='100%' marginLeft='24px'>
      <Box backgroundColor='var(--color-pink-200)' marginBottom='4px' padding='12px 0' textAlign='center' borderRadius='8px'>
        십 모형
      </Box>
      <Box borderRadius='8px' width='210px' background='white' hAlign='center' padding='8px 16px' border='1px solid var(--color-grey-400)'>
        <Input
          type='number'
          width='52px'
          maxLength={5}
          name={'value2'}
          value={cardData[pageKey].answer.value2}
          readOnly={cardData[pageKey].isSubmitted}
          status={
            cardData[pageKey].isSubmitted
              ? !cardData[pageKey].isCorrect[1]
                ? InputStatus.ERROR
                : InputStatus.ENABLE
              : !isNotEmptyString(cardData[pageKey].answer.value2)
              ? InputStatus.DEFAULT
              : InputStatus.ENABLE
          }
          onChange={handleInputChangeEvent}
          title='십 모형 개수의 답 입력란'
        />
        <Typography>개</Typography>
      </Box>
    </Box>,
    <Box key={3} width='100%' height='100%' marginLeft='24px'>
      <Box backgroundColor={'var(--color-blue-200)'} marginBottom='4px' padding='12px 0' textAlign='center' borderRadius='8px'>
        일 모형
      </Box>
      <Box borderRadius='8px' width='210px' background='white' hAlign='center' padding='8px 16px' border='1px solid var(--color-grey-400)'>
        <Input
          type='number'
          width='52px'
          maxLength={5}
          name={'value3'}
          value={cardData[pageKey].answer.value3}
          readOnly={cardData[pageKey].isSubmitted}
          status={
            cardData[pageKey].isSubmitted
              ? !cardData[pageKey].isCorrect[2]
                ? InputStatus.ERROR
                : InputStatus.ENABLE
              : !isNotEmptyString(cardData[pageKey].answer.value3)
              ? InputStatus.DEFAULT
              : InputStatus.ENABLE
          }
          onChange={handleInputChangeEvent}
          title='일 모형 개수의 답 입력란'
        />
        <Typography>개</Typography>
      </Box>
    </Box>,
  ];

  return (
    <EM00801
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      inputs={cardData[pageKey].answer}
      tooltip={tooltip}
      figureData={figureData}
      inputNodes={inputNodes}
      answer={cardData[pageKey].solution[0]}
      submitted={cardData[pageKey].isSubmitted}
      submitType={'marking'}
      commentary={cardData[pageKey].commentary}
      onSubmit={submitAnswer}
    />
  );
};

const FoxSpeak = styled.div`
  position: absolute;
  top: 40px;
  right: 0;

  display: block;
  background: url(${fox}) bottom center no-repeat;
  height: 250px;
  width: 152px;
`;

export default P02;
