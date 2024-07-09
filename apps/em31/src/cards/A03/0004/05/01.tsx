import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import styled from '@emotion/styled';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  Image,
  Input,
  InputStatus,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A03_0004_05 } from './store';

const P01 = () => {
  const [isShow, setShow] = useState(false);
  const [cardData, setCardData] = useRecoilState(A03_0004_05);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'write',
    headerText: '문제',
  };

  const questionInfo = {
    text: <>그림을 보고 곱셈식과 나눗셈식으로 나타내 보세요.</>,
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
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 5,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 6,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 7,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 8,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const isAnswerUnfilled = () => {
    let flag = false;
    cardData.p01.answer.forEach(ans => {
      if (!isNotEmptyString(ans)) {
        flag = true;
      }
    });
    return flag;
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

    const isCorrect1 = cardData.p01.answer[0] === cardData.p01.solution[0];
    const isCorrect2 = cardData.p01.answer[1] === cardData.p01.solution[1];
    const isCorrect3 = cardData.p01.answer[2] === cardData.p01.solution[2];
    const isCorrect4 = cardData.p01.answer[3] === cardData.p01.solution[3];
    const isCorrect5 = cardData.p01.answer[4] === cardData.p01.solution[4];
    const isCorrect6 = cardData.p01.answer[5] === cardData.p01.solution[5];
    const isCorrect7 = cardData.p01.answer[6] === cardData.p01.solution[6];
    const isCorrect8 = cardData.p01.answer[7] === cardData.p01.solution[7];
    const isAllCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4 && isCorrect5 && isCorrect6 && isCorrect7 && isCorrect8;

    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        isCorrect: isAllCorrect,
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
            value: cardData.p01.answer[0],
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p01.answer[1],
            isCorrect: isCorrect2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p01.answer[2],
            isCorrect: isCorrect3,
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.p01.answer[3],
            isCorrect: isCorrect4,
          },
          {
            subKey: 5,
            type: 'TEXT',
            value: cardData.p01.answer[4],
            isCorrect: isCorrect5,
          },
          {
            subKey: 6,
            type: 'TEXT',
            value: cardData.p01.answer[5],
            isCorrect: isCorrect6,
          },
          {
            subKey: 7,
            type: 'TEXT',
            value: cardData.p01.answer[6],
            isCorrect: isCorrect7,
          },
          {
            subKey: 8,
            type: 'TEXT',
            value: cardData.p01.answer[7],
            isCorrect: isCorrect8,
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];

    submitDataWithResult('P01', userSubmission, isAllCorrect);
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
            answer:
              [
                userSubmissionList[0].inputData[0]?.value,
                userSubmissionList[0].inputData[1]?.value,
                userSubmissionList[0].inputData[2]?.value,
                userSubmissionList[0].inputData[3]?.value,
                userSubmissionList[0].inputData[4]?.value,
                userSubmissionList[0].inputData[5]?.value,
                userSubmissionList[0].inputData[6]?.value,
                userSubmissionList[0].inputData[7]?.value,
              ] || cardData.p01.answer,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    const answerList = [...cardData.p01.answer];
    answerList[subKey - 1] = value;

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: answerList } }));
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={setSubmitLabel()}
      onSubmit={handleSubmit}
      submitBtnColor={setSubmitBtnColor()}
      submitDisabled={isAnswerUnfilled()}
      useRound
      vAlign='flex-start'
    >
      <BoxWrap boxGap={48} tabIndex={102}>
        <Box type='dashed' padding='48px' borderStyle='solid' borderRadius='16px'>
          <Image src={'/A03/0004/05/A-EM31-030004-0501.png'} alt='튜브가 24개 놓여져 있습니다.' width='303px' height='265px' />
        </Box>
        <Box useFull position='relative'>
          <Box position='absolute' left='185px' top='45px'>
            <Input width='80px' value={'24'} disabled ariaLabel='24' />
          </Box>
          <Box position='absolute' left='140px' top='125px'>
            <Input width='65px' value={'6'} disabled ariaLabel='6' />
          </Box>
          <Box position='absolute' left='250px' top='125px'>
            <Input width='65px' value={'4'} disabled ariaLabel='4' />
          </Box>
          <Box position='absolute' left='104px' top='205px'>
            <Box marginBottom='27px' vAlign='center' gap='6px'>
              <Input width='65px' value={'6'} disabled ariaLabel='6' />
              <Typography useGap={false}>×</Typography>
              <Input width='65px' value={'4'} disabled ariaLabel='4' />
              <Typography useGap={false}>=</Typography>
              <Input
                width='65px'
                status={
                  !cardData.p01.answer[0]
                    ? InputStatus.DEFAULT
                    : cardData.p01.isSubmitted && cardData.p01.answer[0] !== cardData.p01.solution[0]
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                type='number'
                value={cardData.p01.answer[0]}
                readOnly={cardData.p01.isSubmitted}
                onChange={e => handleChange(1, e.target.value)}
                maxLength={2}
                ariaLabel={'답을 입력해 주세요.'}
              />
            </Box>
            <Box marginBottom='27px' vAlign='center' gap='6px'>
              <Input
                width='65px'
                status={
                  !cardData.p01.answer[1]
                    ? InputStatus.DEFAULT
                    : cardData.p01.isSubmitted && cardData.p01.answer[1] !== cardData.p01.solution[1]
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                type='number'
                value={cardData.p01.answer[1]}
                readOnly={cardData.p01.isSubmitted}
                onChange={e => handleChange(2, e.target.value)}
                maxLength={2}
                ariaLabel={'답을 입력해 주세요.'}
              />
              <Typography useGap={false}>×</Typography>
              <Input
                width='65px'
                status={
                  !cardData.p01.answer[2]
                    ? InputStatus.DEFAULT
                    : cardData.p01.isSubmitted && cardData.p01.answer[2] !== cardData.p01.solution[2]
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                type='number'
                value={cardData.p01.answer[2]}
                readOnly={cardData.p01.isSubmitted}
                onChange={e => handleChange(3, e.target.value)}
                maxLength={2}
                ariaLabel={'답을 입력해 주세요.'}
              />
              <Typography useGap={false}>=</Typography>
              <Input
                width='65px'
                status={
                  !cardData.p01.answer[3]
                    ? InputStatus.DEFAULT
                    : cardData.p01.isSubmitted && cardData.p01.answer[3] !== cardData.p01.solution[3]
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                type='number'
                value={cardData.p01.answer[3]}
                readOnly={cardData.p01.isSubmitted}
                onChange={e => handleChange(4, e.target.value)}
                maxLength={2}
                ariaLabel={'답을 입력해 주세요.'}
              />
            </Box>

            <Box marginBottom='27px' vAlign='center' gap='6px'>
              <Input width='65px' value={'24'} disabled ariaLabel='24' />
              <Typography useGap={false}>÷</Typography>
              <Input width='65px' value={'6'} disabled ariaLabel='6' />
              <Typography useGap={false}>=</Typography>
              <Input
                width='65px'
                status={
                  !cardData.p01.answer[4]
                    ? InputStatus.DEFAULT
                    : cardData.p01.isSubmitted && cardData.p01.answer[4] !== cardData.p01.solution[4]
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                type='number'
                value={cardData.p01.answer[4]}
                readOnly={cardData.p01.isSubmitted}
                onChange={e => handleChange(5, e.target.value)}
                maxLength={2}
                ariaLabel={'답을 입력해 주세요.'}
              />
            </Box>
            <Box marginBottom='27px' vAlign='center' gap='6px'>
              <Input
                width='65px'
                status={
                  !cardData.p01.answer[5]
                    ? InputStatus.DEFAULT
                    : cardData.p01.isSubmitted && cardData.p01.answer[5] !== cardData.p01.solution[5]
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                type='number'
                value={cardData.p01.answer[5]}
                readOnly={cardData.p01.isSubmitted}
                onChange={e => handleChange(6, e.target.value)}
                maxLength={2}
                ariaLabel={'답을 입력해 주세요.'}
              />
              <Typography useGap={false}>÷</Typography>
              <Input
                width='65px'
                status={
                  !cardData.p01.answer[6]
                    ? InputStatus.DEFAULT
                    : cardData.p01.isSubmitted && cardData.p01.answer[6] !== cardData.p01.solution[6]
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                type='number'
                value={cardData.p01.answer[6]}
                readOnly={cardData.p01.isSubmitted}
                onChange={e => handleChange(7, e.target.value)}
                maxLength={2}
                ariaLabel={'답을 입력해 주세요.'}
              />
              <Typography useGap={false}>=</Typography>
              <Input
                width='65px'
                status={
                  !cardData.p01.answer[7]
                    ? InputStatus.DEFAULT
                    : cardData.p01.isSubmitted && cardData.p01.answer[7] !== cardData.p01.solution[7]
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                type='number'
                value={cardData.p01.answer[7]}
                readOnly={cardData.p01.isSubmitted}
                onChange={e => handleChange(8, e.target.value)}
                maxLength={2}
                ariaLabel={'답을 입력해 주세요.'}
              />
            </Box>
          </Box>
          <BackgroundImage>
            <Image src={'/A03/0004/05/A-EM31-030004-0501-2.png'} alt='사다리' width='331px' height='550px' />
          </BackgroundImage>
        </Box>
      </BoxWrap>
      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        marginTop={200}
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
              <Typography>24, 4, 6, 24, 4, 24, 4, 6</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>6×4=24</Typography>
              <Typography>4×6=24</Typography>
              <Typography>24÷6=4</Typography>
              <Typography>24÷4=6</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;

export const BackgroundImage = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 65px;
`;
