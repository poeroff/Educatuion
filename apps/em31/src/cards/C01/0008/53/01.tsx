import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Container } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  Box,
  EStyleButtonTypes,
  IQuestionProps,
  Input,
  Typography,
  BottomSheet,
  Tag,
  ETagLine,
  Label,
  TMainHeaderInfoTypes,
  InputStatus,
  Question,
} from '@maidt-cntn/ui';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { C01000853 } from './store';
const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C01000853);
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
      ],
    },
  ];
  const onCalculate = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData.p01.answer.trim() === cardData.p01.solution;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
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
  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: value } }));
    changeData('P01', 1, 1, value);
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

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
  };
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='baseline' fontSize={28} width="920px" fontWeight={'var(--font-weight-medium)'}>
        <Box marginRight={8}>[4~7]</Box>
        <Typography lineHeight='48px'>
        놀이공원에서는 하루 입장객 900명에게 풍선을 줍니다. 어느 날 오전에 487명이 입장했고 그날 태호가 받은 오후 입장 순서표에는 395라고 쓰여 있습니다.
        </Typography>
      </Box>
    ),
  };
  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      background={'var(--color-white)'}
      onSubmit={onCalculate}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p01.answer}
      submitBtnColor={!cardData.p01.answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      useRound
    >

        <Box width="903px">
          <Typography lineHeight='48px'>
            <Box fontSize={36}>
              <Question type='number' number='4' mark={cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none'}>
              태호의 오후 입장 순서는 몇 번째인가요?
              </Question>
            </Box>
          </Typography>
        </Box>

      <Box display='flex' justifyContent='center'>
        <Box type='paint' padding={'20px 44px'} useRound>
          <Input
            value={cardData.p01.answer}
            onChange={e => handleChange(e.target.value)}
            readOnly={cardData.p01.isSubmitted}
            status={!cardData.p01.isSubmitted ? InputStatus.ENABLE : !cardData.p01.isCorrect ? InputStatus.ERROR : InputStatus.ENABLE}
            width='130px'
            ariaLabel='태호의 오후 입장 순서'
          />
          <Typography>번째</Typography>
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
              <Typography>395</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>입장 순서표에 쓰여 있는 수는 395입니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;