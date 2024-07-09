import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  Box,
  Typography,
  EStyleFontSizes,
  TMainHeaderInfoTypes,
  Input,
  EStyleButtonTypes,
  BottomSheet,
  IQuestionProps,
  ETagLine,
  Tag,
  InputStatus,
  Image,
  IAudioPlayerProps,
  EImageType,
  BoxWrap,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { isAnswer, isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L01C03A02 } from './store';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C03A02);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks using information from the talk.',
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C03/A02/HE2-L01-C03-A02-02.mp3',
    captionSrc: '/L01/C03/A02/HE2-L01-C03-A02-02.srt',
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
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];
  const submitAnswer = () => {
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p03.solution1.some((item, index) => isAnswer(cardData.p03.answer1, item));
      const isCorrect2 = cardData.p03.solution2.some((item, index) => isAnswer(cardData.p03.answer2, item));
      const isCorrect3 = cardData.p03.solution3.some((item, index) => isAnswer(cardData.p03.answer3, item));
      const isCorrect4 = cardData.p03.solution4.some((item, index) => isAnswer(cardData.p03.answer4, item));
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4;
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p03.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p03.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p03.answer4,
              isAnswer: true,
              isCorrect: isCorrect4,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P03', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p03.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p03.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p03.answer4,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    const truncatedValue = truncateToMaxBytes(value);
    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        [`answer${subKey}`]: truncatedValue,
      },
    }));
    changeData('P03', 1, subKey, truncatedValue);
  };

  useEffect(() => {
    return () => {
      saveData('P03');
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
      vAlign='flex-start'
      submitLabel={!cardData.p03.isSubmitted ? '채점하기' : isShow ? '답안 닫기' : '답안 보기'}
      onSubmit={submitAnswer}
      submitDisabled={
        !isNotEmptyString(cardData.p03.answer1) ||
        !isNotEmptyString(cardData.p03.answer2) ||
        !isNotEmptyString(cardData.p03.answer3) ||
        !isNotEmptyString(cardData.p03.answer4)
      }
      submitBtnColor={
        !isNotEmptyString(cardData.p03.answer1) ||
        !isNotEmptyString(cardData.p03.answer2) ||
        !isNotEmptyString(cardData.p03.answer3) ||
        !isNotEmptyString(cardData.p03.answer4)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      useExtend
    >
      <Image
        alt={'옆면에 강아지와 고양이 그림이 있는 앰뷸런스 모양의 버스와 동물 이동 장을 들고 유니폼을 입고 있는 수의사 남녀'}
        type={EImageType.IMG_BG}
        src={'/L01/C03/A02/HE2-L01-C03-A02-02-1.png'}
        width={'1000px'}
        height={'400px'}
      >
        <BoxWrap width={'1000px'} marginTop={'20px'}>
          <Box width={'240px'} useFull marginTop={'30px'} marginRight={'0px'}>
            <Box marginTop={'50px'} hAlign={'center'}>
              <Typography weight={'var(--font-weight-bold)'} size={EStyleFontSizes.MEDIUM}>
                Get to Know
              </Typography>
            </Box>
            <Box hAlign={'flex-start'} vAlign={'center'}>
              <Box>
                <Typography>
                  <Typography weight={700} size={EStyleFontSizes.MEDIUM}>
                    the
                  </Typography>
                  (1)
                </Typography>
              </Box>
              <Input
                name='userAnswer1'
                width={'110px'}
                value={cardData.p03.answer1}
                onChange={e => {
                  handleChange(1, e.target.value);
                }}
                status={
                  !cardData.p03.answer1
                    ? InputStatus.DEFAULT
                    : cardData.p03.isSubmitted && !isAnswer(cardData.p03.answer1, cardData.p03.solution1)
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                maxLength={2000}
                placeholder=''
                inputSize={'x-small'}
                readOnly={cardData.p03.isSubmitted}
                ariaLabel='1번 답란'
              />
            </Box>
            <Box hAlign={'center'}>
              <Typography weight={'var(--font-weight-bold)'} size={EStyleFontSizes.MEDIUM}>
                Bus
              </Typography>
            </Box>
          </Box>
          <Box width={'240px'} height={'360px'} marginLeft={'5px'} marginRight={'0px'}>
            <Box hAlign={'center'}>
              <Typography weight={'var(--font-weight-bold)'}>What is it?</Typography>
            </Box>
            <Box marginTop={'50px'}>
              <Typography>a mobile clinic designed for treating</Typography>
            </Box>
            <Box marginLeft={'10px'} hAlign={'flex-start'} vAlign={'center'}>
              (2)
              <Input
                name='userAnswer2'
                width={'150px'}
                marginLeft={10}
                maxLength={2000}
                value={cardData.p03.answer2}
                onChange={e => {
                  handleChange(2, e.target.value);
                }}
                status={
                  !cardData.p03.answer2
                    ? InputStatus.DEFAULT
                    : cardData.p03.isSubmitted && !isAnswer(cardData.p03.answer2, cardData.p03.solution2)
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                inputSize={'x-small'}
                readOnly={cardData.p03.isSubmitted}
                ariaLabel='2번 답란'
              />
            </Box>
            <Typography>animals</Typography>
          </Box>
          <Box useFull width={'235px'} height={'400px'} marginRight={'5px'}>
            <Box hAlign={'center'}>
              <Typography weight={'var(--font-weight-bold)'}>How does it</Typography>
            </Box>
            <Box hAlign={'center'}>
              <Typography weight={'var(--font-weight-bold)'}>operate?</Typography>
            </Box>
            <Box>
              <Typography>travels every day to different</Typography>
            </Box>
            <Box marginLeft={'10px'} hAlign={'flex-start'} vAlign={'center'}>
              (3)
              <Input
                name='userAnswer3'
                width={'160px'}
                marginLeft={10}
                maxLength={2000}
                value={cardData.p03.answer3}
                onChange={e => {
                  handleChange(3, e.target.value);
                }}
                status={
                  !cardData.p03.answer3
                    ? InputStatus.DEFAULT
                    : cardData.p03.isSubmitted && !isAnswer(cardData.p03.answer3, cardData.p03.solution3)
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                inputSize={'x-small'}
                readOnly={cardData.p03.isSubmitted}
                ariaLabel='3번 답란'
              />
            </Box>
            <Typography>to provide much-needed services</Typography>
          </Box>
          <Box width={'240px'} useFull height={'400px'}>
            <Box hAlign={'center'}>
              <Typography weight={'var(--font-weight-bold)'}>Why does it</Typography>
            </Box>
            <Box hAlign={'center'}>
              <Typography weight={'var(--font-weight-bold)'}>need support?</Typography>
            </Box>
            <Box>
              <Typography>to help improve the animals'</Typography>
            </Box>
            <Box marginLeft={'10px'} hAlign={'flex-start'} vAlign={'center'}>
              (4)
              <Input
                name='userAnswer4'
                width={'160px'}
                marginLeft={10}
                maxLength={2000}
                value={cardData.p03.answer4}
                onChange={e => {
                  handleChange(4, e.target.value);
                }}
                status={
                  !cardData.p03.answer4
                    ? InputStatus.DEFAULT
                    : cardData.p03.isSubmitted && !isAnswer(cardData.p03.answer4, cardData.p03.solution4)
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                inputSize={'x-small'}
                readOnly={cardData.p03.isSubmitted}
                ariaLabel='4번 답란'
              />
            </Box>
            <Typography>and create healthier environments</Typography>
          </Box>
        </BoxWrap>
      </Image>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Tag type={ETagLine.GREEN} label='답안' />
          <Box marginTop='10px' height='48px' padding={8}>
            <Typography size={EStyleFontSizes.MEDIUM}>{`(1) ${cardData.p03.solution1.join(', ')}\n(2) ${cardData.p03.solution2.join(
              ', ',
            )}\n(3) ${cardData.p03.solution3.join(', ')}\n(4) ${cardData.p03.solution4.join(', ')}`}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
