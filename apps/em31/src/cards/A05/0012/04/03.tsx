import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Container } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Box, EStyleButtonTypes, IQuestionProps, Input, Typography, BottomSheet, Tag, ETagLine, Label, SvgIcon, InputStatus, ESvgType } from '@maidt-cntn/ui';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import empty_square from '@/assets/icon/math_empty_square.svg';

import { A05001204_Atom } from './store';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A05001204_Atom);
  const [isShow, setShow] = useState<boolean>(false);

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
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const onCalculate = () => {
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p03.answer1.trim() === cardData.p03.solution1;
      const isCorrect2 = cardData.p03.answer2.trim() === cardData.p03.solution2;
      const isCorrect3 = cardData.p03.answer3.trim() === cardData.p03.solution3;
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect, isCorrect1, isCorrect2, isCorrect3 }, }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p03.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p03.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P03', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p03.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p03.answer3,
            isCorrect1: userSubmissionList[0].inputData[0]?.isCorrect || cardData.p03.isCorrect1,
            isCorrect2: userSubmissionList[0].inputData[1]?.isCorrect || cardData.p03.isCorrect2,
            isCorrect3: userSubmissionList[0].inputData[2]?.isCorrect || cardData.p03.isCorrect3,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer3: value } }));
    }
    changeData('P03', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P03');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='middle' value='3' />
        <SvgIcon
            type={ESvgType.IMG}
            alt='빈칸'
            src={empty_square}
            size='43px'
            style={{ display: 'inline-flex', verticalAlign: 'middle', position: 'relative', top: '7px' }}
          />&nbsp;안에 알맞은 수를 써넣으세요.
      </>
    ),
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      vAlign='flex-start'
      background={'var(--color-white)'}
      onSubmit={onCalculate}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(
        cardData.p03.answer1 &&
        cardData.p03.answer2 &&
        cardData.p03.answer3
      )}
      submitBtnColor={!(
        cardData.p03.answer1 &&
        cardData.p03.answer2 &&
        cardData.p03.answer3
      ) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      useRound
    >
      <Box display='flex' justifyContent='center' gap='50px' useFull>
        <Box marginBottom='24px'>
            <Typography>2 km 50 m=</Typography>
            <Input
              width='130px'
              type='number'
              value={cardData.p03.answer1}
              onChange={event => handleChange(1, event.target.value)}
              status={cardData.p03.isSubmitted && !cardData.p03.isCorrect1 ? InputStatus.ERROR : InputStatus.ENABLE}
              ariaLabel='2 km 50 m= 답 입력란'
              readOnly={cardData.p03.isSubmitted}
            />
            <Typography fontWeight='900'>m</Typography>
          </Box>
          <Box marginBottom='24px'>
            <Typography>3450 m=</Typography>
            <Input
              width='60px'
              type='number'
              value={cardData.p03.answer2}
              onChange={event => handleChange(2, event.target.value)}
              status={cardData.p03.isSubmitted && !cardData.p03.isCorrect2 ? InputStatus.ERROR : InputStatus.ENABLE}
              ariaLabel='3450m km 답 입력란'
              readOnly={cardData.p03.isSubmitted}
            />
            <Typography fontWeight='900'>km</Typography>
            <Input
              width='90px'
              type='number'
              value={cardData.p03.answer3}
              onChange={event => handleChange(3, event.target.value)}
              status={cardData.p03.isSubmitted && !cardData.p03.isCorrect3 ? InputStatus.ERROR : InputStatus.ENABLE}
              ariaLabel='3450m m 답 입력란'
              readOnly={cardData.p03.isSubmitted}
            />
            <Typography fontWeight='900'>m</Typography>
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
              <Typography>{'2050, 3, 450'}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>
              {' 1 km=1000 m임을 이용합니다.'}<br/>{'2 km 50 m=2050 m'}<br/>{'3450 m=3 km 450 m'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
