import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import {
  Box,
  TMainHeaderInfoTypes,
  List,
  Typography,
  IQuestionProps,
  Textarea,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  BoxWrap,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { IL03C09A03P1, L03C09A03 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C09A03);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Plan and Write',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Search for an artist who overcame their challenges and complete the table.',
  };

  const data = [
    {
      color: 'var(--color-pink-200)',
      text: 'Name & Job',
    },
    {
      color: 'var(--color-yellow-200)',
      text: 'Challenge',
    },
    {
      color: 'var(--color-red-200)',
      text: 'Solution',
    },
    {
      color: 'var(--color-blue-200)',
      text: 'Achievements',
    },
    {
      color: 'var(--color-green-200)',
      text: 'Reputation',
    },
  ];

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

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1,
              isAnswer: true,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2,
              isAnswer: true,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p01.answer3,
              isAnswer: true,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p01.answer4,
              isAnswer: true,
            },
            {
              subKey: 5,
              type: 'TEXT',
              value: cardData.p01.answer5,
              isAnswer: true,
            },
          ],
        },
      ];
      submitData('P01', userSubmission);
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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={submitAnswer}
      submitBtnColor={
        !(cardData.p01.answer1 && cardData.p01.answer2 && cardData.p01.answer3 && cardData.p01.answer4 && cardData.p01.answer5)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!(cardData.p01.answer1 && cardData.p01.answer2 && cardData.p01.answer3 && cardData.p01.answer4 && cardData.p01.answer5)}
    >
      <BoxWrap useFull>
        <Box useFull>
          <Content>
            <List gap={7} data={data}>
              {({ value, index = 1 }) => (
                <Box vAlign='center'>
                  <>
                    <Box width={'60px'} height={92} hAlign='center' background={value?.color}>
                      <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                        {index}
                      </Typography>
                    </Box>
                    <Box width={344} marginRight={24}>
                      <Typography>{value?.text}</Typography>
                    </Box>
                  </>
                  <Box flex={1}>
                    <Textarea
                      placeholder='내용을 넣어 주세요.'
                      width='100'
                      height='92px'
                      value={(cardData.p01 as IL03C09A03P1)[`answer${index}`] as string}
                      textAlign='left'
                      readOnly={cardData.p01.isSubmitted}
                      onChange={e => handleChange(index, e.target.value)}
                      ariaLabel={`${index}번 답 입력란`}
                      status={cardData.p01.isSubmitted ? InputStatus.DEFAULT : InputStatus.ENABLE}
                    />
                  </Box>
                </Box>
              )}
            </List>
          </Content>
          <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
            <Box background='lightGray' borderRadius='12px' marginTop='48px'>
              <Box>
                <Tag type={ETagLine.GREEN} label='답안' />
              </Box>
              <Box marginTop='12px'>
                <p>1) Zaha Hadid, an Iraqi British architect </p>
                <p>2) facing discrimination as an Iraqi woman </p>
                <p>3) by standing out for innovative ideas and hard work </p>
                <p>4) designed new iconic forms characterized by curves, became the first woman to win the Pritzker Architecture Prize in 2004</p>
                <p>5) one of the top architects of the 21st century</p>
              </Box>
            </Box>
          </BottomSheet>
        </Box>
      </BoxWrap>
    </Container>
  );
};

const Content = styled.div`
  li + li {
    padding-top: 7px;
    border-top: 2px dashed #e0e2e6;
  }
`;

export default P01;
