import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { BottomSheet, Box, EStyleButtonTypes, ETagLine, IQuestionProps, Input, InputStatus, Label, Question, Tag, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { A01_0011_04 } from './store';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';
const P06 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0011_04);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <Box vAlign='baseline' fontSize='var(--font-size-28)' fontWeight='var(--font-weight-medium)' lineHeight='48px'>
        <Box marginRight={20}>[5~6]</Box>
        문구점에서 스케치북 1권은 813원, 자 1개는 489원에 할인하여 팝니다. 우진이는 용돈 1200원으로 스케치북 1권과 자 1개를 사려고 합니다. 물음에
        답하세요.
      </Box>
    ),
  };

  const question: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={6} />
        스케치북 1권과 자 1개를 사려면 얼마가 필요한가요?
      </>
    ),
    mark: getMarking(cardData.p06.isSubmitted, cardData.p06.isCorrect),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const onGrade = () => {
    if (cardData.p06.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData.p06.answer1, cardData.p06.solution1);
      const isCorrect2 = isAnswer(cardData.p06.answer2, cardData.p06.solution2);
      const isCorrect = isCorrect1 && isCorrect2;
      setCardData(prev => ({ ...prev, p06: { ...prev.p06, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p06.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p06.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P06', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P06')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p06: {
            ...prev.p06,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p06.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p06.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P06', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p06: { ...prev.p06, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p06: { ...prev.p06, answer2: value } }));
    }
    changeData('P06', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P06');
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
      headerInfo={null}
      questionInfo={questionInfo}
      vAlign='flex-start'
      background={'var(--color-white)'}
      onSubmit={onGrade}
      submitLabel={cardData.p06.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p06.answer1 && cardData.p06.answer2)}
      submitBtnColor={
        !(cardData.p06.answer1 && cardData.p06.answer2) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW
      }
      useRound
    >
      <Question text={question.text} type={question.type} mark={question.mark} />
      <Box hAlign='center'>
        <Box vAlign='baseline' flexDirection='column' marginTop='24px'>
          <Box hAlign='center'>
            <Label
              value={'식'}
              color='var(--color-yellow-800)'
              background='var(--color-yellow-100)'
              lineColor='var(--color-yellow-700)'
              marginRight={8}
            />
            <Input
              width='344px'
              textAlign='center'
              value={cardData.p06.answer1}
              maxLength={30}
              onChange={event => handleChange(1, event.target.value)}
              ariaLabel='식을 적어주세요.'
              readOnly={cardData.p06.isSubmitted}
              status={
                !cardData.p06.isSubmitted
                  ? InputStatus.DEFAULT
                  : !cardData.p06.solution1.includes(cardData.p06.answer1.trim().replace(/(\s*)/g, ''))
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
            />
          </Box>
          <Box hAlign='center' marginTop='8px'>
            <Label
              value={'답'}
              color='var(--color-yellow-800)'
              background='var(--color-yellow-100)'
              lineColor='var(--color-yellow-700)'
              marginRight={8}
            />
            <Input
              width='217px'
              textAlign='center'
              value={cardData.p06.answer2}
              onChange={event => handleChange(2, event.target.value)}
              ariaLabel='답을 적어주세요.'
              maxLength={6}
              readOnly={cardData.p06.isSubmitted}
              status={
                !cardData.p06.isSubmitted
                  ? InputStatus.DEFAULT
                  : cardData.p06.answer2 !== cardData.p06.solution2
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
            />
            <Typography>원</Typography>
          </Box>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={cardData.p06.isSubmitted && isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{`813 + 489 = 1302 또는 \n 489 + 813 = 1302 또는 \n 813 + 489 또는 489 + 813, \n 1302`}</Typography>
          </Box>
          <Box>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{`(스케치북 1개 가격) + (자 1개 가격)\n 813+489=1302(원)`}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P06;
