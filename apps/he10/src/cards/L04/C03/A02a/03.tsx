import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EImageType,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Image,
  Input,
  InputStatus,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C03A02a } from './store';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C03A02a);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'Complete the notice using information from the talk.',
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C03/A02/HE1-L04-C03-A02-02.mp3',
    captionSrc: '/L04/C03/A02/HE1-L04-C03-A02-02.srt',
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
        {
          subKey: 5,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 6,
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
      const isCorrect1 = isAnswer(cardData.p03.answer1, cardData.p03.solution1);
      const isCorrect2 = isAnswer(cardData.p03.answer2, cardData.p03.solution2);
      const isCorrect3 = isAnswer(cardData.p03.answer3, cardData.p03.solution3);
      const isCorrect4 = isAnswer(cardData.p03.answer4, cardData.p03.solution4);
      const isCorrect5 = isAnswer(cardData.p03.answer5, cardData.p03.solution5);
      const isCorrect6 = isAnswer(cardData.p03.answer6, cardData.p03.solution6);
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4 && isCorrect5 && isCorrect6;

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
            {
              subKey: 5,
              type: 'TEXT',
              value: cardData.p03.answer5,
              isAnswer: true,
              isCorrect: isCorrect5,
            },
            {
              subKey: 6,
              type: 'TEXT',
              value: cardData.p03.answer6,
              isAnswer: true,
              isCorrect: isCorrect6,
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
            answer5: userSubmissionList[0].inputData[4]?.value || cardData.p03.answer5,
            answer6: userSubmissionList[0].inputData[5]?.value || cardData.p03.answer6,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer3: value } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer4: value } }));
    } else if (subKey === 5) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer5: value } }));
    } else if (subKey === 6) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer6: value } }));
    }
    changeData('P03', 1, subKey, value);
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
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={
        !(
          cardData.p03.answer1 &&
          cardData.p03.answer2 &&
          cardData.p03.answer3 &&
          cardData.p03.answer4 &&
          cardData.p03.answer5 &&
          cardData.p03.answer6
        )
      }
      submitBtnColor={
        !(
          cardData.p03.answer1 &&
          cardData.p03.answer2 &&
          cardData.p03.answer3 &&
          cardData.p03.answer4 &&
          cardData.p03.answer5 &&
          cardData.p03.answer6
        )
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={submitAnswer}
    >
      <BoxWrap useFull>
        <Box useFull>
          <Image
            type={EImageType.IMG_BG}
            src={'/L04/C03/A02/HE1-L04-C03-A02-02-2.jpg'}
            alt='Water Collecting King이라는 서비스 이름이 쓰여있는 대형 트럭'
            width='100%'
            height='420px'
          >
            <BoxWrap display='flex'>
              <Box vAlign='flex-start' width='100%' margin='10px 20px'>
                <Typography useGap={false} weight='var(--font-weight-bold)' color='var(--color-yellow-600)'>
                  Waste Collecting King
                </Typography>
              </Box>
              <Box hAlign='end' width='100%' margin='5px 20px'>
                <Typography weight='var(--font-weight-bold)' color='var(--color-green-600)' style={{ textAlign: 'end' }}>
                  Home Appliance <br />
                  Recycling Pick-up Service
                </Typography>
              </Box>
            </BoxWrap>
            <BoxWrap flexDirection='column'>
              <Box vAlign='baseline' margin='5px 20px' gap={65}>
                <Typography weight='var(--font-weight-bold)'>Items</Typography>
                <Typography>
                  (1){' '}
                  <Input
                    width='250px'
                    status={
                      cardData.p03.isSubmitted && cardData.p03.answer1.trim().toLowerCase() !== cardData.p03.solution1
                        ? InputStatus.ERROR
                        : isNotEmptyString(cardData.p03.answer1)
                        ? InputStatus.ENABLE
                        : InputStatus.DEFAULT
                    }
                    readOnly={cardData.p03.isSubmitted}
                    maxLength={20}
                    value={cardData.p03.answer1}
                    onChange={e => {
                      handleChange(1, e.target.value);
                    }}
                    placeholder='내용을 넣어 주세요.'
                    ariaLabel='1번의 첫번째 답란'
                    inputSize='x-small'
                  />{' '}
                  <Input
                    width='250px'
                    status={
                      cardData.p03.isSubmitted && cardData.p03.answer2.trim().toLowerCase() !== cardData.p03.solution2
                        ? InputStatus.ERROR
                        : isNotEmptyString(cardData.p03.answer2)
                        ? InputStatus.ENABLE
                        : InputStatus.DEFAULT
                    }
                    readOnly={cardData.p03.isSubmitted}
                    maxLength={20}
                    value={cardData.p03.answer2}
                    onChange={e => {
                      handleChange(2, e.target.value);
                    }}
                    placeholder='내용을 넣어 주세요.'
                    ariaLabel='1번의 두번째 답란'
                    inputSize='x-small'
                  />{' '}
                  home appliances like refrigerators, air conditioners, and TVs
                </Typography>
              </Box>
              <Box hAlign='baseline' margin='5px 20px' gap={70}>
                <Typography weight='var(--font-weight-bold)'>Cost</Typography>
                <Typography>
                  absolutely (2){' '}
                  <Input
                    width='250px'
                    status={
                      cardData.p03.isSubmitted && cardData.p03.answer3.trim().toLowerCase() !== cardData.p03.solution3
                        ? InputStatus.ERROR
                        : isNotEmptyString(cardData.p03.answer3)
                        ? InputStatus.ENABLE
                        : InputStatus.DEFAULT
                    }
                    readOnly={cardData.p03.isSubmitted}
                    maxLength={20}
                    value={cardData.p03.answer3}
                    onChange={e => {
                      handleChange(3, e.target.value);
                    }}
                    placeholder='내용을 넣어 주세요.'
                    ariaLabel='2번 답란'
                    inputSize='x-small'
                  />{' '}
                </Typography>
              </Box>
              <Box hAlign='baseline' vAlign='start' margin='5px 20px'>
                <Typography weight='var(--font-weight-bold)' width='180px'>
                  How to Use
                </Typography>
                <Typography>
                  Just{' '}
                  <Input
                    width='250px'
                    status={
                      cardData.p03.isSubmitted && cardData.p03.answer4.trim().toLowerCase() !== cardData.p03.solution4
                        ? InputStatus.ERROR
                        : isNotEmptyString(cardData.p03.answer4)
                        ? InputStatus.ENABLE
                        : InputStatus.DEFAULT
                    }
                    readOnly={cardData.p03.isSubmitted}
                    maxLength={20}
                    value={cardData.p03.answer4}
                    onChange={e => {
                      handleChange(4, e.target.value);
                    }}
                    placeholder='내용을 넣어 주세요.'
                    ariaLabel='3번의 첫번째 답란'
                    inputSize='x-small'
                  />{' '}
                  <Input
                    width='250px'
                    status={
                      cardData.p03.isSubmitted && cardData.p03.answer5.trim().toLowerCase() !== cardData.p03.solution5
                        ? InputStatus.ERROR
                        : isNotEmptyString(cardData.p03.answer5)
                        ? InputStatus.ENABLE
                        : InputStatus.DEFAULT
                    }
                    readOnly={cardData.p03.isSubmitted}
                    maxLength={20}
                    value={cardData.p03.answer5}
                    onChange={e => {
                      handleChange(5, e.target.value);
                    }}
                    placeholder='내용을 넣어 주세요.'
                    ariaLabel='3번의 두번째 답란'
                    inputSize='x-small'
                  />{' '}
                  <Input
                    width='250px'
                    status={
                      cardData.p03.isSubmitted && cardData.p03.answer6.trim().toLowerCase() !== cardData.p03.solution6
                        ? InputStatus.ERROR
                        : isNotEmptyString(cardData.p03.answer6)
                        ? InputStatus.ENABLE
                        : InputStatus.DEFAULT
                    }
                    readOnly={cardData.p03.isSubmitted}
                    maxLength={20}
                    value={cardData.p03.answer6}
                    onChange={e => {
                      handleChange(6, e.target.value);
                    }}
                    placeholder='내용을 넣어 주세요.'
                    ariaLabel='3번의 세번째 답란'
                    inputSize='x-small'
                  />{' '}
                  to make a reservation, and we will pick up your appliances.
                </Typography>
              </Box>
            </BoxWrap>
          </Image>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>

          <Box marginTop='12px'>
            <Typography>
              (1) {cardData.p03.solution1} {cardData.p03.solution2}
            </Typography>
          </Box>
          <Box>
            <Typography>(2) {cardData.p03.solution3}</Typography>
          </Box>
          <Box>
            <Typography>
              (3) {cardData.p03.solution4} {cardData.p03.solution5} {cardData.p03.solution6}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
