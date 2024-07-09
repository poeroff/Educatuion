import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { Box, TMainHeaderInfoTypes, List, Typography, IQuestionProps, Textarea, BottomSheet, Tag, ETagLine, EStyleButtonTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { IL02C09A03P1, L02C09A03 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C09A03);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Plan and Write',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Think of a product that you might want to request a refund or exchange for and answer the questions.',
  };

  const data = [
    {
      color: 'var(--color-yellow-200)',
      text: 'What is the purpose of your e-mail?',
    },
    {
      color: 'var(--color-pink-200)',
      text: 'What is the problem?',
    },
    {
      color: 'var(--color-blue-200)',
      text: 'What do you think about the problem?',
    },

    {
      color: 'var(--color-red-200)',
      text: 'How do you want your request to be processed?',
    },
  ];

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
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

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
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p01.answer3,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p01.answer4,
            },
          ],
        },
      ];
      submitData('P01', userSubmission);
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
            isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, [`answer${index}`]: e.target.value } }));
    changeData('P01', 1, index, e.target.value);
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
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      onSubmit={submitAnswer}
      submitDisabled={
        !isNotEmptyString(cardData.p01.answer1) ||
        !isNotEmptyString(cardData.p01.answer2) ||
        !isNotEmptyString(cardData.p01.answer3) ||
        !isNotEmptyString(cardData.p01.answer4)
      }
      submitBtnColor={
        !isNotEmptyString(cardData.p01.answer1) ||
        !isNotEmptyString(cardData.p01.answer2) ||
        !isNotEmptyString(cardData.p01.answer3) ||
        !isNotEmptyString(cardData.p01.answer4)
          ? EStyleButtonTypes.SECONDARY
          : !cardData.p01.isSubmitted
          ? EStyleButtonTypes.PRIMARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      useExtend
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
                  <Box width={344} marginRight={24}>
                    <Typography>{value?.text}</Typography>
                  </Box>
                </>
                <Box flex={1}>
                  <Textarea
                    value={(cardData.p01 as IL02C09A03P1)[`answer${index}`] as string}
                    onChange={event => handleChange(event, index)}
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel={`${index}번 답 입력란`}
                    placeholder='내용을 넣어 주세요.'
                    width='100%'
                    height='92px'
                  />
                </Box>
              </Box>
            )}
          </List>
        </Content>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow && cardData.p01.isSubmitted}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시답안' />
          </Box>
          <Box marginTop='12px'>
            <p>{cardData.p01.solution1}</p>
            <p>{cardData.p01.solution2}</p>
            <p>{cardData.p01.solution3}</p>
            <p>{cardData.p01.solution4}</p>
          </Box>
        </Box>
      </BottomSheet>
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
