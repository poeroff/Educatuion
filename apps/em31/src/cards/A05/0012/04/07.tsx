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

const P07 = () => {
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
      ],
    },
  ];

  const onSubmit = () => {
    if (cardData.p07.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData.p07.answer.trim() === cardData.p07.solution;
      setCardData(prev => ({ ...prev, p07: { ...prev.p07, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p07.answer,
              isAnswer: true,
              isCorrect: isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P07', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P07')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p07: {
            ...prev.p07,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p07.answer,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData('P07', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, p07: { ...prev.p07, answer: value } }));
    changeData('P07', 1, 1, value);
  };

  useEffect(() => {
    return () => {
      saveData('P07');
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
        <Label type='icon' size='middle' value='7' />
        식물원 입구에서 장미 정원까지 가는 전체 거리를 구해 보세요.
      </>
    ),
    mark: cardData.p07.isSubmitted ? (cardData.p07.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      vAlign='flex-start'
      background={'var(--color-white)'}
      onSubmit={onSubmit}
      submitLabel={cardData.p07.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p07.answer}
      submitBtnColor={!cardData.p07.answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
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
            value={cardData.p07.answer}
            onChange={e => handleChange(e.target.value)}
            readOnly={cardData.p07.isSubmitted}
            status={!cardData.p07.isSubmitted ? InputStatus.ENABLE : !cardData.p07.isCorrect ? InputStatus.ERROR : InputStatus.ENABLE}
            width='130px'
            ariaLabel='식물원 입구에서 정원까지 전체 거리'
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
              <Typography>2500</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>
                {'식물원 입구에서 안내소를 거쳐 장미 정원까지 가는 거리는 2 km보다 500 m 더 먼 거리이므로 2 km 500 m입니다.'}
                <br/>
                {'1 km=1000 m이므로 2 km 500 m=2500 m입니다.'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P07;
