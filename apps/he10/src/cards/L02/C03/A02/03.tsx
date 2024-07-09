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
  EStyleButtonTypes,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L02C03A02 } from './store';
import { isAnswer, isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';
const vitePath = import.meta.env.VITE_CDN_PATH;
const backgroundImg = `${vitePath}/L02/C03/A02/HE1-L02-C03-A02-03.jpg`;

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C03A02);
  const pageNumber = 'P03';
  const pageKey = 'p03';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'Complete the lecture notes using information from the talk.',
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C03/A02/HE1-L02-C03-A02-02.mp3',
    captionSrc: '/L02/C03/A02/HE1-L02-C03-A02-02.srt',
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
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData[pageKey].answer[0], cardData[pageKey].solution[0]);
      const isCorrect2 = isAnswer(cardData[pageKey].answer[1], cardData[pageKey].solution[1]);
      const isCorrect3 = isAnswer(cardData[pageKey].answer[2], cardData[pageKey].solution[2]);
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;
      const isSubmitted2 = true;
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: isSubmitted2, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageKey].answer[0],
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData[pageKey].answer[1],
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData[pageKey].answer[2],
              isAnswer: true,
              isCorrect: isCorrect3,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageNumber, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData.map((item: { value: string }) => item.value) || cardData[pageKey].answer,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number, value: string) => {
    const truncateValue = truncateToMaxBytes(value);
    const updatedAnswers = cardData[pageKey].answer.map((ans, idxAns) => (idxAns === index ? truncateValue : ans));
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer: updatedAnswers,
      },
    }));
    changeData(pageKey, 1, index - 1, updatedAnswers);
  };

  useEffect(() => {
    return () => {
      saveData(pageNumber);
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
      onSubmit={onGrade}
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData[pageKey].answer[0] && cardData[pageKey].answer[1] && cardData[pageKey].answer[2])}
      submitBtnColor={
        !(cardData[pageKey].answer[0] && cardData[pageKey].answer[1] && cardData[pageKey].answer[2])
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <BackgroundWrap>
        <Content>
          <StyledTable>
            <StyledTbody>
              <StyledTR>
                <StyledTD className='first-column'></StyledTD>
                <StyledTD>
                  <Typography weight='var(--font-weight-bold)'>Lecture Notes</Typography>
                </StyledTD>
              </StyledTR>
              <StyledTR>
                <StyledTD>
                  <Typography align='start' weight='var(--font-weight-bold)'>
                    Topic
                  </Typography>
                </StyledTD>
                <StyledTD>
                  <Typography>Every (1)</Typography>
                  <Input
                    width={'200px'}
                    value={cardData[pageKey].answer[0]}
                    onChange={event => handleChange(0, event.target.value)}
                    textAlign='start'
                    maxLength={2000}
                    readOnly={cardData[pageKey].isSubmitted}
                    status={
                      !isNotEmptyString(cardData[pageKey].answer[0])
                        ? InputStatus.DEFAULT
                        : cardData[pageKey].isSubmitted && !isAnswer(cardData[pageKey].answer[0], cardData[pageKey].solution[0])
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                    }
                    ariaLabel='1번 답란'
                  />
                  <Typography>has its own unique traditions and customs.</Typography>
                </StyledTD>
              </StyledTR>
              <StyledTR>
                <StyledTD>
                  <Typography align='start' weight='var(--font-weight-bold)'>
                    Examples
                  </Typography>
                </StyledTD>
                <StyledTD>
                  <Question type='dot' size='small'>
                    <Typography useGap={false}> Opening (2)</Typography>
                    <Typography>
                      <Input
                        width={'200px'}
                        value={cardData[pageKey].answer[1]}
                        onChange={event => handleChange(1, event.target.value)}
                        textAlign='start'
                        maxLength={2000}
                        readOnly={cardData[pageKey].isSubmitted}
                        status={
                          !isNotEmptyString(cardData[pageKey].answer[1])
                            ? InputStatus.DEFAULT
                            : cardData[pageKey].isSubmitted && !isAnswer(cardData[pageKey].answer[1], cardData[pageKey].solution[1])
                            ? InputStatus.ERROR
                            : InputStatus.ENABLE
                        }
                        ariaLabel='2번 답란'
                      />
                    </Typography>
                    <Typography useGap={false}>right away</Typography>
                  </Question>
                </StyledTD>
              </StyledTR>
              <StyledTR>
                <StyledTD></StyledTD>
                <StyledTD>
                  <Typography> acceptable in most Western countries, but rude in China</Typography>
                </StyledTD>
              </StyledTR>
              <StyledTR>
                <StyledTD></StyledTD>
                <StyledTD>
                  <Question type='dot' size='small'>
                    <Typography useGap={false}>Touching a person’s (3) </Typography>
                    <Typography>
                      <Input
                        width={'200px'}
                        value={cardData[pageKey].answer[2]}
                        onChange={event => handleChange(2, event.target.value)}
                        textAlign='start'
                        maxLength={2000}
                        readOnly={cardData[pageKey].isSubmitted}
                        status={
                          !isNotEmptyString(cardData[pageKey].answer[2])
                            ? InputStatus.DEFAULT
                            : cardData[pageKey].isSubmitted && !isAnswer(cardData[pageKey].answer[2], cardData[pageKey].solution[2])
                            ? InputStatus.ERROR
                            : InputStatus.ENABLE
                        }
                        ariaLabel='3번 답란'
                      />
                    </Typography>
                  </Question>
                </StyledTD>
              </StyledTR>
              <StyledTR>
                <StyledTD></StyledTD>
                <StyledTD>
                  <Typography>impolite in Thailand and Laos, but okay in other countries</Typography>
                </StyledTD>
              </StyledTR>
            </StyledTbody>
          </StyledTable>
        </Content>
      </BackgroundWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>(1) {cardData[pageKey].solution[0]}</Box>
          <Box marginTop='12px'>(2) {cardData[pageKey].solution[1]}</Box>
          <Box marginTop='12px'>(3) {cardData[pageKey].solution[2]}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const BackgroundWrap = styled.div`
  min-height: 500px;
  background: center / cover no-repeat url('${backgroundImg}');
`;

const Content = styled.div`
  padding: 14px 14px 14px 20px;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const StyledTbody = styled.tbody``;

const StyledTR = styled.tr`
  height: 5px;
`;

const StyledTD = styled.td`
  padding: 5px;
  border: 0px;
`;

export default P03;
