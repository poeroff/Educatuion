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

const P04 = () => {
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
    if (cardData.p04.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p04.answer1.trim() === cardData.p04.solution1;
      const isCorrect2 = cardData.p04.answer2.trim() === cardData.p04.solution2;
      const isCorrect3 = cardData.p04.answer3.trim() === cardData.p04.solution3;
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true, isCorrect: isCorrect, isCorrect1, isCorrect2, isCorrect3 }, }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p04.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p04.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p04.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P04', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P04')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p04.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p04.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p04.answer3,
            isCorrect1: userSubmissionList[0].inputData[0]?.isCorrect || cardData.p04.isCorrect1,
            isCorrect2: userSubmissionList[0].inputData[1]?.isCorrect || cardData.p04.isCorrect2,
            isCorrect3: userSubmissionList[0].inputData[2]?.isCorrect || cardData.p04.isCorrect3,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P04', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer3: value } }));
    }
    changeData('P04', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P04');
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
        <Label type='icon' size='middle' value='4' />
        <SvgIcon
            type={ESvgType.IMG}
            alt='빈칸'
            src={empty_square}
            size='43px'
            style={{ display: 'inline-flex', verticalAlign: 'middle', position: 'relative', top: '7px' }}
          />&nbsp;안에 알맞은 수를 써넣으세요.
      </>
    ),
    mark: cardData.p04.isSubmitted ? (cardData.p04.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      vAlign='flex-start'
      background={'var(--color-white)'}
      onSubmit={onCalculate}
      submitLabel={cardData.p04.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(
        cardData.p04.answer1 &&
        cardData.p04.answer2 &&
        cardData.p04.answer3
      )}
      submitBtnColor={!(
        cardData.p04.answer1 &&
        cardData.p04.answer2 &&
        cardData.p04.answer3
      ) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      useRound
    >
      <Box display='flex' justifyContent='center' gap='50px' useFull>
        <Box marginBottom='24px'>
            <Typography>1분 15초=</Typography>
            <Input
              width='90px'
              type='number'
              value={cardData.p04.answer1}
              onChange={event => handleChange(1, event.target.value)}
              status={cardData.p04.isSubmitted && !cardData.p04.isCorrect1 ? InputStatus.ERROR : InputStatus.ENABLE}
              ariaLabel='1분 15초= 답 입력란'
              readOnly={cardData.p04.isSubmitted}
            />
            <Typography fontWeight='900'>초</Typography>
          </Box>
          <Box marginBottom='24px'>
            <Typography>150초=</Typography>
            <Input
              width='60px'
              type='number'
              value={cardData.p04.answer2}
              onChange={event => handleChange(2, event.target.value)}
              status={cardData.p04.isSubmitted && !cardData.p04.isCorrect2 ? InputStatus.ERROR : InputStatus.ENABLE}
              ariaLabel='150초 분 답 입력란'
              readOnly={cardData.p04.isSubmitted}
            />
            <Typography fontWeight='900'>분</Typography>
            <Input
              width='90px'
              type='number'
              value={cardData.p04.answer3}
              onChange={event => handleChange(3, event.target.value)}
              status={cardData.p04.isSubmitted && !cardData.p04.isCorrect3 ? InputStatus.ERROR : InputStatus.ENABLE}
              ariaLabel='150초 초 답 입력란'
              readOnly={cardData.p04.isSubmitted}
            />
            <Typography fontWeight='900'>초</Typography>
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
              <Typography>{'75, 2, 30'}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>
              {'1분=60초임을 이용합니다.'}<br/>{'1분 15초=75초'}<br/>{'150초=2분 30초'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P04;
