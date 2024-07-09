import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import styled from '@emotion/styled';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IQuestionProps,
  Label,
  Mark,
  TMarkType,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container, MathExpression } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { B01_0001_00 } from './store';
enum EQuestionKeyword {
  가분수 = '가분수',
  진분수 = '진분수',
}
const P22 = () => {
  const pageKey = 'P22';
  const solution = EQuestionKeyword.가분수;

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(B01_0001_00);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [isShow, setShow] = useState<boolean>(false);

  const handleChange = (value: string) => {
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer: value,
      },
    }));
    changeData(pageKey, 1, 1, value);
  };

  const defaultSubmission: userSubmissionType<string>[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];
  const submitAnswer = () => {
    if (isSubmitted) {
      setShow(show => !show);
    }
    const answer = cardData[pageKey].answer;
    const isCorrect = answer === solution;
    const userSubmission: userSubmissionType<string>[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: answer,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageKey, userSubmission, isCorrect);
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        isSubmitted: true,
        isCorrect,
      },
    }));
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData.value,
            isCorrect: userSubmissionList[0].isCorrect,
            isSubmitted,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageKey);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const { isSubmitted } = cardData[pageKey];

  const markType: TMarkType = isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none';

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='22' type='icon' />
        알맞은 말에 ○표 해 보세요.
      </>
    ),
    mark: markType,
  };
  const selectedValue = cardData[pageKey].answer;
  const submitLabel = isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기';
  const submitButtonColor = isSubmitted
    ? isShow
      ? EStyleButtonTypes.GRAY
      : EStyleButtonTypes.YELLOW
    : selectedValue
    ? EStyleButtonTypes.YELLOW
    : EStyleButtonTypes.SECONDARY;

  const bodyId = 'EM41B01000100P22';
  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      bodyId={bodyId}
      useRound
      vAlign='start'
      onSubmit={submitAnswer}
      submitLabel={submitLabel}
      submitBtnColor={submitButtonColor}
      submitDisabled={!isSubmitted && !selectedValue}
    >
      <Box vAlign='center' flexDirection='column'>
        <Box width='519px' marginTop={24} padding='24px' type='dashed' useRound>
          <Box hAlign={'center'}>
            <Typography size={EStyleFontSizes['LARGE']}>
              <MathExpression equation='$\frac{7}{4}$' />,
              <MathExpression equation='$\frac{6}{5}$' />,
              <MathExpression equation='$\frac{8}{8}$' />
            </Typography>
          </Box>
        </Box>
        <Box vAlign='center' marginTop='24px'>
          위의 세 분수는 모두 (
          <AnswerItem onClick={() => handleChange('진분수')} disabled={isSubmitted}>
            진분수
            {selectedValue === EQuestionKeyword.진분수 && <Mark type={'correct'} />}
          </AnswerItem>
          ,
          <AnswerItem onClick={() => handleChange('가분수')} disabled={isSubmitted}>
            가분수
            {selectedValue === EQuestionKeyword.가분수 && <Mark type={'correct'} />}
          </AnswerItem>
          )입니다.
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId={bodyId} height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px' display='flex' flexDirection='column'>
            <Typography usePre>{'가분수에 ○표'}</Typography>
          </Box>

          <Box marginTop={'10px'}>
            <Box>
              <Tag type={ETagLine.GREEN} label={'풀이'} />
            </Box>
            <Box marginTop='12px'>
              <Typography usePre>{'세 분수 모두 분자가 분모와 같거나 분모보다 큰 분수이므로 가분수입니다.'}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const AnswerItem = styled.button`
  outline: none;
  border: none;
  height: 44px;
  background-color: none;
  cursor: pointer;
  position: relative;
  > span {
    position: absolute;
    left: 30%;
    top: -30%;
  }
`;

export default P22;
