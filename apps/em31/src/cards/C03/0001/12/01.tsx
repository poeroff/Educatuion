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
  SvgIcon,
  BoxWrap,
} from '@maidt-cntn/ui';
import { useState, useEffect, ChangeEvent } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Container } from '@maidt-cntn/ui/math';
import { C03_0001_12 } from './store';
import headerIcon from '@/assets/icon/m_default_01.svg';
import styled from '@emotion/styled';
import ConnectorLine from '@/assets/example/connector_line.svg';
import ConnectorArrow from '@/assets/example/connector_arrow.svg';

const P01 = () => {
  const PAGE_NUMBER = 'P01';
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);
  const { changeData, saveData, initData, submitDataWithResult } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C03_0001_12);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathTween',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='48px' />
        빈칸에 알맞은 수를 써넣으세요.
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
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

  const handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newAnswers = [...cardData.p01.answers];
    newAnswers[index] = value;
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answers: newAnswers } }));
    changeData(PAGE_NUMBER, 1, 1 + index, value);
  };

  const handleSubmit = () => {
    const { answers, solutions, isSubmitted } = cardData.p01;
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
              value: cardData.p01.answers[0],
              isAnswer: true,
              isCorrect: answers[0] === solutions[0],
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answers[1],
              isAnswer: true,
              isCorrect: answers[1] === solutions[1],
            },
          ],
          isCorrect: isCorrectAll,
        },
      ];
      submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrectAll);
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isCorrect: isCorrectAll, isSubmitted: true } }));
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      const newAnswers = userSubmissionList[0]?.inputData?.map((data: { value?: string }) => data.value) || cardData.p01.answers;

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
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
    const { isSubmitted, answers, solutions } = cardData.p01;
    if (isSubmitted) {
      return answers[index] === solutions[index] ? InputStatus.ENABLE : InputStatus.ERROR;
    } else {
      return answers[index] !== '' ? InputStatus.ENABLE : InputStatus.DEFAULT;
    }
  };

  const getButtonColor = () => {
    const { answers, isSubmitted } = cardData.p01;

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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={(cardData.p01.isSubmitted || cardData.p01.answers.some(value => value === '')) && !cardData.p01.isSubmitted && !isAnswerShow}
      submitBtnColor={getButtonColor()}
      onSubmit={handleSubmit}
      vAlign='flex-start'
      useRound
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' hAlign='center' useRound width='636px' height='172px'>
          <BoxWrap display='flex' justifyContent='center' boxGap={0} marginTop='65px'>
            <Box width='130px' height='52px' hAlign='center' borderRadius='8px' background='var(--color-yellow-300)'>
              3
            </Box>
            <Box width='80px' hAlign='center'>
              <GrayRoundBox>× 3</GrayRoundBox>
            </Box>
            <Box>
              <Input
                type='number'
                textAlign='start'
                width='130px'
                title='첫 번째 답 입력란'
                value={cardData.p01.answers[0]}
                onChange={handleChange(0)}
                readOnly={cardData.p01.isSubmitted}
                status={getInputStatus(0)}
              />
            </Box>
            <Box width='80px' hAlign='center'>
              <GrayRoundBox>× 7</GrayRoundBox>
            </Box>
            <Box>
              <Input
                type='number'
                textAlign='start'
                width='130px'
                title='두 번째 답 입력란'
                value={cardData.p01.answers[1]}
                onChange={handleChange(1)}
                readOnly={cardData.p01.isSubmitted}
                status={getInputStatus(1)}
              />
            </Box>
          </BoxWrap>
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow} marginTop={48}>
        <Box background='lightGray' borderRadius='12px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>{cardData.p01.solutions.join(', ')}</Typography>
          </Box>

          <Box marginTop={'40px'}>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='22px'>
            <Typography size={EStyleFontSizes.MEDIUM}>3×3=9, 9×7=63</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;

const GrayRoundBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-grey-100);
  min-width: 120px;
  height: 52px;
  padding: 4px 12px;
  border-radius: 80px;
  margin-top: -140px;

  &:before {
    content: '';
    display: inline-block;
    position: absolute;
    left: -30px;
    top: 50%;
    width: 26px;
    height: 42px;
    background: url(${`"${ConnectorLine}"`}) no-repeat;
    background-size: contain;
  }

  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    right: -40px;
    top: 50%;
    width: 35px;
    height: 46px;
    background: url(${`"${ConnectorArrow}"`}) no-repeat;
    background-size: contain;
  }
`;
