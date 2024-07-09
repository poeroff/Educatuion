import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import styled from '@emotion/styled';
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
  BoxWrap,
  Image,
  NameTag,
  EStyleButtonTypes,
  InputStatus,
  EStyleSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L01C02A03 } from './store';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C02A03);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };
  const questionInfo: IQuestionProps = {
    text: 'Complete the notice using information from the talk.',
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C02/A03/HE1-L01-C02-A03-02.mp3',
  };

  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

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
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p03.answer1.trim() === cardData.p03.solution1;
      const isCorrect2 = cardData.p03.answer2.trim().toLowerCase() === cardData.p03.solution2;
      const isCorrect3 = cardData.p03.answer3.trim() === cardData.p03.solution3;
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;
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
      vAlign='flex-start'
      onSubmit={onGrade}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p03.answer1 && cardData.p03.answer2 && cardData.p03.answer3)}
      audioInfo={audioInfo}
      submitBtnColor={
        !(cardData.p03.answer1 && cardData.p03.answer2 && cardData.p03.answer3)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <BoxWrap>
        <Box useFull>
          <Box>
            <Box hAlign='flex' marginBottom={'20px'}>
              <NameTag color='#4CBBB4' label='Notice' style={{ width: '97px', color: 'white' }} />
              <Typography color='var(--color-gray-900)' weight='800' style={{ fontSize: '32px', lineHeight: '48px' }}>
                NEW Library Opening!
              </Typography>
            </Box>
            <BoldText>Opening Day :</BoldText>
            <Typography>Monday, March (1)</Typography>
            <Input
              value={cardData.p03.answer1}
              onChange={event => handleChange(1, event.target.value)}
              placeholder=''
              textAlign='left'
              width='100px'
              maxLength={30}
              readOnly={cardData.p03.isSubmitted}
              status={
                !isNotEmptyString(cardData.p03.answer1)
                  ? InputStatus.DEFAULT
                  : cardData.p03.isSubmitted && !isAnswer(cardData.p03.answer1, cardData.p03.solution1)
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              ariaLabel='1번 답 입력란'
            />
            <Typography>th</Typography>
          </Box>
          <Box>
            <BoldText>Improvements</BoldText>
          </Box>
          <Box hAlign='flex-start'>
            <Question type='dot' size={EStyleSizes['SMALL']}>
              a larger and more comfortable space
            </Question>
          </Box>
          <Box hAlign='flex-start'>
            <Question type='dot' size={EStyleSizes['SMALL']}>
              a brand-new (2)
            </Question>
            <Input
              value={cardData.p03.answer2}
              onChange={event => handleChange(2, event.target.value)}
              placeholder=''
              textAlign='left'
              width='180px'
              maxLength={30}
              readOnly={cardData.p03.isSubmitted}
              status={
                !isNotEmptyString(cardData.p03.answer2)
                  ? InputStatus.DEFAULT
                  : cardData.p03.isSubmitted && !isAnswer(cardData.p03.answer2, cardData.p03.solution2)
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              ariaLabel='2번 답 입력란'
            />
            <Typography>for virtual</Typography>
          </Box>
          <Box hAlign='flex-start'>
            <Typography>meetings and live-streaming videos</Typography>
          </Box>
        </Box>
        <Box width='200px' useFull>
          <Image
            src={'/L01/C02/A03/HE1-L01-C02-A03-02.jpg'}
            width='180px'
            height='240px'
            alt='많은 양의 책이 꽂힌 서가가 가지런히 있는 도서관'
            style={{ borderRadius: '8px' }}
          />
        </Box>
      </BoxWrap>
      <Box hAlign='flex-start'>
        <Question type='dot' size={EStyleSizes['SMALL']}>
          more than (3)
        </Question>
        <Input
          value={cardData.p03.answer3}
          onChange={event => handleChange(3, event.target.value)}
          placeholder=''
          textAlign='left'
          width='120px'
          maxLength={30}
          readOnly={cardData.p03.isSubmitted}
          status={
            !isNotEmptyString(cardData.p03.answer3)
              ? InputStatus.DEFAULT
              : cardData.p03.isSubmitted && !isAnswer(cardData.p03.answer3, cardData.p03.solution3)
              ? InputStatus.ERROR
              : InputStatus.ENABLE
          }
          ariaLabel='3번 답 입력란'
        />
        <Typography>new books for everyone’s taste</Typography>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>(1) 14 (2) studio (3) 500</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const BoldText = styled.span`
  font-weight: var(--font-weight-bold);
  font-size: 28px;
  line-height: 42px;
  padding: 4px 0px;
`;

export default P03;
