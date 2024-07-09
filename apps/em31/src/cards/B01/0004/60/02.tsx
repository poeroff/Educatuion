import styled from '@emotion/styled';

import {
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleTableTypes,
  Typography,
  Input,
  Label,
  IQuestionProps,
  TableMathCaption,
  TMainHeaderInfoTypes,
  BottomSheet,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TR,
  Table,
  Tag,
  TMarkType,
  ETagLine,
  EStyleFontSizes,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getInputStatus } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect, useMemo, useState } from 'react';
import { C01_0004_60 } from './store';
import backgroundImg from '@/assets/example/EM-010/MC31108.png';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C01_0004_60);

  const answers = ['1216'];
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [mark, setMark] = useState<TMarkType>('none');

  const [value, setValue] = useState<string>('');

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };

  const isAnswer1Correct = useMemo(() => cardData.p02.input1.join('') === answers[0], [cardData.p02.input1]);

  const isAllCorrect = useMemo(() => isAnswer1Correct, [isAnswer1Correct]);

  useEffect(() => {
    if (cardData.p02.isSubmitted) {
      setMark(isAllCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p02.isSubmitted, isAllCorrect]);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark,
    markSize: 'middle',
    text: (
      <>
        <Label value='2' type='icon' />두 수의 합을 구해 보세요.
      </>
    ),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: [''],
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
            input1: userSubmissionList[0].inputData[0]?.value || cardData.p02.input1,
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
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

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isAllCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p02.input1,
            isAnswer: true,
            isCorrect: isAnswer1Correct,
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];
    submitDataWithResult('P02', userSubmission, isAllCorrect);
  };

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      submitAnswer();
    }
  };

  const handleListInputChange = (index: number, subKey: 1, e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = [...cardData.p02[`input${subKey}`]];
    newInput[index] = e.target.value;

    setCardData(prev => ({ ...prev, p02: { ...prev.p02, [`input${subKey}`]: newInput } }));
    changeData('P02', 1, subKey, newInput);
  };

  const getSubmitBtnColor = (isInputComplete: boolean, showAnswer: boolean): EStyleButtonTypes => {
    if (!isInputComplete) {
      return EStyleButtonTypes.SECONDARY;
    } else if (showAnswer) {
      return EStyleButtonTypes.GRAY;
    }
    return EStyleButtonTypes.YELLOW;
  };

  const isInputComplete = useMemo(() => {
    return cardData.p02.input1.every(value => value !== '');
  }, [cardData.p02.input1]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      vAlign='flex-start'
      useRound
      submitLabel={cardData.p02.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={getSubmitBtnColor(isInputComplete, showAnswer)}
      submitDisabled={!isInputComplete}
      onSubmit={handleSubmit}
    >
      <Box hAlign='start' justifyContent='flex-start' flexDirection='column'>
        <Box display='flex'>
          <Box borderRadius={10} background='yellow' hAlign='center' width={'180px'} height={'100px'} marginRight={'20px'}>
            <Typography size={EStyleFontSizes.LARGE}>829</Typography>
          </Box>
          <Box borderRadius={10} background='yellow' hAlign='center' width={'180px'} height={'100px'} marginRight={'20px'}>
            <Typography size={EStyleFontSizes.LARGE}>387</Typography>
          </Box>
        </Box>

        <Box marginTop='20px'>
          <Input
            width='263px'
            ariaLabel='답을 입력하세요'
            type='number'
            maxLength={5}
            value={cardData.p02.input1[0]}
            onChange={e => handleListInputChange(0, 1, e)}
            status={
              !cardData.p02.isSubmitted ? InputStatus.ENABLE : cardData.p02.input1[0].trim() === '1216' ? InputStatus.ENABLE : InputStatus.ERROR
            }
            readOnly={cardData.p02.isSubmitted}
          />
        </Box>
      </Box>

      <BottomSheet height={'50%'} show={showAnswer} bottomSheetTargetId='targetContainer'>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>1216</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <BoxWrap marginTop='66px'>
              <Box hAlign='center' flexDirection='column' useRound>
                <Table color={EStyleTableTypes.MATH} sizes={['20%', '20%', '20%', '20%']}>
                  <TableMathCaption caption='세로셈' math={['829', '+', '387']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>백의 자리</TH>
                      <TH scope='col'>천의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR>
                      <TD>9</TD>
                      <TD>2</TD>
                      <TD>8</TD>
                      <TD></TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>7</TD>
                      <TD>8</TD>
                      <TD>3</TD>
                      <TD></TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>6</TD>
                      <TD>1</TD>
                      <TD>2</TD>
                      <TD>1</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>

              <Box position='absolute' top='60px' left='112px'>
                <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-pink-500)'>
                  1
                </Typography>
              </Box>

              <Box position='absolute' top='60px' left='164px'>
                <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-pink-500)'>
                  1
                </Typography>
              </Box>
            </BoxWrap>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const QuestionBox = styled.div`
  width: 292px;
  height: 70px;
  padding: 0 7.52px 0 17.52px;

  display: flex;
  align-items: center;

  background: url(${backgroundImg}) no-repeat;
  background-size: 292px 74px;

  > span + span {
    margin-left: 130px;
  }
`;

export default P02;
