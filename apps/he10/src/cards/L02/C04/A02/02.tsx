import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import {
  TMainHeaderInfoTypes,
  Input,
  Typography,
  Box,
  IAudioPlayerProps,
  BottomSheet,
  EStyleButtonTypes,
  ETagLine,
  Tag,
  InputStatus,
  Image,
} from '@maidt-cntn/ui';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C04A02 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Container } from '@maidt-cntn/ui/en';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const imgSrc = '/L02/C04/A02/HE1-L02-C04-A02-02.jpg';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C04A02);
  const [isShow, setIsShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo = {
    text: '2. Complete the broadcast summary using information from the dialogue.',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C04/A02/HE1-L02-C04-A02.mp3',
    captionSrc: '/L02/C04/A02/HE1-L02-C04-A02.srt',
  };

  const bottomAnswer = (
    <>
      <Box marginTop='12px'>
        (1) {cardData.p02.solution1}
        <br />
        (2) {cardData.p02.solution2}
      </Box>
    </>
  );

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: false,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: false,
        },
      ],
    },
  ];

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
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, [saveData]);

  const handleInputChange = (index: number, value: string) => {
    if (index === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
    } else if (index === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
    }
    changeData('P02', 1, index, value);
  };

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      setIsShow(!isShow);
    } else {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer1,
              isAnswer: true,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p02.answer2,
              isAnswer: true,
            },
          ],
        },
      ];
      submitData('P02', userSubmission);
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!(cardData.p02.answer1 && cardData.p02.answer2)}
      submitBtnColor={
        !(cardData.p02.answer1 && cardData.p02.answer2) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      audioInfo={audioInfo}
      onSubmit={submitAnswer}
    >
      <Box>
        <Image src={imgSrc} width='920px' height='auto' style={{ position: 'absolute', objectFit: 'cover', zIndex: -1 }} />
        <Box hAlign='center' paddingTop='15px'>
          <Typography weight={'var(--font-weight-extraBold)'}>Coming Up Next:</Typography>
        </Box>
        <Box hAlign='center' paddingTop='5px'>
          <Typography weight={'var(--font-weight-extraBold)'}>Talk with Simon Brown</Typography>
        </Box>
        <Content>
          <Box paddingTop='14px' paddingLeft='50px'>
            Simon Brown joins us today to talk about his work Aloha ,
          </Box>
          <Box paddingTop='14px' paddingLeft='50px'>
            My Dear Friend, a heart-warming story about a
          </Box>
          <Box paddingTop='14px' paddingLeft='50px'>
            (1)&nbsp;
            <Input
              value={cardData.p02.answer1}
              aria-label='1번 답란'
              inputSize='x-small'
              textAlign='left'
              width='150px'
              maxLength={30}
              status={isNotEmptyString(cardData.p02.answer2) ? InputStatus.ENABLE : InputStatus.DEFAULT}
              readOnly={cardData.p02.isSubmitted}
              onChange={event => handleInputChange(1, event.target.value)}
            />
            &nbsp;between two children from different cultures.
          </Box>
          <Box paddingTop='14px' paddingLeft='50px'>
            Brown will tell us why he became interested in sharing Native
          </Box>
          <Box paddingTop='14px' paddingLeft='50px'>
            Hawaiian culture with others. Join us today and learn more
          </Box>
          <Box paddingTop='14px' paddingLeft='50px'>
            about the importance of respecting different (2)&nbsp;
            <Input
              value={cardData.p02.answer2}
              aria-label='2번 답란'
              inputSize='x-small'
              textAlign='left'
              width='120px'
              maxLength={30}
              status={isNotEmptyString(cardData.p02.answer2) ? InputStatus.ENABLE : InputStatus.DEFAULT}
              readOnly={cardData.p02.isSubmitted}
              onChange={event => handleInputChange(2, event.target.value)}
            />
            &nbsp;.
          </Box>
        </Content>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범 답안' />
          </Box>
          <Box marginTop='12px'>{bottomAnswer}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const Content = styled.div`
  margin: 13px 50px;
`;

export default P02;
