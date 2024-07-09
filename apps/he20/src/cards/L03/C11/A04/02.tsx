import { Box, TMainHeaderInfoTypes, Typography, Input, EStyleButtonTypes, BottomSheet, ETagLine, Tag, BoxWrap, Scroll } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';

import { studentAtom } from '@/stores/student';
import { useRecoilValue, useRecoilState } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { L03C11A04 } from './store';
import styled from '@emotion/styled';

const P02 = () => {
  const pageKey = 'p02';
  const pageNo = 'P02';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [isShow, setShow] = useState(false);
  const [cardData, setCardData] = useRecoilState(L03C11A04);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'C. Reading',
  };

  const questionInfo = {
    text: `2. Choose the one with a grammatical error among (a)-(d) and correct it.`,
  };

  const answer = ['(c) which', 'where'];

  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: false,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer1: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData[pageKey].answer2,
            isSubmitted,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const handleInputChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
    }
    changeData('P02', 1, subKey, value);
  };

  const onSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
    } else {
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageKey].answer1,
              isAnswer: false,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData[pageKey].answer2,
              isAnswer: false,
            },
          ],
        },
      ];
      submitData(pageNo, userSubmission);
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!(cardData[pageKey].answer1 && cardData[pageKey].answer2)}
      submitBtnColor={
        !(cardData[pageKey].answer1 && cardData[pageKey].answer2)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={onSubmit}
    >
      <BoxWrap useFull>
        <Box useFull useRound width='468px' lineHeight='48px' paddingRight='16px' marginRight='24px' background='white'>
          <Scroll tabIndex={0}>
            <Box>
              &nbsp;&nbsp;Born in a small Canadian town in 1903, Maud Lewis suffered from physical weaknesses such as distorted shoulders and fingers.
              <br /> <br />
              <CustomTextItem>
                <BoldText>(A)</BoldText> &nbsp;&nbsp;After marrying, the couple spent the rest of their lives there, and Lewis continued to paint. Her
                artwork used a mixture of bright and vivid oil paints and simple forms, <CustomUnderline>(a) generating</CustomUnderline> an original,
                innovative style. <CustomUnderline>(b) Although</CustomUnderline> her physical limitations confined her to a small cottage, her talent
                and imagination were both limitless.
              </CustomTextItem>
              <CustomTextItem>
                <BoldText>(B)</BoldText>&nbsp;&nbsp; This limited her mobility and caused her to drop out of school. To make a living, she began to
                paint and sell Christmas cards. When her parents passed away, Lewis went to live with her aunt in Digby,{' '}
                <CustomUnderline>(c) which</CustomUnderline> she met her future husband, Everett Lewis.
              </CustomTextItem>
              <CustomTextItem>
                <BoldText>(C)</BoldText> &nbsp;&nbsp;In <CustomFontType>Red Sleigh</CustomFontType>, red maple leaves appear on a special winter
                landscape, and <CustomFontType>Pair of Oxen</CustomFontType> shows decorated cows standing in a flower field. With these features,
                Lewis’ paintings create a magical quality, like <CustomUnderline>(d) that</CustomUnderline> of a fairy tale.
              </CustomTextItem>
            </Box>
          </Scroll>
        </Box>
        <Box useFull vAlign='center' flex='1'>
          <Box flexDirection='row' width='100%'>
            <Box>
              <Typography usePre>{`틀린 부분\n`}</Typography>
              <Input
                aria-label='틀린 부분'
                width='350px'
                maxLength={100}
                name='value1'
                placeholder='내용을 넣어 주세요.'
                value={cardData[pageKey].answer1}
                onChange={event => handleInputChange(1, event.target.value)}
                readOnly={cardData[pageKey].isSubmitted}
              />
            </Box>
            <Box marginTop='30px'>
              <Typography usePre>{`고친 내용\n`}</Typography>
              <Input
                aria-label='고친 내용'
                width='350px'
                maxLength={100}
                name='value2'
                placeholder='내용을 넣어 주세요.'
                value={cardData[pageKey].answer2}
                onChange={event => handleInputChange(2, event.target.value)}
                readOnly={cardData[pageKey].isSubmitted}
              />
            </Box>
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범 답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography useGap={false}>
              <Typography usePre>{`틀린 부분: ${answer[0]}\n고칠 내용: ${answer[1]}`}</Typography>
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;

const BoldText = styled.span`
  font-weight: var(--font-weight-bold);
`;

const CustomTextItem = styled.span`
  display: block;
  padding: 0 0 0 50px;
  text-indent: -50px;
`;
const CustomUnderline = styled.span`
  text-decoration: underline;
  text-underline-position: under;
`;
const CustomFontType = styled.span`
  font-style: italic;
  text-indent: 0;
`;
