import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Container } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Box, EStyleButtonTypes, IQuestionProps, Input, Typography, BottomSheet, Tag, ETagLine, Label, InputStatus, Image } from '@maidt-cntn/ui';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';

// import headerIcon from '../../../../assets/icon/m_default_01.svg';
import { A05001204_Atom } from './store';

const P08 = () => {
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

  const onSubmit = () => {
    if (cardData.p08.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p08.answer1.trim() === cardData.p08.solution1;
      const isCorrect2 = cardData.p08.answer2.trim() === cardData.p08.solution2;
      const isCorrect3 = cardData.p08.answer3.trim() === cardData.p08.solution3;
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;
      setCardData(prev => ({ ...prev, p08: { ...prev.p08, isSubmitted: true, isCorrect: isCorrect, isCorrect1, isCorrect2, isCorrect3 }, }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p08.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p08.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p08.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P08', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P08')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p08: {
            ...prev.p08,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p08.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p08.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p08.answer3,
            isCorrect1: userSubmissionList[0].inputData[0]?.isCorrect || cardData.p08.isCorrect1,
            isCorrect2: userSubmissionList[0].inputData[1]?.isCorrect || cardData.p08.isCorrect2,
            isCorrect3: userSubmissionList[0].inputData[2]?.isCorrect || cardData.p08.isCorrect3,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData('P08', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p08: { ...prev.p08, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p08: { ...prev.p08, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p08: { ...prev.p08, answer3: value } }));
    }
    changeData('P08', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P08');
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
        <Label type='icon' size='middle' value='8' />
        식물원 입구에서 장미 정원까지 가는 전체 거리를 구해 보세요.
      </>
    ),
    mark: cardData.p08.isSubmitted ? (cardData.p08.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      vAlign='flex-start'
      background={'var(--color-white)'}
      onSubmit={onSubmit}
      submitLabel={cardData.p08.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(
        cardData.p08.answer1 &&
        cardData.p08.answer2 &&
        cardData.p08.answer3
      )}
      submitBtnColor={!(
        cardData.p08.answer1 &&
        cardData.p08.answer2 &&
        cardData.p08.answer3
      ) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      useRound
    >
      <Box useFull vAlign='center' flexDirection='column'>
      <Box type='line' padding='20px 40px' useRound>
          <Image
            src='/A05/0012/04/MC31535-1.png'
            alt='식물원 입구에서의 시각은 9시 10분 30초이고, 식물원 입구에서 2km 떨어진 안내소를 거쳐, 안내소에서 500 m 떨어진 장미 정원에 도착한 시각은 10시 55분 45초입니다.'
            width='752px'
            height='200px'
          />
        </Box>
        <Box type='paint' padding={'20px 44px'} useRound>
          <Input
            value={cardData.p08.answer1}
            onChange={e => handleChange(1, e.target.value)}
            readOnly={cardData.p08.isSubmitted}
            status={!cardData.p08.isSubmitted ? InputStatus.ENABLE : !cardData.p08.isCorrect1 ? InputStatus.ERROR : InputStatus.ENABLE}
            width='80px'
            ariaLabel='식물원 입구에서 정원까지 걸린 시간'
          />
          <Typography fontWeight='900'>시간</Typography>
          <Input
            value={cardData.p08.answer2}
            onChange={e => handleChange(2, e.target.value)}
            readOnly={cardData.p08.isSubmitted}
            status={!cardData.p08.isSubmitted ? InputStatus.ENABLE : !cardData.p08.isCorrect2 ? InputStatus.ERROR : InputStatus.ENABLE}
            width='80px'
            ariaLabel='식물원 입구에서 정원까지 걸린 분'
          />
          <Typography fontWeight='900'>분</Typography>
          <Input
            value={cardData.p08.answer3}
            onChange={e => handleChange(3, e.target.value)}
            readOnly={cardData.p08.isSubmitted}
            status={!cardData.p08.isSubmitted ? InputStatus.ENABLE : !cardData.p08.isCorrect3 ? InputStatus.ERROR : InputStatus.ENABLE}
            width='80px'
            ariaLabel='식물원 입구에서 정원까지 걸린 초'
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
              <Typography>1, 45, 15</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>
                {'식물원 입구에서 출발한 시각은 9시 10분 30초이고 장미 정원에 도착한 시각은 10시 55분 45초입니다. '}
                <br/>
                {'따라서 식물원 입구에서 징미 정원까지 가는 데 걸린 시간은 10시 55분 45초-9시 10분 30초=1시간 45분 15초입니다.'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P08;
