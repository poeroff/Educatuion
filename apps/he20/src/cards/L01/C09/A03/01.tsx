import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import styled from '@emotion/styled';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { BottomSheet, Box, EStyleButtonTypes, ETagLine, IQuestionProps, List, TMainHeaderInfoTypes, Tag, Textarea, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C09A03 } from './store';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C09A03);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Plan and Write',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Think about a type of volunteer work that you want to do and answer the questions.',
  };

  const data = [
    {
      color: '#C0E4CB',
      text: 'What kind of valunteer work would you like to do?',
    },
    {
      color: '#FFE199',
      text: 'What made you want to apply for the program?',
    },
    {
      color: '#FCC6CC',
      text: 'What do you expect from the volunteer work?',
    },
    {
      color: '#DCC3FE',
      text: 'When are you available to valunteer?',
    },
  ];

  const answers = {
    input1: 'repair houses for people in need',
    input2: 'the news of several houses damaged by heavy rain and many volunteers coming to help',
    input3: 'to help the local community',
    input4: 'two times in the evenings during the week and any time on weekends',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
      ],
    },
    {
      mainKey: 2,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
      ],
    },
    {
      mainKey: 3,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
      ],
    },
    {
      mainKey: 4,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
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
            answer2: userSubmissionList[1].inputData[0]?.value || cardData.p01.answer2,
            answer3: userSubmissionList[2].inputData[0]?.value || cardData.p01.answer3,
            answer4: userSubmissionList[3].inputData[0]?.value || cardData.p01.answer4,
            isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const onSubmitText = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
      setShowAnswer(!showAnswer);
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
            },
          ],
        },
        {
          mainKey: 2,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer2,
            },
          ],
        },
        {
          mainKey: 3,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer3,
            },
          ],
        },
        {
          mainKey: 4,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer4,
            },
          ],
        },
      ];
      submitData('P01', userSubmission);
    }
  };

  const handleInputChange = (num: number, e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardData(prev => {
      const _p01 = { ...prev.p01 };
      _p01[`answer${num}`] = e.target.value;
      return { ...prev, p01: { ..._p01 } };
    });
    changeData('P01', num, 1, e.target.value);
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

  const checkAnswers =
    isNotEmptyString(cardData.p01.answer1) &&
    isNotEmptyString(cardData.p01.answer2) &&
    isNotEmptyString(cardData.p01.answer3) &&
    isNotEmptyString(cardData.p01.answer4);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={!checkAnswers ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!checkAnswers}
      onSubmit={onSubmitText}
      useExtend
    >
      <Box useFull>
        <Content>
          <List gap={7} data={data}>
            {({ value, index = 1 }) => (
              <Box vAlign='center'>
                <>
                  <Box tabIndex={100 + 10 * index + index + 1} width={'60px'} height={92} hAlign='center' background={value?.color}>
                    <Typography useGap={false} weight={700}>
                      {index}
                    </Typography>
                  </Box>
                  <Box tabIndex={100 + 10 * index + index + 2} width={500} marginRight={24}>
                    <Typography>{value?.text}</Typography>
                  </Box>
                </>
                <Box flex={1} tabIndex={100 + 10 * index + index + 3}>
                  <Textarea
                    placeholder='내용을 넣어 주세요.'
                    width='100%'
                    height='92px'
                    value={cardData.p01[`answer${index}`].toString()}
                    onChange={e => handleInputChange(index, e)}
                    readOnly={cardData.p01.isSubmitted}
                  />
                </Box>
              </Box>
            )}
          </List>
          {/* 답안보기 바텀시트 */}
          <BottomSheet bottomSheetTargetId='targetContainer' height='400px' show={showAnswer && cardData.p01.isSubmitted}>
            <Box background='lightGray' borderRadius='12px' marginTop='48px'>
              <Box tabIndex={161}>
                <Tag type={ETagLine.GREEN} label='예시답안' />
              </Box>
              <Box tabIndex={162} vAlign={'center'} display={'flex'} marginTop='12px' gap={'30px'}>
                <Typography useGap={false}>(1)</Typography>
                <Typography useGap={false}>{answers.input1}</Typography>
              </Box>
              <Box tabIndex={163} vAlign={'center'} display={'flex'} marginTop='12px' gap={'30px'}>
                <Typography useGap={false}>(2)</Typography>
                <Typography useGap={false}>{answers.input2}</Typography>
              </Box>
              <Box tabIndex={164} vAlign={'center'} display={'flex'} marginTop='12px' gap={'30px'}>
                <Typography useGap={false}>(3)</Typography>
                <Typography useGap={false}>{answers.input3}</Typography>
              </Box>
              <Box tabIndex={165} vAlign={'center'} display={'flex'} marginTop='12px' gap={'30px'}>
                <Typography useGap={false}>(4)</Typography>
                <Typography useGap={false}>{answers.input4}</Typography>
              </Box>
            </Box>
          </BottomSheet>
        </Content>
      </Box>
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
