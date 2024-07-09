import styled from '@emotion/styled';
import { Box, TMainHeaderInfoTypes, ESvgType, SvgIcon, IQuestionProps, Typography, Input, EStyleButtonTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import RightArrowIcon from '@maidt-cntn/assets/icons/simple_right_arrow.svg';
import { useEffect } from 'react';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C08A04 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const pageNo = 'P02';

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C08A04);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 2',
  };
  const questionInfo: IQuestionProps = {
    text: 'Discovering the Patterns',
  };
  const emphasisBlue = { color: 'var(--color-blue-800)', weight: 'var(--font-weight-bold)', title: '파란색 글씨' };
  const emphasisRed = { color: 'var(--color-red-800)', weight: 'var(--font-weight-bold)', title: '빨간색 글씨' };

  const question = 'What is the function of "that" in the sentences?';

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
  ];

  const isSubmitDisabled = !isNotEmptyString(cardData[pageNo].answer);

  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, [pageNo]: { ...prev[pageNo], answer: value } }));
    changeData(pageNo, 1, 1, value);
  };

  const handleSubmit = () => {
    if (cardData[pageNo].isSubmitted) {
      return;
    }
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[pageNo].answer,
          },
        ],
      },
    ];
    setCardData(prev => ({ ...prev, [pageNo]: { ...prev[pageNo], isSubmitted: true } }));
    submitData(pageNo, userSubmission);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageNo]: {
            ...prev[pageNo],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageNo].answer,
            isSubmitted,
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

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      useExtend
      submitLabel='완료하기'
      submitBtnColor={isSubmitDisabled || cardData[pageNo].isSubmitted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      submitDisabled={isSubmitDisabled || cardData[pageNo].isSubmitted}
      onSubmit={handleSubmit}
    >
      <Box vAlign='center' display='inline' alignContent='center' padding='20px' background='white' useRound boxGap={0}>
        <Box vAlign='flex-start' gap='4px'>
          <SvgIcon src={RightArrowIcon} type={ESvgType.IMG} />
          <Box>
            <Sentence {...emphasisBlue}>The fact</Sentence>
            <Sentence {...emphasisRed}> that</Sentence>
            <Sentence {...emphasisBlue}> Dokdo belongs to Korea</Sentence>
            <Sentence> should be known to the world.</Sentence>
          </Box>
        </Box>

        <Box vAlign='flex-start' gap='4px' marginTop='30px'>
          <SvgIcon src={RightArrowIcon} type={ESvgType.IMG} />
          <Box>
            <Sentence>I was surprised at</Sentence>
            <Sentence {...emphasisBlue}> the news</Sentence>
            <Sentence {...emphasisRed}> that</Sentence>
            <Sentence {...emphasisBlue}> George didn't make it do the final.</Sentence>
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography>{question}</Typography>
        <Box marginTop={'8px'} paddingLeft={'40px'}>
          <Input
            width='100%'
            value={cardData[pageNo].answer}
            onChange={e => handleChange(e.target.value)}
            maxLength={999}
            placeholder='내용을 넣어 주세요.'
            readOnly={cardData[pageNo].isSubmitted}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default P02;

const Sentence = styled.span<{ color?: string; weight?: string }>`
  color: ${({ color }) => color};
  font-weight: ${({ weight }) => weight};
  line-height: 1.2;
`;
