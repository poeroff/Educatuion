import {
  BoxWrap,
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
  InputStatus,
  PinchZoom,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';

import { studentAtom } from '@/stores/student';
import { useRecoilValue, useRecoilState } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString, isAnswer, getMarking } from '@maidt-cntn/util/CommonUtil';
import { L01C09A06 } from './store';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [isShow, setShow] = useState(false);
  const [cardData, setCardData] = useRecoilState(L01C09A06);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'B',
    headerPattern: 'icon',
    iconType: 'mePractice',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '그림을 보고, 괄호 안의 말을 활용하여 문장을 완성해 봅시다.',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const data = [
    {
      question: ['I', 'milk. (drink)'],
    },
    {
      question: ['Dad', 'orange juice. (drink)'],
    },
    {
      question: ['Mom and I', 'bread and tomatoes. (eat)'],
    },
    {
      question: ['Dad', 'tomatoes. (eat)'],
    },
    {
      question: ['We all', 'eggs. (have)'],
    },
  ];

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
        {
          subKey: 5,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const onGrade = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData.p01.answer1, cardData.p01.solution1);
      const isCorrect2 = isAnswer(cardData.p01.answer2, cardData.p01.solution2);
      const isCorrect3 = isAnswer(cardData.p01.answer3, cardData.p01.solution3);
      const isCorrect4 = isAnswer(cardData.p01.answer4, cardData.p01.solution4);
      const isCorrect5 = isAnswer(cardData.p01.answer5, cardData.p01.solution5);
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4 && isCorrect5;
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
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p01.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p01.answer4,
              isAnswer: true,
              isCorrect: isCorrect4,
            },
            {
              subKey: 5,
              type: 'TEXT',
              value: cardData.p01.answer5,
              isAnswer: true,
              isCorrect: isCorrect5,
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
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p01.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p01.answer4,
            answer5: userSubmissionList[0].inputData[4]?.value || cardData.p01.answer5,
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
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer3: value } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer4: value } }));
    } else if (subKey === 5) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer5: value } }));
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p01.answer1 && cardData.p01.answer2 && cardData.p01.answer3 && cardData.p01.answer4 && cardData.p01.answer5)}
      submitBtnColor={
        !(cardData.p01.answer1 && cardData.p01.answer2 && cardData.p01.answer3 && cardData.p01.answer4 && cardData.p01.answer5)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={onGrade}
    >
      <BoxWrap useFull>
        <Box padding='30px 0'>
          <PinchZoom>
            <Image
              src={'/L01/C09/A06/ME1-L01-C09-A06.jpg'}
              width='406px'
              height='352px'
              alt='식탁에서 엄마는 빵, 달걀, 커피를, 나는 빵, 토마토, 달걀, 유유를, 아빠는 고구마, 달걀, 베이컨, 바나나, 오렌지 주스를 먹으려고 한다.'
            />
          </PinchZoom>
        </Box>
        <BoxWrap tabIndex={0} justifyContent='center' flexDirection='column'>
          <BoxWrap boxGap={2}>
            <Box>
              <Typography>(1)</Typography>
            </Box>
            <Box lineHeight='42px'>
              <Typography>{data[0].question[0]}</Typography>
              <Input
                value={cardData.p01.answer1}
                onChange={event => handleChange(1, event.target.value)}
                width='120px'
                maxLength={100}
                readOnly={cardData.p01.isSubmitted}
                status={
                  !isNotEmptyString(cardData.p01.answer1)
                    ? InputStatus.DEFAULT
                    : cardData.p01.isSubmitted && !isAnswer(cardData.p01.answer1, cardData.p01.solution1)
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                ariaLabel='1번 답 입력란'
              />
              <Typography>{data[0].question[1]}</Typography>
            </Box>
          </BoxWrap>
          <BoxWrap boxGap={2} marginTop={10}>
            <Box>
              <Typography>(2)</Typography>
            </Box>
            <Box lineHeight='42px'>
              <Typography>{data[1].question[0]}</Typography>
              <Input
                value={cardData.p01.answer2}
                onChange={event => handleChange(2, event.target.value)}
                width='120px'
                maxLength={100}
                readOnly={cardData.p01.isSubmitted}
                status={
                  !isNotEmptyString(cardData.p01.answer2)
                    ? InputStatus.DEFAULT
                    : cardData.p01.isSubmitted && !isAnswer(cardData.p01.answer2, cardData.p01.solution2)
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                ariaLabel='2번 답 입력란'
              />
              <Typography>{data[1].question[1]}</Typography>
            </Box>
          </BoxWrap>
          <BoxWrap boxGap={2}>
            <Box paddingTop={2}>
              <Typography>(3)</Typography>
            </Box>
            <Box lineHeight='42px'>
              <Typography>{data[2].question[0]}</Typography>
              <Input
                value={cardData.p01.answer3}
                onChange={event => handleChange(3, event.target.value)}
                width='120px'
                maxLength={100}
                readOnly={cardData.p01.isSubmitted}
                status={
                  !isNotEmptyString(cardData.p01.answer3)
                    ? InputStatus.DEFAULT
                    : cardData.p01.isSubmitted && !isAnswer(cardData.p01.answer3, cardData.p01.solution3)
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                ariaLabel='3번 답 입력란'
              />
              <Typography>{data[2].question[1]}</Typography>
            </Box>
          </BoxWrap>
          <BoxWrap boxGap={2}>
            <Box paddingTop={2}>
              <Typography>(4)</Typography>
            </Box>
            <Box lineHeight='42px'>
              <Typography>{data[3].question[0]}</Typography>
              <Input
                value={cardData.p01.answer4}
                onChange={event => handleChange(4, event.target.value)}
                width='120px'
                maxLength={100}
                readOnly={cardData.p01.isSubmitted}
                status={
                  !isNotEmptyString(cardData.p01.answer4)
                    ? InputStatus.DEFAULT
                    : cardData.p01.isSubmitted && !isAnswer(cardData.p01.answer4, cardData.p01.solution4)
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                ariaLabel='4번 답 입력란'
              />
              <Typography>{data[3].question[1]}</Typography>
            </Box>
          </BoxWrap>
          <BoxWrap boxGap={2} marginTop={10}>
            <Box paddingTop={2}>
              <Typography>(5)</Typography>
            </Box>
            <Box lineHeight='42px'>
              <Typography>{data[4].question[0]}</Typography>
              <Input
                value={cardData.p01.answer5}
                onChange={event => handleChange(5, event.target.value)}
                width='120px'
                maxLength={100}
                readOnly={cardData.p01.isSubmitted}
                status={
                  !isNotEmptyString(cardData.p01.answer5)
                    ? InputStatus.DEFAULT
                    : cardData.p01.isSubmitted && !isAnswer(cardData.p01.answer5, cardData.p01.solution5)
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                ariaLabel='5번 답 입력란'
              />
              <Typography>{data[4].question[1]}</Typography>
            </Box>
          </BoxWrap>
        </BoxWrap>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Typography usePre style={{ marginTop: '12px' }} useGap={false}>
            <Typography usePre>{`(1) drink\n(2) drinks\n(3) eat\n(4) doesn’t eat\n(5) have`}</Typography>
          </Typography>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
