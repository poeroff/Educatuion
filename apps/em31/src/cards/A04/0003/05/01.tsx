import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { IAnswer } from '@maidt-cntn/math/pages/EM-004-02';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { A04_0003_05 } from './store';

import {
  IQuestionProps,
  Label,
  TMainHeaderInfoTypes,
  TD,
  Input,
  InputStatus,
  EStyleButtonTypes,
  Box,
  Typography,
  Table,
  EStyleTableTypes,
  TableMathCaption,
  THead,
  TR,
  TH,
  TBody,
  TFoot,
  BottomSheet,
  Tag,
  ETagLine,
  Image,
} from '@maidt-cntn/ui';
import { areArraysEqualIgnoringCaseAndWhitespace, isAnswer, isNotEmptyString, isNumber } from '@maidt-cntn/util/CommonUtil';
import { Container, MathExpression } from '@maidt-cntn/ui/math';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A04_0003_05);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '12×4 계산하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={'ㄱ'} color='var(--color-white)' background='var(--color-grey-600)' />
        <MathExpression equation={'12×4를 계산하는 방법을 알아보세요.'} />
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const answer: IAnswer = {
    answer: ['8', '4'],
    description: ['일의 자리 수 2와 4를 곱한 2×4=8을 일의 자리에 씁니다.', '십의 자리 수 1과 4를 곱한 1×4=4를 십의 자리에 씁니다.'],
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', ''],
          isAnswer: true,
        },
      ],
    },
  ];

  const onSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShow(show => !show);
    } else {
      const isCorrect = areArraysEqualIgnoringCaseAndWhitespace(cardData.p01.answer, cardData.p01.solution);
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.p01.answer,
              isAnswer: true,
              isCorrect: isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number, value: string) => {
    if (isNumber(value)) {
      const currentAnswer = Array.isArray(cardData.p01.answer) ? cardData.p01.answer : [];
      const newData = [...currentAnswer];
      newData[index] = value;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: newData } }));
      changeData('P01', 1, 1, newData);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P01');
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
      useRound
      vAlign='flex-start'
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p01.answer.every(isNotEmptyString)}
      submitBtnColor={
        cardData.p01.answer.every(isNotEmptyString) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.GRAY
      }
      onSubmit={onSubmit}
    >
      <Box display='flex' justifyContent='center' gap='20px'>
        <Box type='dashed' padding='20px 44px' useRound key={1}>
          <Table color={EStyleTableTypes.MATH} bgColors={['blue']} sizes={['25%', '25%', '25%', '25%']} key={2}>
            <TableMathCaption caption='세로셈' math={['12', '×', '4']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>2</TD>
                <TD>1</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>4</TD>
                <TD></TD>
                <TD>×</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    type='number'
                    tabIndex={101}
                    value={cardData.p01.answer[0]}
                    onChange={event => handleChange(0, event.target.value)}
                    ariaLabel='일의자리, 답'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted ? true : false}
                    status={
                      isNotEmptyString(cardData.p01.answer[0])
                        ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[0], cardData.p01.solution[0])
                          ? InputStatus.ENABLE
                          : InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                  />
                </TD>
                <TD></TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>
        <Box>
          <Image src={'/A04/0003/05/A-EM31-040003-0501-2.png'} alt='세로셈 간 화살표 이미지' width='40px' height='auto' />
        </Box>
        <Box type='dashed' padding='20px 44px' useRound key={3}>
          <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']} key={4}>
            <TableMathCaption caption='세로셈' math={['12', '×', '4']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>2</TD>
                <TD bgColor={'var(--color-pink-200)'}>1</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD bgColor={'var(--color-pink-200)'}>4</TD>
                <TD></TD>
                <TD>×</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>8</TD>
                <TD bgColor={'var(--color-pink-200)'}>
                  <Input
                    type='number'
                    tabIndex={102}
                    value={cardData.p01.answer[1]}
                    onChange={event => handleChange(1, event.target.value)}
                    ariaLabel='십의자리, 답'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted ? true : false}
                    status={
                      isNotEmptyString(cardData.p01.answer[1])
                        ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[1], cardData.p01.solution[1])
                          ? InputStatus.ENABLE
                          : InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>
      </Box>
      <Box display='flex' justifyContent='center' gap='20px' height='100px'>
        <Box position='absolute' top='220px' left='132px'>
          <Image src={'/A04/0003/05/A-EM31-040003-0501.png'} alt='일의 자리 수 2와 4를 곱해요.' width='260px' height='auto' />
        </Box>
        <Box position='absolute' top='220px' left='662px'>
          <Image src={'/A04/0003/05/A-EM31-040003-0501-3.png'} alt='십의 자리 수 1과 4를 곱해요.' width='260px' height='auto' />
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            {answer.answer.map((a, index) => (
              <Typography key={index}>
                {a}
                {index === answer.answer.length - 1 ? '' : ','}
              </Typography>
            ))}
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            {answer.description.map((a, index) => (
              <Box key={index} marginTop='12px'>{`- ${a}`}</Box>
            ))}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
