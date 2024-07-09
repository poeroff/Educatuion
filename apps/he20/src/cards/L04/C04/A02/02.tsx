import {
  Box,
  IQuestionProps,
  Image,
  TMainHeaderInfoTypes,
  Typography,
  Input,
  EStyleButtonTypes,
  BottomSheet,
  ETagLine,
  Tag,
  IAudioPlayerProps,
  Question,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';

import { studentAtom } from '@/stores/student';
import { useRecoilValue, useRecoilState } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { L04C04A02 } from './store';
import styled from 'styled-components';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [isShow, setShow] = useState(false);
  const [cardData, setCardData] = useRecoilState(L04C04A02);

  const ANSWER = ['innovative', 'faster', 'sensitivity', 'copies'];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: '2. Complete the opinions of the debaters using information from the debate.',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C04/A02/HE2-L04-C04-A02.mp3',
    captionSrc: '/L04/C04/A02/HE2-L04-C04-A02.srt',
  };

  const { userId } = useRecoilValue(studentAtom);

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
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const onGrade = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
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
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p02.answer3,
              isAnswer: true,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p02.answer4,
              isAnswer: true,
            },
          ],
        },
      ];
      submitData('P02', userSubmission);
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
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p02.answer4,
            isSubmitted,
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
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer4: value } }));
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
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!isNotEmptyString(cardData.p02.answer1 && cardData.p02.answer2 && cardData.p02.answer3 && cardData.p02.answer4)}
      submitBtnColor={
        !isNotEmptyString(cardData.p02.answer1 && cardData.p02.answer2 && cardData.p02.answer3 && cardData.p02.answer4)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={onGrade}
    >
      <BackgroundImage>
        <Image src={'/L04/C04/A02/HE2-L04-C04-A02-2-1.png'} width='920px' height='370px' />
      </BackgroundImage>
      <Box display='flex' useFull padding='10px 20px' position='relative'>
        <Box useFull borderRight='1px solid var(--color-green-800)'>
          <Box useFull borderBottom='1px solid var(--color-green-800)' height='52px' padding='0 0 4px 20px' marginBottom='4px'>
            <Typography weight={'var(--font-weight-bold)'} color='var(--color-blue-700)'>
              Pros
            </Typography>
          </Box>
          <Question type='dot' size='small'>
            AI art can be as creatieve and
          </Question>
          <Box marginLeft='17px'>
            <Box hAlign='flex-start'>
              <Typography>(1)</Typography>
              <Input
                value={cardData.p02.answer1}
                onChange={event => handleChange(1, event.target.value)}
                width='241px'
                maxLength={100}
                readOnly={cardData.p02.isSubmitted}
                ariaLabel='1번 답 입력란'
              />
            </Box>
            <Typography>as human art.</Typography>
          </Box>

          <Question type='dot' size='small'>
            AI can produce content much
          </Question>
          <Box marginLeft='17px'>
            <Box hAlign='flex-start'>
              <Typography>(2)</Typography>
              <Input
                value={cardData.p02.answer2}
                onChange={event => handleChange(2, event.target.value)}
                width='241px'
                maxLength={100}
                readOnly={cardData.p02.isSubmitted}
                ariaLabel='2번 답 입력란'
              />
            </Box>
            <Typography>and at a lower cost.</Typography>
          </Box>
        </Box>

        <Box useFull>
          <Box useFull borderBottom='1px solid var(--color-green-800)' height='52px' padding='0 0 4px 20px' marginBottom='4px'>
            <Typography weight={'var(--font-weight-bold)'} color='var(--color-red-700)'>
              Cons
            </Typography>
          </Box>
          <Question type='dot' size='small'>
            AI art lacks true creativity and
          </Question>
          <Box marginLeft='17px'>
            <Box hAlign='flex-start'>
              <Typography>artistic (3)</Typography>
              <Input
                value={cardData.p02.answer3}
                onChange={event => handleChange(3, event.target.value)}
                width='241px'
                maxLength={100}
                readOnly={cardData.p02.isSubmitted}
                ariaLabel='3번 답 입력란'
              />
            </Box>
            <Typography>which are essential to real art.</Typography>
          </Box>

          <Box hAlign='start'>
            <Question type='dot' size='small'>
              AI just (4)
            </Question>
            <Input
              value={cardData.p02.answer4}
              onChange={event => handleChange(4, event.target.value)}
              width='241px'
              maxLength={100}
              readOnly={cardData.p02.isSubmitted}
              ariaLabel='4번 답 입력란'
            />
          </Box>
          <Box marginLeft='17px'>
            <Typography>human works based on big data.</Typography>
          </Box>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범 답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography usePre>{ANSWER.map((answer, idx) => `(${idx + 1}) ${answer}\n`)}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const BackgroundImage = styled.div`
  position: absolute;
  top: 10px;
  left: 40px;
  z-index: -1;
`;

export default P02;
