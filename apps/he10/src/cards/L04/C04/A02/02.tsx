import {
  Question,
  TMainHeaderInfoTypes,
  Input,
  Typography,
  Box,
  IAudioPlayerProps,
  Tag,
  ETagLine,
  IQuestionProps,
  BottomSheet,
  EStyleButtonTypes,
  Image,
  EImageType,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { studentAtom } from '@/stores/student';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L04C04A02 } from './store';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';

const backgroundImg = `/L04/C04/A02/HE1-L04-C04-A02-2_.png`;

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C04A02);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };
  const questionInfo: IQuestionProps = {
    text: '2. Fill in the blanks using information from the news report.',
    mark: 'none',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C04/A02/HE1-L04-C04-A02.mp3',
    captionSrc: '/L04/C04/A02/HE1-L04-C04-A02.srt',
  };

  const { userId } = useRecoilValue(studentAtom);
  const [isShowAnswer, setIsShowAnswer] = useState(false);

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

  const onGrade = () => {
    if (cardData.p02.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect1 = isAnswer(cardData.p02.answer1, cardData.p02.solution1);
      const isCorrect2 = isAnswer(cardData.p02.answer2, cardData.p02.solution2);
      const isCorrect3 = isAnswer(cardData.p02.answer3, cardData.p02.solution3);
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
          isCorrect: isCorrect,
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
      vAlign='flex-start'
      onSubmit={onGrade}
      submitLabel={cardData.p02.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={cardData.p02.isSubmitted && (cardData.p02.answer1 === '' || cardData.p02.answer2 === '' || cardData.p02.answer3 === '')}
      submitBtnColor={
        cardData.p02.isSubmitted
          ? isShowAnswer
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : cardData.p02.answer1 !== '' && cardData.p02.answer2 !== '' && cardData.p02.answer3 !== ''
          ? EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
      audioInfo={audioInfo}
    >
      <Background type={EImageType.IMG_BG} role='img'>
        <Image src={backgroundImg} width='100%' height='560px' />
      </Background>
      <Box marginLeft='40px' marginRight='0px'>
        <Box hAlign='center' paddingTop='15px'>
          <Typography weight='var(--font-weight-extraBold)'>Reporter's Notes</Typography>
        </Box>
        <Box>
          <Question type='dot' size='small'>
            <Typography>
              {'Why has the size of the hole in the ozone layer been'}
              {' (1) '}
              <Input
                value={cardData.p02.answer1}
                onChange={event => handleChange(1, event.target.value)}
                placeholder=''
                textAlign='left'
                width='170px'
                maxLength={30}
                readOnly={cardData.p02.isSubmitted}
                status={cardData.p02.isSubmitted && !isAnswer(cardData.p02.answer1, cardData.p02.solution1) ? 'error' : ''}
                ariaLabel='1번 문제의 답'
              />
              {'?'}
            </Typography>
          </Question>
        </Box>
        <Box>
          <Typography style={{ marginLeft: '2em', textIndent: '-1em' }}>
            {'- People have tried to (2)'}
            <Input
              value={cardData.p02.answer2}
              onChange={event => handleChange(2, event.target.value)}
              placeholder=''
              textAlign='left'
              width='80px'
              maxLength={30}
              readOnly={cardData.p02.isSubmitted}
              status={cardData.p02.isSubmitted && !isAnswer(cardData.p02.answer2, cardData.p02.solution2) ? 'error' : ''}
              ariaLabel='2번 문제의 답'
            />
            {' making and using substances that affect the ozone layer in accordance with the Montreal Agreement.'}
          </Typography>
        </Box>
        <Box marginTop='15px'>
          <Question type='dot' size='small'>
            {'What is expected in the future?'}
          </Question>
        </Box>
        <Box>
          <Typography style={{ marginLeft: '2em', textIndent: '-1em' }}>
            {'- The ozone layer will fully (3)'}
            <Input
              value={cardData.p02.answer3}
              onChange={event => handleChange(3, event.target.value)}
              placeholder=''
              textAlign='left'
              width='120px'
              maxLength={30}
              readOnly={cardData.p02.isSubmitted}
              status={cardData.p02.isSubmitted && !isAnswer(cardData.p02.answer3, cardData.p02.solution3) ? 'error' : ''}
              ariaLabel='3번 문제의 답'
            />
            {' in most parts of the world by 2040.'}
          </Typography>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography> (1) {cardData.p02.solution1}</Typography>
            <Typography> (2) {cardData.p02.solution2}</Typography>
            <Typography> (3) {cardData.p02.solution3}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const Background = styled(Image)`
  position: absolute;
`;

export default P02;
