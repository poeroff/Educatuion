import { useEffect, useState } from 'react';

import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleTableTypes,
  ETagLine,
  IQuestionProps,
  Image,
  Input,
  InputStatus,
  SvgIcon,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TR,
  Table,
  TableMathCaption,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import headerIcon from '@/assets/icon/m_default_01.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C01_0005_42 } from './store';

const P01 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(C01_0005_42);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />세 자리 수가 쓰인 카드 2장에 얼룩이 생겼습니다. 빨간색 카드에 쓰인 수가 더 크고 두 수의 차가 362일 때,
        각각의 카드에 쓰인 수를 구해 보세요.
      </>
    ),
    markSize: 'middle',
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
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

  const isExperessionCorrect = (answer: string, solution: string | string[]) => {
    // 숫자 사이의 공백이 있다면 false 반환
    if (/\d\s+\d/.test(answer)) {
      return false;
    }

    // 입력한 값의 모든 공백을 제거
    const normalizedAnswer = answer.replace(/\s+/g, '');

    // solution이 배열인 경우, 배열의 요소 중 하나라도 일치하면 true 반환
    if (Array.isArray(solution)) {
      return solution.some(sol => normalizedAnswer === sol);
    }

    // solution이 단일 문자열인 경우, 문자열과 일치하는지 확인
    return normalizedAnswer === solution;
  };

  const isAnswerUnfilled = () => {
    if (isNotEmptyString(cardData.p01.answer1) && isNotEmptyString(cardData.p01.answer2)) {
      return false;
    } else {
      return true;
    }
  };

  const setSubmitBtnColor = () => {
    if (isAnswerUnfilled()) {
      return EStyleButtonTypes.SECONDARY;
    } else {
      if (isShow) {
        return EStyleButtonTypes.GRAY;
      } else {
        return EStyleButtonTypes.YELLOW;
      }
    }
  };

  const setSubmitLabel = () => {
    if (cardData.p01.isSubmitted && isShow) {
      return '답안닫기';
    } else if (cardData.p01.isSubmitted && !isShow) {
      return '답안보기';
    } else {
      return '채점하기';
    }
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShow(show => !show);
      return;
    }

    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        isCorrect: cardData.p01.isCorrect1 && cardData.p01.isCorrect2,
        isSubmitted: true,
      },
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer1,
            isCorrect: cardData.p01.isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p01.answer2,
            isCorrect: cardData.p01.isCorrect2,
          },
        ],
        isCorrect: cardData.p01.isCorrect1 && cardData.p01.isCorrect2,
      },
    ];
    submitDataWithResult('P01', userSubmission, cardData.p01.isCorrect);
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
            isCorrect1: isSubmitted ? userSubmissionList[0].inputData[0]?.isCorrect : cardData.p01.isCorrect1,
            isCorrect2: isSubmitted ? userSubmissionList[0].inputData[1]?.isCorrect : cardData.p01.isCorrect2,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({
        ...prev,
        p01: {
          ...prev.p01,
          answer1: value,
          isCorrect1: isExperessionCorrect(value, cardData.p01.solution1),
        },
      }));
    } else if (subKey === 2) {
      setCardData(prev => ({
        ...prev,
        p01: {
          ...prev.p01,
          answer2: value,
          isCorrect2: isExperessionCorrect(value, cardData.p01.solution2),
        },
      }));
    }
    changeData('P01', 1, subKey, value);
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
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={setSubmitLabel()}
      onSubmit={handleSubmit}
      submitBtnColor={setSubmitBtnColor()}
      submitDisabled={isAnswerUnfilled()}
      useRound
    >
      <BoxWrap justifyContent='center' alignItems='center' paddingTop={20}>
        <Box useFull hAlign='center'>
          <Image
            src={'/B01/0005/30/DEC311004.png'}
            height='60px'
            alt='백의 자리와 일의 자리에 얼룩이 있고, 십의 자리 숫자가 1인 파란색 카드가 있습니다. 백의 자리가 6이고 십의 자리에 얼룩이 있고 일의 자리가 4인 빨간색 카드가 있습니다.'
          />
        </Box>
      </BoxWrap>

      <Box useFull hAlign='start' justifyContent='flex-start' flexDirection='column'>
        <Box marginTop='40px'>
          <Typography>파란색 카드</Typography>
          <Input
            status={
              !cardData.p01.answer1
                ? InputStatus.DEFAULT
                : cardData.p01.isSubmitted && !cardData.p01.isCorrect1
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            readOnly={cardData.p01.isSubmitted}
            value={cardData.p01.answer1}
            onChange={e => handleChange(1, e.target.value)}
            type='number'
            width='263px'
            ariaLabel='답을 입력하세요'
          />
        </Box>
        <Box marginTop='20px'>
          <Typography>빨간색 카드</Typography>
          <Input
            status={
              !cardData.p01.answer2
                ? InputStatus.DEFAULT
                : cardData.p01.isSubmitted && !cardData.p01.isCorrect2
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            readOnly={cardData.p01.isSubmitted}
            value={cardData.p01.answer2}
            onChange={e => handleChange(2, e.target.value)}
            type='number'
            width='263px'
            ariaLabel='답을 입력하세요'
          />
        </Box>
      </Box>

      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>312, 674</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Typography>파란색 카드에 쓰인 수를 ㉠1㉡, 빨간색 카드에 쓰인 수를 6㉢4라고 하면 6㉢4-㉠1㉡=362 입니다.</Typography>
            <BoxWrap marginTop='30px'>
              <Box hAlign='center' marginLeft={20} flexDirection='row' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['26', '+', '9']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR>
                      <TD>4</TD>
                      <TD>㉢</TD>
                      <TD>6</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>㉡</TD>
                      <TD>1</TD>
                      <TD>㉠</TD>
                      <TD>-</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>2</TD>
                      <TD>6</TD>
                      <TD>3</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
                <Box hAlign='center' marginLeft={100} flexDirection='column'>
                  <Typography>4-㉡=2, ㉡=2</Typography>
                  <Typography>㉢-1=6, ㉢=7</Typography>
                  <Typography>6-㉠=3, ㉠=3</Typography>
                </Box>
              </Box>
            </BoxWrap>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};
export default P01;