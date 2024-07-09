import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Input,
  Label,
  Table,
  EStyleTableTypes,
  TableMathCaption,
  Tag,
  Typography,
  THead,
  TR,
  TH,
  TBody,
  TD,
  TFoot,
  InputStatus,
  Image,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { B04_0002_50 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P06 = () => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B04_0002_50);

  const { userId } = useRecoilValue(studentAtom);

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p06: { ...prev.p06, answer1: value } }));
    }
    changeData('P06', 1, subKey, value);
  };
  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleSubmit = () => {
    const isCorrect1 = cardData.p06.answer1.trim() === cardData.p06.solution1;
    setCardData(prev => ({ ...prev, p06: { ...prev.p06, isSubmitted: true, isCorrect: isCorrect1 } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p06.answer1,
            isCorrect: isCorrect1,
          },
        ],
        isCorrect: isCorrect1,
      },
    ];
    submitDataWithResult('P06', userSubmission, isCorrect1);
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
      ],
    },
  ];

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
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P06', userSubmissionList, defaultSubmission, isSubmitted);
    }
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

  const headerInfo = null;

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={6} />
        빈칸에 알맞은 수를 써넣으세요.
      </>
    ),
    markSize: 'middle',
    mark: cardData.p06.isSubmitted ? (cardData.p06.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      onSubmit={cardData.p06.isSubmitted ? handleShowAnswer : handleSubmit}
      submitLabel={cardData.p06.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      background={'var(--color-white)'}
      useRound
      submitDisabled={!cardData.p06.answer1}
      submitBtnColor={!cardData.p06.answer1 ? EStyleButtonTypes.SECONDARY : showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
    >
      <BoxWrap justifyContent='center'>
        <Box type='dashed' hAlign='center' flexDirection='column' padding='24px 20px' useRound>
          <Box width={500} height={330}>
            <Box height={270}>
              <Image src='/B04/0002/50/B-EM31-040002-5006.png' />
              <Typography style={{ position: 'absolute', left: '390px', top: '60px' }} useGap={false}>
                10
              </Typography>
              <Typography style={{ position: 'absolute', left: '48%', top: '190px' }} useGap={false}>
                x9
              </Typography>
            </Box>
            <Input
              width='160px'
              marginLeft={260}
              ariaLabel='10×9의 값'
              value={cardData.p06.answer1}
              onChange={e => handleChange(1, e.target.value)}
              readOnly={cardData.p06.isSubmitted}
              status={
                !isNotEmptyString(cardData.p06.answer1)
                  ? InputStatus.DEFAULT
                  : cardData.p06.isSubmitted && !isAnswer(cardData.p06.answer1, cardData.p06.solution1)
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              type='number'
            />
          </Box>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' show={showAnswer} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>90</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <BoxWrap>
              <Box flexDirection='column' useRound>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['10', '×', '9']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR>
                      <TD>0</TD>
                      <TD>1</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>9</TD>
                      <TD></TD>
                      <TD>×</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>{cardData.p06.solution1_1}</TD>
                      <TD>{cardData.p06.solution1_2}</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
            </BoxWrap>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P06;
