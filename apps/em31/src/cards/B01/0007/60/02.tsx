import { ChangeEvent, useEffect, useState } from 'react';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleTableTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  Label,
  SvgIcon,
  TBody,
  TD,
  TH,
  TR,
  Table,
  TableMathCaption,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import minus_arrow from '@/assets/example/EMA-005-01/Frame 1000005033.png';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { B01000760_store } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B01000760_store);
  const { userId } = useRecoilValue(studentAtom);
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);

  const pageKey = 'P02';

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', ''],
          isCorrect: false,
        },
      ],
    },
  ];

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={2} />
        빈칸에 알맞은 수를 써넣으세요.
      </>
    ),
    mark: cardData.P02.isSubmitted ? (cardData.P02.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P02: {
            ...prev.P02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.P02.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChangeInput = (index: number, { target }: ChangeEvent<HTMLInputElement>) => {
    const value = target.value;
    setCardData(prev => ({ ...prev, P02: { ...prev.P02, answer: prev.P02.answer.map((item, idx) => (idx === index ? value : item)) } }));
  };

  useEffect(() => {
    changeData(pageKey, 1, 1, cardData.P02.answer);
  }, [cardData.P02.answer]);

  const handleInputStatus = (userAnswer: string, correctAnswer: string): InputStatus => {
    return !isNotEmptyString(userAnswer)
      ? InputStatus.DEFAULT
      : cardData.P02.isSubmitted && !isAnswer(userAnswer, correctAnswer)
      ? InputStatus.ERROR
      : InputStatus.ENABLE;
  };

  const isCorrectFinally = (): boolean => {
    return cardData.P02.answer?.every((val, index) => isAnswer(val, cardData.P02.solution[index]));
  };

  const handleSubmit = () => {
    if (!cardData.P02.isSubmitted) {
      const isCorrect = isCorrectFinally();
      setCardData(prev => ({ ...prev, P02: { ...prev.P02, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.P02.answer,
              isCorrect: isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageKey, userSubmission, isCorrect);
    } else {
      setIsAnswerOpen(!isAnswerOpen);
    }
  };

  const getButtonColor = () => {
    if (!cardData?.P02.isSubmitted) {
      return !cardData.P02.answer?.every(val => val) ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW;
    } else {
      return isAnswerOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW;
    }
  };

  const getSubmitLabel = () => (cardData.P02.isSubmitted ? (isAnswerOpen ? '답안 닫기' : '답안 보기') : '채점하기');
  const isSubmitDisabled = () => !cardData.P02.answer?.every(val => val) && !cardData.P02.isSubmitted;

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageKey);
    };
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitBtnColor={getButtonColor()}
      onSubmit={handleSubmit}
      submitLabel={getSubmitLabel()}
      submitDisabled={isSubmitDisabled()}
      useRound
      vAlign='start'
    >
      <Box hAlign='center' flexDirection='column'>
        <SvgIcon src={minus_arrow} title='빼기 화살표' width='448px' height='66px' />
        <Table color={EStyleTableTypes.DEFAULT} sizes={['150px', '150px', '150px']}>
          <TableMathCaption caption='덧셈 테이블' math={[]} hidden />
          <TBody>
            {[
              [515, 357],
              [438, 169],
            ].map((value, index) => (
              <TR>
                <TH scope='row' color={EStyleTableTypes.DEFAULT}>
                  {value[0]}
                </TH>
                <TH scope='row' color={EStyleTableTypes.DEFAULT}>
                  {value[1]}
                </TH>
                <TD hAlign='center' vAlign='middle' color={EStyleTableTypes.DEFAULT}>
                  <Input
                    width='133px'
                    textAlign='center'
                    value={cardData.P02.answer[index]}
                    onChange={e => handleChangeInput(index, e)}
                    ariaLabel={value[0] + '에' + value[1] + '을 뺀 값'}
                    readOnly={cardData.P02.isSubmitted}
                    status={handleInputStatus(cardData.P02.answer[index], cardData.P02.solution[index])}
                  />
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerOpen}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre useGap={false}>
              158, 269
            </Typography>
          </Box>

          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre useGap={false}>
              515-357=158, 438-169=269
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
