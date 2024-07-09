import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import {
  Box,
  TMainHeaderInfoTypes,
  List,
  Typography,
  IQuestionProps,
  Textarea,
  Tag,
  ETagLine,
  BottomSheet, EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C09A03 } from './store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P01 = () => {
  const PAGE_NUMBER = 'P01';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C09A03);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Plan and Write',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Think about the digital literacy skill you consider most important and answer the questions.',
  };

  const data = [
    {
      color: '#FFE199',
      text: 'What digital literacy skill do you think is most important?',
    },
    {
      color: '#C0E4CB',
      text: 'What should we do to achieve the skill?',
    },
    {
      color: '#FCC6CC',
      text: 'What should we remember to be good digital citizens?',
    },
  ];

  const answers = {
    input1: "to learn how to use digital information properly",
    input2_1: "• Respect copyright. - Avoid sharing others' content online without their permission. ",
    input2_2: "• Check the reliability of online information. - Search for information from multiple sources.",
    input3: "The ethical use of accurate information contributes to a healthy online environment.",
  }

  const defaultSubmission: userSubmissionType[] = [
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
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
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
            isSubmitted,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
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
      ];
      submitData(PAGE_NUMBER, userSubmission);
    }
  };

  const handleInputChange = (num: number, e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        [`answer${num}`]: e.target.value
      }
    }));
    changeData(PAGE_NUMBER, num, 1, e.target.value);
  };


  useEffect(() => {
    return () => {
      saveData(PAGE_NUMBER);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const checkAnswers = isNotEmptyString(cardData.p01.answer1) &&
    isNotEmptyString(cardData.p01.answer2) &&
    isNotEmptyString(cardData.p01.answer3)

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={
        !checkAnswers ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!checkAnswers}
      onSubmit={onSubmitText}
    >
      <Box useFull>
        <Content>
          <List gap={7} data={data}>
            {({ value, index = 1 }) => (
              <Box vAlign='center'>
                <>
                  <Box width={'60px'} height={92} hAlign='center' background={value?.color}>
                    <Typography useGap={false} weight={700}>
                      {index}
                    </Typography>
                  </Box>
                  <Box width={400} marginRight={24}>
                    <Typography>{value?.text}</Typography>
                  </Box>
                </>
                <Box flex={1}>
                  <Textarea
                    width='100%'
                    height='92px'
                    value={cardData.p01[`answer${index}`].toString()}
                    onChange={(e)=>handleInputChange(index, e)}
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='학생 답안 입력란.'
                    placeholder='내용을 넣어 주세요.'
                  />
                </Box>
              </Box>
            )}
          </List>
          <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={showAnswer && cardData.p01.isSubmitted}>
            <Box background='lightGray' borderRadius='12px' marginTop='48px'>
              <Box>
                <Tag type={ETagLine.GREEN} label='예시답안' />
              </Box>
              <Box vAlign={'center'} display={'flex'} marginTop='12px' gap={'30px'}>
                <Typography>(1)</Typography>
                <Typography>{answers.input1}</Typography>
              </Box>
              <Box vAlign={'center'} display={'flex'} marginTop='12px' gap={'30px'}>
                <Typography>(2)</Typography>
                <Typography>{answers.input2_1}</Typography>
              </Box>
              <Box vAlign={'center'} display={'flex'} marginTop='12px' gap={'67px'}>
                <Typography> </Typography>
                <Typography>{answers.input2_2}</Typography>
              </Box>
              <Box vAlign={'center'} display={'flex'} marginTop='12px' gap={'30px'}>
                <Typography>(3)</Typography>
                <Typography>{answers.input3}</Typography>
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
