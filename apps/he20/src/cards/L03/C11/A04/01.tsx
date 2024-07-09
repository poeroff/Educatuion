import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { Box, TMainHeaderInfoTypes, List, Label, Radio, IQuestionProps, BoxWrap, Scroll, Typography } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C11A04 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import styled from 'styled-components';
import HE02901, { IContentList } from '@maidt-cntn/pages/HE-029-01-API';

const P01 = () => {
  const pageKey = 'p01';
  const pageNo = 'P01';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C11A04);
  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: -1,
          isAnswer: false,
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'C. Reading',
  };
  const questionInfo: IQuestionProps = {
    text: '1. Choose the correct order of (A) – (C).',
    mark: getMarking(cardData[pageKey].isSubmitted, cardData[pageKey].isCorrect),
  };

  const data = ['(A) – (C) – (B)', '(B) – (A) – (C)', '(B) – (C) – (A)', '(C) – (B) – (A)'];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const handleRadioClick = (index: number) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: index } }));
    changeData(pageNo, 1, 1, index);
  };

  const onSubmit = () => {
    const isCorrect = cardData[pageKey].answer === cardData[pageKey].solution;
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData[pageKey].answer,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageNo, userSubmission, isCorrect);
  };

  const nodeData: IContentList[] = [
    {
      children: (
        <Box background='white' useRound borderRadius={8} marginBottom={'15px'} paddingRight={'4px'} gap={4} width={'468px'}>
          <Scroll tabIndex={0}>
            &nbsp;&nbsp;Born in a small Canadian town in 1903, Maud Lewis suffered from physical weaknesses such as distorted shoulders and fingers.
            <br /> <br />
            <CustomTextItem>
              <BoldText>(A)</BoldText>&nbsp;&nbsp;After marrying, the couple spent the rest of their lives there, and Lewis continued to paint. Her
              artwork used a mixture of bright and vivid oil paints and simple forms, <CustomUnderline>(a) generating</CustomUnderline> an original,
              innovative style. <CustomUnderline>(b)&nbsp;&nbsp;Although</CustomUnderline> her physical limitations confined her to a small cottage,
              her talent and imagination were both limitless.
            </CustomTextItem>
            <CustomTextItem>
              <BoldText>(B)</BoldText>&nbsp;&nbsp;This limited her mobility and caused her to drop out of school. To make a living, she began to paint
              and sell Christmas cards. When her parents passed away, Lewis went to live with her aunt in Digby,{' '}
              <CustomUnderline>(c) which</CustomUnderline> she met her future husband, Everett Lewis.
            </CustomTextItem>
            <CustomTextItem>
              <BoldText>(C)</BoldText>&nbsp;&nbsp;In <CustomFontType>Red Sleigh</CustomFontType>, red maple leaves appear on a special winter
              landscape, and <CustomFontType>Pair of Oxen</CustomFontType> shows decorated cows standing in a flower field. With these features,
              Lewis’ paintings create a magical quality, like <CustomUnderline>(d) that</CustomUnderline> of a fairy tale.
            </CustomTextItem>
          </Scroll>
        </Box>
      ),
    },
    {
      children: (
        <Scroll tabIndex={1}>
          <Box useFull alignContent='center' height='398px'>
            <List
              gap={10}
              data={data}
              align={'vertical'}
              row={({ value, index = 1 }) => (
                <Radio
                  key={`1${index}2`}
                  type={'square'}
                  align={'vertical'}
                  name={'radio-question-A'}
                  label={value}
                  value={index === cardData[pageKey].answer}
                  defaultValue={index === cardData[pageKey].answer}
                  isError={cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect}
                  onClick={() => handleRadioClick(index)}
                  readOnly={cardData[pageKey].isSubmitted}
                  ariaLabel={`${index}번 보기`}
                >
                  <BoxWrap key={`2${index}3`} alignItems='baseline'>
                    <Label key={`3${index}4`} value={index} />
                    <Typography key={`4${index}5`}>{value}</Typography>
                  </BoxWrap>
                </Radio>
              )}
            />
          </Box>
        </Scroll>
      ),
    },
  ];

  return (
    <HE02901
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      nodeData={nodeData}
      answer={cardData[pageKey].answer}
      solution={{ correctAnswer: cardData[pageKey].solution }}
      isSubmitted={cardData[pageKey].isSubmitted}
      onSubmit={onSubmit}
    />
  );
};

export default P01;

const CustomTextItem = styled.span`
  display: block;
  padding: 0 0 0 50px;
  text-indent: -50px;
`;
const CustomUnderline = styled.span`
  text-decoration: underline;
  text-underline-position: under;
`;
const BoldText = styled.span`
  font-weight: var(--font-weight-bold);
`;
const CustomFontType = styled.span`
  font-style: italic;
  text-indent: 0;
`;
