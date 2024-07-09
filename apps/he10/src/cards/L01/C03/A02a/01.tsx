import {
  Box,
  TMainHeaderInfoTypes,
  IAudioPlayerProps,
  Typography,
  Input,
  Image,
  IQuestionProps,
  BoxWrap,
  BottomSheet,
  Tag,
  ETagLine,
  InputStatus,
  EStyleButtonTypes,
  EImageType,
} from '@maidt-cntn/ui';
import { IImageView } from '@maidt-cntn/pages/HE-025-01';
import { useState, useEffect } from 'react';
import { Container } from '@maidt-cntn/ui/en';
import { L01C03A02a } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C03A02a);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

  const questionInfo: IQuestionProps = {
    text: 'Choose the correct words to complete the woman’s advice.',
    markSize: 'middle',
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };
  const imageInfo: IImageView = {
    src: '/L01/C03/A02/HE1-L01-C03-A02.jpg',
    alt: '한 여성이 웃으며 무언가를 말하고 있는 모습',
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Think Ahead',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C03/A02/HE1-L01-C03-A02-01.mp3',
    captionSrc: '/L01/C03/A02/HE1-L01-C03-A02-01.srt',
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
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p01.answer1.trim().toLowerCase() === cardData.p01.solution1;
      const isCorrect2 = cardData.p01.answer2.trim().toLowerCase() === cardData.p01.solution2;
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
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
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

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: value } }));
    }
    changeData('P01', 1, subKey, value);
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
      audioInfo={audioInfo}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p01.answer1 && cardData.p01.answer2)}
      submitBtnColor={
        !(cardData.p01.answer1 && cardData.p01.answer2) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      onSubmit={submitAnswer}
    >
      <BoxWrap useFull>
        <Box width='250px' vAlign='center'>
          <Image src={imageInfo.src} alt={imageInfo.alt} type={EImageType.IMG} />
        </Box>
        <Box display='flex' flexDirection='column' justifyContent='center' gap='12px' useFull>
          <Box>
            <Typography>Talk about your 1)</Typography>
            <Input
              ariaLabel='1번 답 입력란'
              status={
                cardData.p01.isSubmitted && cardData.p01.answer1.trim().toLowerCase() !== cardData.p01.solution1
                  ? InputStatus.ERROR
                  : isNotEmptyString(cardData.p01.answer1)
                  ? InputStatus.ENABLE
                  : InputStatus.DEFAULT
              }
              readOnly={cardData.p01.isSubmitted}
              maxLength={20}
              value={cardData.p01.answer1}
              onChange={e => {
                handleChange(1, e.target.value);
              }}
              width='260px'
              placeholder='내용을 넣어 주세요.'
            />
          </Box>
          <Box>
            <Typography>with your friend instead of 2)</Typography>
            <Input
              ariaLabel='2번 입력란'
              status={
                cardData.p01.isSubmitted && cardData.p01.answer2.trim().toLowerCase() !== cardData.p01.solution1
                  ? InputStatus.ERROR
                  : isNotEmptyString(cardData.p01.answer2)
                  ? InputStatus.ENABLE
                  : InputStatus.DEFAULT
              }
              readOnly={cardData.p01.isSubmitted}
              maxLength={20}
              value={cardData.p01.answer2}
              onChange={e => {
                handleChange(2, e.target.value);
              }}
              width='260px'
              placeholder='내용을 넣어 주세요.'
            />
          </Box>
          <Box>
            <Typography>about it too much.</Typography>
          </Box>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>

          <Box marginTop='12px'>1) {cardData.p01.solution1}</Box>
          <Box marginTop='12px'>2) {cardData.p01.solution2}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
