import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { userSubmissionType, getUserSubmission } from '@maidt-cntn/api';
import {
  IQuestionProps,
  EStyleButtonTypes,
  Box,
  Input,
  Typography,
  TMainHeaderInfoTypes,
  InputStatus,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleFontSizes,
  Label,
  Image,
} from '@maidt-cntn/ui';
import { useState, useEffect, ChangeEvent } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Container } from '@maidt-cntn/ui/math';
import { C03_0002_10 } from './store';

const P03 = ({ isAdditional = false }: { isAdditional?: boolean }) => {
  const PAGE_NUMBER = 'P03';
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);
  const { changeData, saveData, initData, submitDataWithResult } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C03_0002_10);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={3} />
        대화를 읽고 한 명이 가질 수 있는 딸기와 귤 수를 각각 구해 보세요.
      </>
    ),
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const altText =
    '딸기 12개와 귤 10개가 그려진 그림입니다. 남자아이는 딸기 12개를 2명이 똑같이 나눠 가진다고 말하고, 여자 아이는 귤 10개를 2명이 똑같이 나눠 가진다고 말하고 있습니다.';

  const handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newAnswers = [...cardData.p03.answers];
    newAnswers[index] = value;
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answers: newAnswers } }));
    changeData(PAGE_NUMBER, 1, 1 + index, value);
  };

  const handleSubmit = () => {
    const { answers, solutions, isSubmitted } = cardData.p03;
    if (isSubmitted) {
      setIsAnswerShow(prev => !prev);
    } else {
      const isCorrectAll = answers.every((answer, index) => answer === solutions[index]);

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answers[0],
              isAnswer: true,
              isCorrect: answers[0] === solutions[0],
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p03.answers[1],
              isAnswer: true,
              isCorrect: answers[1] === solutions[1],
            },
          ],
          isCorrect: isCorrectAll,
        },
      ];
      submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrectAll);
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isCorrect: isCorrectAll, isSubmitted: true } }));
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      const newAnswers = userSubmissionList[0]?.inputData?.map((data: { value?: string }) => data.value) || cardData.p03.answers;

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answers: newAnswers,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const getInputStatus = (index: number) => {
    const { isSubmitted, answers, solutions } = cardData.p03;
    if (isSubmitted) {
      return answers[index] === solutions[index] ? InputStatus.ENABLE : InputStatus.ERROR;
    } else {
      return answers[index] !== '' ? InputStatus.ENABLE : InputStatus.DEFAULT;
    }
  };

  const getButtonColor = () => {
    const { answers, isSubmitted } = cardData.p03;

    if (!isSubmitted) {
      return !answers.some(value => value === '') ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.SECONDARY;
    } else {
      return isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW;
    }
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUMBER);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={isAdditional ? null : headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p03.isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={(cardData.p03.isSubmitted || cardData.p03.answers.some(value => value === '')) && !cardData.p03.isSubmitted && !isAnswerShow}
      submitBtnColor={getButtonColor()}
      onSubmit={handleSubmit}
      useRound
    >
      <Box useFull vAlign='center' flexDirection='column'>
        <Box type='line' padding='20px 40px' useRound>
          <Image src='/C03/0002/10/EA31303.png' alt={altText} width='560px' height='200px' />
        </Box>
        <Box hAlign='center' marginTop='24px' flexDirection='column'>
          <Box>
            딸기{' '}
            <Input
              maxLength={1}
              inputSize='small'
              width='52px'
              value={cardData.p03.answers[0]}
              onChange={handleChange(0)}
              status={getInputStatus(0)}
              readOnly={cardData.p03.isSubmitted}
              title='첫 번째 답 입력란'
              type='number'
            />
            개, 귤{' '}
            <Input
              maxLength={1}
              inputSize='small'
              width='52px'
              value={cardData.p03.answers[1]}
              onChange={handleChange(1)}
              status={getInputStatus(1)}
              readOnly={cardData.p03.isSubmitted}
              title='두 번째 답 입력란'
              type='number'
            />
            개
          </Box>
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow} marginTop={48}>
        <Box background='lightGray' borderRadius='12px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>{cardData.p03.solutions.join(', ')}</Typography>
          </Box>

          <Box marginTop={'40px'}>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='22px'>
            <Typography size={EStyleFontSizes.MEDIUM}>
              (한 명이 가질 수 있는 딸기 수)=12÷2=6(개)
              <br />
              (한 명이 가질 수 있는 귤 수)=10÷2=5(개)
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
