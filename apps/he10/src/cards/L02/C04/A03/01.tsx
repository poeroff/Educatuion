import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  Input,
  List,
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { L02C04A03 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C04A03);
  const [showAns, setShowAns] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Step 1. Think and Plan',
  };

  const questionInfo = {
    text: 'Answer the questions to prepare for an interview with a writer.',
  };

  const handleChange = (index: number, value: string) => {
    const updatedAnswers = cardData.p01.answer?.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        answer: updatedAnswers,
      },
    }));
    changeData('P01', 1, 1, updatedAnswers);
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', '', ''],
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
            answer: userSubmissionList[0].inputData[0].value || cardData.p01.answer,
            isSubmitted,
          },
        }));
      } else {
        initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
      }
    }
  };

  const handleSubmit = async () => {
    if (cardData.p01.isSubmitted) {
      setShowAns(!showAns);
      return;
    } else {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.p01.answer,
              isAnswer: true,
            },
          ],
        },
      ];
      submitData('P01', userSubmission);
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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={handleSubmit}
      submitBtnColor={
        !cardData.p01.answer?.some(value => value === '' || value === undefined)
          ? showAns
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
      submitLabel={cardData.p01.isSubmitted ? (showAns ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!cardData.p01.answer?.every(val => val)}
      vAlign='flex-start'
    >
      <List data={cardData.p01.contents || []} gap={20}>
        {({ value: item, index = 0 }) => (
          <Box key={Number(index)}>
            <Typography key={Number(index + 10)}>{item}</Typography>
            <Box key={Number(index + 20)} marginTop={'8px'} paddingLeft={'40px'}>
              <Input
                width='100%'
                value={cardData.p01.answer?.[index - 1] || ''}
                textAlign='left'
                placeholder='내용을 넣어 주세요.'
                readOnly={cardData.p01.isSubmitted}
                onChange={e => handleChange(index - 1, e.target.value)}
                maxLength={200}
                ariaLabel={`${index + 1}번 답 입력란`}
              />
            </Box>
          </Box>
        )}
      </List>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAns}>
        <Box background='lightGray' borderRadius='12px' marginTop='20px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시 답안' />
          </Box>
          <Box marginTop='12px'>
            {cardData.p01.solutions?.map((value, index) => (
              <Typography usePre>{`(${index + 1}) ${value}`}</Typography>
            ))}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
