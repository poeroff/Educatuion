import {
  BoxWrap,
  Box,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
  List,
  Label,
  Radio,
  EStyleButtonTypes,
  IQuestionProps,
  BottomSheet,
  ETagLine,
  Tag,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { L04C11A04 } from './store';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const [show, setShow] = useState<boolean>(false);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(L04C11A04);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'C. Reading',
  };

  const questionInfo: IQuestionProps = {
    text: '1. Which one best fits in the blank?',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
      ],
    },
  ];

  const data = [
    {
      text: 'we need to solve technical challenges first',
    },
    {
      text: 'many tricky ethical issues should be addressed',
    },
    {
      text: 'we need policies that support their commercial use',
    },
    {
      text: 'we should understand the benefits of AI technology',
    },
  ];

  const handleRowClick = (index: number) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: index } }));
    changeData('P01', 1, 1, index);
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!show);
    } else {
      const isCorrect = cardData.p01.answer === cardData.p01.solution;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p01.answer,
              isAnswer: true,
              isCorrect,
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
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
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

  const text = (
    <>
      &nbsp;&nbsp; Before we can fully embrace the era of AI-powered neural implants,
      <Typography type='blank' width='400px' title='빈칸' boxColor='var(--color-black)'></Typography>. The integration of AI technology with the human
      brain{' '}
      <Typography textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
        (A) raises / rises
      </Typography>{' '}
      concerns about what it means to be human. Our brains are believed to be central to our identity, existence, and value as human beings. However,
      an over-reliance on technology may delay our natural development and{' '}
      <Typography textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
        (B) create / creating
      </Typography>{' '}
      confusion about whether we are human, AI, or something in between. Another critical issue is privacy. There’s a risk{' '}
      <Typography textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
        (C) that / which
      </Typography>{' '}
      organizations or hackers could access personal data without permission through AI-connected implants. This means that our thoughts, emotions,
      and behaviors could be controlled by hackers.
    </>
  );

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p01.isSubmitted ? (show ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={cardData.p01.answer === 0}
      submitBtnColor={cardData.p01.answer !== 0 ? (show ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      onSubmit={handleSubmit}
    >
      <BoxWrap useFull>
        <Box useFull background='white' line-height='48px' useRound paddingRight='10px' marginRight='20px'>
          <Scroll>{text}</Scroll>
        </Box>
        <Box useFull>
          <List
            gap={24}
            data={data}
            row={({ value, index = 1 }) => (
              <Radio
                type={'square'}
                align='vertical'
                name={'radio-question-A'}
                label={value?.text}
                ariaLabel={index + '번 보기'}
                value={index === cardData.p01.answer}
                onClick={() => handleRowClick(index)}
                isError={cardData.p01.isSubmitted && cardData.p01.answer !== cardData.p01.solution}
                readOnly={cardData.p01.isSubmitted}
              >
                <Box>
                  <Label value={index} /> {value?.text}
                </Box>
              </Radio>
            )}
          />
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={show}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false}>{cardData.p01.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
