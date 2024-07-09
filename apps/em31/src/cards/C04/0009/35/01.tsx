import { useEffect, useState } from 'react';
import { Box, Input, IQuestionProps, Typography, SvgIcon, InputStatus, BottomSheet, Tag, ETagLine, EStyleButtonTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import headerIcon from '@/assets/icon/m_default_01.svg';
import usePageData from '@/hooks/usePageData';
import { C04_0009_35 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(C04_0009_35);
  const [isShow, setShow] = useState<boolean>(false);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  const handleInputChangeEvent = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer3: value } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer4: value } }));
    } else if (subKey === 5) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer5: value } }));
    } else if (subKey === 6) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer6: value } }));
    } else if (subKey === 7) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer7: value } }));
    } else if (subKey === 8) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer8: value } }));
    }
    changeData('P01', 1, subKey, value);
  };

  const onGrade = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData.p01.answer1, cardData.p01.solution1);
      const isCorrect2 = isAnswer(cardData.p01.answer2, cardData.p01.solution2);
      const isCorrect3 = isAnswer(cardData.p01.answer3, cardData.p01.solution3);
      const isCorrect4 = isAnswer(cardData.p01.answer4, cardData.p01.solution4);

      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p01.answer3,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p01.answer4,
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p01.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p01.answer4,

            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
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
      ],
    },
  ];

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        <Box>
          <Box display='inline-flex'>
            수 카드
            <Box background='yellow' hAlign='center' width={'8px'} height={'48px'} marginLeft={'5px'} marginRight={'5px'}>
              3
            </Box>
            ,
            <Box background='yellow' hAlign='center' width={'8px'} height={'48px'} marginRight={'5px'}>
              7
            </Box>
            ,
            <Box background='yellow' hAlign='center' width={'8px'} height={'48px'} marginRight={'5px'}>
              9
            </Box>
          </Box>
          를 한 번씩만 이용하여 계산 결과가 가장 큰 곱셈식을 만들어 계산해 보세요.
        </Box>
      </>
    ),
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p01.answer1 && cardData.p01.answer2 && cardData.p01.answer3 && cardData.p01.answer4)}
      submitBtnColor={
        !(cardData.p01.answer1 && cardData.p01.answer2 && cardData.p01.answer3 && cardData.p01.answer4)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      onSubmit={onGrade}
      vAlign='flex-start'
      useRound
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' useRound padding='20px 44px'>
          <Input
            type='number'
            textAlign='start'
            width='57px'
            value={cardData.p01.answer1}
            onChange={e => handleInputChangeEvent(1, e.target.value)}
            maxLength={1}
            readOnly={cardData.p01.isSubmitted}
            ariaLabel='두자리수의 십의 자리의 답'
            status={
              !cardData.p01.isSubmitted
                ? !cardData.p01.answer1
                : !isAnswer(cardData.p01.answer1, cardData.p01.solution1)
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
          />{' '}
          <Input
            type='number'
            textAlign='start'
            width='57px'
            value={cardData.p01.answer2}
            onChange={e => handleInputChangeEvent(2, e.target.value)}
            maxLength={1}
            readOnly={cardData.p01.isSubmitted}
            ariaLabel='두자리수의 일의 자리의 답'
            status={
              !cardData.p01.isSubmitted
                ? !cardData.p01.answer2
                : !isAnswer(cardData.p01.answer2, cardData.p01.solution2)
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
          />
          <Typography>×</Typography>
          <Input
            type='number'
            textAlign='start'
            width='57px'
            value={cardData.p01.answer3}
            onChange={e => handleInputChangeEvent(3, e.target.value)}
            maxLength={1}
            readOnly={cardData.p01.isSubmitted}
            ariaLabel='한자리수의 일의 자리의 답'
            status={
              !cardData.p01.isSubmitted
                ? !cardData.p01.answer2
                : !isAnswer(cardData.p01.answer3, cardData.p01.solution3)
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
          />
          <Typography>=</Typography>
          <Input
            type='number'
            textAlign='start'
            width='122px'
            value={cardData.p01.answer4}
            onChange={e => handleInputChangeEvent(4, e.target.value)}
            maxLength={4}
            readOnly={cardData.p01.isSubmitted}
            ariaLabel='곱셈식의 가장 큰 수의 답'
            status={
              !cardData.p01.isSubmitted
                ? !cardData.p01.answer4
                : !isAnswer(cardData.p01.answer4, cardData.p01.solution4)
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
          />
        </Box>
      </Box>

      <BottomSheet height={'50%'} show={isShow} bottomSheetTargetId={'targetContainer'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>7, 3, 9, 657</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography usePre>
                큰 수 2개를 곱해지는 수의 십의 자리와 곱하는 수의 일의 자리에 놓아 만든 곱셈식을 계산해 보면 93×7=651, 73×9=657입니다.
                {'\n'}따라서 계산 결과가 가장 큰 곱셈식은 73×9=657입니다.
              </Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
