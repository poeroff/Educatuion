import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  IQuestionProps,
  Label,
  TD,
  BoxWrap,
  Input,
  Box,
  Table,
  EStyleTableTypes,
  TableMathCaption,
  THead,
  TR,
  TH,
  TBody,
  TFoot,
  Typography,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleButtonTypes,
  InputStatus,
} from '@maidt-cntn/ui';
import { isNotEmptyString, isAnswer, isNumber } from '@maidt-cntn/util/CommonUtil';
import { Container } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { B01_0006_60 } from '@/cards/B01/0006/60/store';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(B01_0006_60);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='1' type='icon' />두 수의 차를 구해 보세요.
      </>
    ),
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const isBtnDisabled = () => {
    return !isNotEmptyString(cardData.p02.answer);
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
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setShowAnswer(!showAnswer);
    } else {
      const isCorrect = isAnswer(cardData.p02.answer, cardData.p02.solution);
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    if (isNumber(value)) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: value } }));
      changeData('P02', 1, 1, value);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P02');
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
      background={'var(--color-white)'}
      onSubmit={handleSubmit}
      submitLabel={!cardData.p02.isSubmitted ? '채점하기' : !showAnswer ? '답안 보기' : '답안 닫기'}
      submitDisabled={isBtnDisabled()}
      submitBtnColor={
        isBtnDisabled()
          ? EStyleButtonTypes.SECONDARY
          : !cardData.p02.isSubmitted || !showAnswer
          ? EStyleButtonTypes.YELLOW
          : EStyleButtonTypes.DEFAULT
      }
      useRound
      vAlign='flex-start'
    >
      <Box useFull hAlign='start' justifyContent='flex-start' flexDirection='column' height={'224px'}>
        <Box justifyContent={'center'} type='paint' display={'flex'} flexDirection={'row'} useRound gap={24}>
          <Box background='yellow' textAlign='center' useRound marginBottom={36} marginTop={36}>
            <Box padding='8px 12px' lineHeight='54px' fontSize='36px' whiteSpace='nowrap'>
              <Typography weight={'var(--font-weight-bold)'} ariaLabel='첫번째 카드 : 528'>
                528
              </Typography>
            </Box>
          </Box>
          <Box background='yellow' textAlign='center' useRound marginBottom={36} marginTop={36}>
            <Box padding='8px 12px' lineHeight='54px' fontSize='36px' whiteSpace='nowrap'>
              <Typography weight={'var(--font-weight-bold)'} ariaLabel='두번째 카드 : 864'>
                864
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box marginTop='20px'>
          <Input
            type='number'
            width='263px'
            value={cardData.p02.answer}
            maxLength={100}
            placeholder=''
            onChange={handleChange}
            status={
              !isNotEmptyString(cardData.p02.answer)
                ? InputStatus.DEFAULT
                : cardData.p02.isSubmitted && !isAnswer(cardData.p02.answer, cardData.p02.solution)
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            readOnly={cardData.p02.isSubmitted}
            ariaLabel='답란'
          />
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' show={showAnswer} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>336</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <BoxWrap>
              <Box flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['864', '-', '528']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>백의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR isMathSolution>
                      <TD>10</TD>
                      <TD>5</TD>
                      <TD></TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>4</TD>
                      <TD isMathCheck>6</TD>
                      <TD>8</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>8</TD>
                      <TD>2</TD>
                      <TD>5</TD>
                      <TD>-</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>6</TD>
                      <TD>3</TD>
                      <TD>3</TD>
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
export default P02;
