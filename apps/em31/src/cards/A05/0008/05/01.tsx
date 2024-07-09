import { useEffect, useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
import {
  Image,
  Box,
  TMainHeaderInfoTypes,
  Input,
  Typography,
  Label,
  IQuestionProps,
  EImageType,
  InputStatus,
  BottomSheet,
  ETagLine,
  Tag,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import { A05_0008_05 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(A05_0008_05);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const handleInputChangeEvent = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: value } }));
    }
    changeData('P01', 1, subKey, value);
  };

  const onGrade = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData.p01.answer1, cardData.p01.solution1);
      const isCorrect2 = isAnswer(cardData.p01.answer2, cardData.p01.solution2);

      const isCorrect = isCorrect1 && isCorrect2;
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
      ],
    },
  ];

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

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '시간의 덧셈하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={'ㄱ'} color='var(--color-white)' background='#969590' />
        버스의 도착 예정 시각을 그림으로 알아보세요.
      </>
    ),
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={onGrade}
      submitDisabled={!(cardData.p01.answer1 && cardData.p01.answer2)}
      submitBtnColor={
        !(cardData.p01.answer1 && cardData.p01.answer2) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW
      }
      useRound
      vAlign='flex-start'
    >
      <Box display='flex' flexDirection='column' alignItems='center' paddingBottom='10px'>
        <Box position='relative' marginTop={'-70px'} marginBottom={'-50px'}>
          <Box position='absolute' top='110px' left='145px' width='800px'>
            <Typography fontWeight='bold'>
              우리 가족은 놀이공원에서 집으로 가기 위해 버스 정류장에 갔어. 1분 30초를 기다리고 5시 16분 50초에 버스를 탔지. 우리 가족이 버스 정류장에
              도착한 시각을 어떻게 알 수 있을까?
            </Typography>
          </Box>
          <Image type={EImageType.IMG_BG} src={'/A05/0008/05/배경이미지.png'} width='1100px' height='300px' />
        </Box>

        <Box position='relative' type='dashed' useRound padding='25px 20px 16px 20px' marginTop='24px'>
          <Box position='absolute' top='0px' left='80px' fontWeight={'bold'}>
            5시
            <Input
              type='number'
              width='75px'
              value={cardData.p01.answer1}
              onChange={e => handleInputChangeEvent(1, e.target.value)}
              marginLeft={8}
              maxLength={2}
              readOnly={cardData.p01.isSubmitted}
              ariaLabel='5시 16분 50초에서 1분 30초 전의 분을 입력하세요'
              status={
                !cardData.p01.isSubmitted
                  ? !cardData.p01.answer1
                  : !isAnswer(cardData.p01.answer1, cardData.p01.solution1)
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
            />
            분
            <Input
              type='number'
              width='75px'
              value={cardData.p01.answer2}
              onChange={e => handleInputChangeEvent(2, e.target.value)}
              marginLeft={8}
              maxLength={2}
              readOnly={cardData.p01.isSubmitted}
              ariaLabel='5시 16분 50초에서 1분 30초 전의 초를 입력하세요'
              status={
                !cardData.p01.isSubmitted
                  ? !cardData.p01.answer2
                  : !isAnswer(cardData.p01.answer2, cardData.p01.solution2)
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
            />
            초
          </Box>
          <Box position='absolute' top='13px' right='56px' fontWeight={'bold'}>
            5시 16분 50초
          </Box>
          <Image
            src='/A05/0008/05/MC31525.png'
            alt='8시 5분부터 8시 8분까지 10초 단위로 나타내고, 8시 5분 10초에서 2분 20초 후의 시각을 나타낸 그림입니다.'
            width='780px'
            height='260px'
          />
        </Box>
      </Box>

      <BottomSheet height={'50%'} show={isShow} bottomSheetTargetId={'targetContainer'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>15, 20</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>5시 16분 50초에서 1분 전 시각은 5시 15분 50초입니다. 5시 15분 50초에서 30초 전 시각은 5시 15분 20초입니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
