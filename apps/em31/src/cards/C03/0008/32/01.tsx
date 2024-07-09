import { useEffect, useState, ChangeEvent } from 'react';
import { Box, Typography, Input, IQuestionProps, InputStatus, EStyleButtonTypes, BottomSheet, Tag, ETagLine, SvgIcon, BoxWrap } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import headerIcon from '@/assets/icon/m_default_01.svg';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { C03_0008_32 } from './store';

const P01 = () => {
  const { changeData, initData, saveData, submitDataWithResult } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C03_0008_32);
  const [isShow, setShow] = useState<boolean>(false);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='center'>
        <SvgIcon src={headerIcon} size='48px' />
        <Typography>나눗셈의 몫을 구해 보세요.</Typography>
      </Box>
    ),
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: [['', '', '', '']],
          isAnswer: true,
        },
      ],
    },
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setCardData(prev => {
      const newAnswer1 = [...prev.p01.answer];
      newAnswer1[index] = e.target.value;
      return { ...prev, p01: { ...prev.p01, answer: newAnswer1 } };
    });
    changeData('P01', 1, index + 1, e.target);
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShow(show => !show);
    } else {
      const isCorrect = cardData.p01.answer.every((value, index) => value === cardData.p01.solution[index]);
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
      vAlign='flex-start'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      submitBtnColor={
        cardData.p01.isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.YELLOW
          : cardData.p01.answer.every(value => isNotEmptyString(value))
          ? EStyleButtonTypes.YELLOW
          : EStyleButtonTypes.SECONDARY
      }
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p01.answer.every(value => isNotEmptyString(value))}
      onSubmit={handleSubmit}
    >
      <BoxWrap>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Box marginTop='24px' marginBottom='24px'>
            <Typography>16 ÷ 2 =</Typography>
            <Input
              width='130px'
              value={cardData.p01.answer[0]}
              onChange={event => handleChange(event, 0)}
              ariaLabel='16÷2의 값'
              status={
                isNotEmptyString(cardData.p01.answer[0])
                  ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[0], cardData.p01.solution[0])
                    ? InputStatus.ENABLE
                    : InputStatus.ERROR
                  : InputStatus.DEFAULT
              }
              tabIndex={102}
              type='number'
              readOnly={cardData.p01.isSubmitted}
            />
          </Box>
        </Box>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Box marginTop='24px' marginBottom='24px'>
            <Typography>32 ÷ 8 =</Typography>
            <Input
              width='130px'
              value={cardData.p01.answer[1]}
              onChange={event => handleChange(event, 1)}
              ariaLabel='32÷8의 값'
              status={
                isNotEmptyString(cardData.p01.answer[1])
                  ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[1], cardData.p01.solution[1])
                    ? InputStatus.ENABLE
                    : InputStatus.ERROR
                  : InputStatus.DEFAULT
              }
              tabIndex={103}
              type='number'
              readOnly={cardData.p01.isSubmitted}
            />
          </Box>
        </Box>
      </BoxWrap>
      <BoxWrap marginTop={24}>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Box marginTop='24px' marginBottom='24px'>
            <Typography>30 ÷ 5 =</Typography>
            <Input
              width='130px'
              value={cardData.p01.answer[2]}
              onChange={event => handleChange(event, 2)}
              ariaLabel='30÷5의 값'
              status={
                isNotEmptyString(cardData.p01.answer[2])
                  ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[2], cardData.p01.solution[2])
                    ? InputStatus.ENABLE
                    : InputStatus.ERROR
                  : InputStatus.DEFAULT
              }
              tabIndex={104}
              type='number'
              readOnly={cardData.p01.isSubmitted}
            />
          </Box>
        </Box>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Box marginTop='24px' marginBottom='24px'>
            <Typography>72 ÷ 9 =</Typography>
            <Input
              width='130px'
              value={cardData.p01.answer[3]}
              onChange={event => handleChange(event, 3)}
              ariaLabel='72÷9의 값'
              status={
                isNotEmptyString(cardData.p01.answer[3])
                  ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[3], cardData.p01.solution[3])
                    ? InputStatus.ENABLE
                    : InputStatus.ERROR
                  : InputStatus.DEFAULT
              }
              tabIndex={105}
              type='number'
              readOnly={cardData.p01.isSubmitted}
            />
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet height={'50%'} show={isShow} bottomSheetTargetId={'targetContainer'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>8, 4, 6, 8</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>16÷2=8, 32÷8=4, 30÷5=6, 72÷9=8</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
