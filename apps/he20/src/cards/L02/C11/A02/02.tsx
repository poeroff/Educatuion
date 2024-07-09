import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Image,
  Input,
  InputStatus,
  PinchZoom,
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C11A02 } from './store';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C11A02);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A. Listening',
  };

  const questionInfo: IQuestionProps = {
    text: '2. Listen again. Complete the advertisement using information from the dialogue.',
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C11/A02/HE2-L02-C11-A02.mp3',
    captionSrc: '/L02/C11/A02/HE2-L02-C11-A02.srt',
  };

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

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p02.answer1.trim().toLowerCase() === cardData.p02.solution1;
      const isCorrect2 = cardData.p02.answer2.trim().toLowerCase() === cardData.p02.solution2;
      const isCorrect3 = cardData.p02.answer3.trim().toLowerCase() === cardData.p02.solution3;
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p02.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p02.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p02.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p02.answer3,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer3: value } }));
    }
    changeData('P02', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P02');
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
      audioInfo={audioInfo}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p02.answer1 && cardData.p02.answer2 && cardData.p02.answer3)}
      submitBtnColor={
        !(cardData.p02.answer1 && cardData.p02.answer2 && cardData.p02.answer3)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={submitAnswer}
    >
      <BoxWrap useFull>
        <Box width={'350px'} useFull>
          <PinchZoom>
            <Image width='350px' height='350px' alt='한국 전통 가옥으로 된 식당' src={'/L02/C11/A02/HE2-L02-C11-A02-P02.jpg'} />
          </PinchZoom>
        </Box>
        <Box useFull>
          <Scroll height='100%' width='580px'>
            <Box hAlign='flex-start' paddingBottom={'10px'}>
              <Typography>Welcome to Seorabeol!</Typography>
            </Box>
            <Typography useGap={false}>
              We’re a traditional Korean (1){' '}
              <Input
                width='167px'
                ariaLabel='1번 답 입력란'
                status={
                  cardData.p02.isSubmitted && cardData.p02.answer1.trim().toLowerCase() !== cardData.p02.solution1
                    ? InputStatus.ERROR
                    : isNotEmptyString(cardData.p02.answer1)
                    ? InputStatus.ENABLE
                    : InputStatus.DEFAULT
                }
                readOnly={cardData.p02.isSubmitted}
                maxLength={20}
                value={cardData.p02.answer1}
                onChange={e => {
                  handleChange(1, e.target.value);
                }}
              />
            </Typography>
            <Typography useGap={false}>
              with lots of (2){' '}
              <Input
                width='160px'
                ariaLabel='2번 답 입력란'
                status={
                  cardData.p02.isSubmitted && cardData.p02.answer2.trim().toLowerCase() !== cardData.p02.solution2
                    ? InputStatus.ERROR
                    : isNotEmptyString(cardData.p02.answer2)
                    ? InputStatus.ENABLE
                    : InputStatus.DEFAULT
                }
                readOnly={cardData.p02.isSubmitted}
                maxLength={20}
                value={cardData.p02.answer2}
                onChange={e => {
                  handleChange(2, e.target.value);
                }}
              />{' '}
              rooms of different sizes. Our food is (3){' '}
              <Input
                width='160px'
                ariaLabel='3번 답 입력란'
                status={
                  cardData.p02.isSubmitted && cardData.p02.answer3.trim().toLowerCase() !== cardData.p02.solution3
                    ? InputStatus.ERROR
                    : isNotEmptyString(cardData.p02.answer3)
                    ? InputStatus.ENABLE
                    : InputStatus.DEFAULT
                }
                readOnly={cardData.p02.isSubmitted}
                maxLength={20}
                value={cardData.p02.answer3}
                onChange={e => {
                  handleChange(3, e.target.value);
                }}
              />{' '}
              and delicious. <br />
            </Typography>
            <Typography useGap={false}>Book now to enjoy the flavors of Korea!</Typography>
          </Scroll>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>(1) {cardData.p02.solution1}</Typography>
          </Box>
          <Box>
            <Typography>(2) {cardData.p02.solution2}</Typography>
          </Box>
          <Box>
            <Typography>(3) {cardData.p02.solution3}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
