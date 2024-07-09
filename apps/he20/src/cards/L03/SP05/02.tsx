import React, { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Box, TMainHeaderInfoTypes, Textarea, Typography, ETagLine, Tag, EStyleButtonTypes, BottomSheet } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L03SP05 } from './store';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03SP05);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '자유 영작',
  };

  const questionInfo = {
    text: '다음 질문에 대해 나의 답변을 자유롭게 써 봅시다.',
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
  ];

  const onSubmitText = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer,
            },
          ],
        },
      ];
      submitData('P02', userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: e.target.value } }));
    changeData('P02', 1, 1, e.target.value);
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

  return (
    <Container
          bodyId='targetContainer'
          headerInfo={headerInfo}
          questionInfo={questionInfo}
          submitBtnColor={
            !(cardData.p02.answer && isNotEmptyString(cardData.p02.answer))
              ? EStyleButtonTypes.SECONDARY
              : isShow
              ? EStyleButtonTypes.GRAY
              : EStyleButtonTypes.PRIMARY
          }
          submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
          submitDisabled={!(cardData.p02.answer && isNotEmptyString(cardData.p02.answer))}
          onSubmit={onSubmitText}
      >
      <Box vAlign='center' marginTop='20px' width='880px' tabIndex={101} flexDirection='column' gap='8px'>
        <Typography> What was the biggest challenge in your life and how did you overcome it? Write a short paragraph about it, using key expressions you learned in this lesson. </Typography>
      </Box>

      <Box height='220px' marginTop='10px' useFull>
        <Textarea
          width='100%'
          height='100%'
          placeholder='내용을 넣어 주세요.'
          onChange={handleInputChange}
          readOnly={cardData.p02.isSubmitted}
          tabIndex={102}
          ariaLabel='답란'
          value={cardData.p02.answer}
        />
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShow && cardData.p02.isSubmitted}>
      <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box tabIndex={102}>
            <Tag type={ETagLine.GREEN} label='예시 답안' />
          </Box>
          <Box vAlign='flex-start' marginTop='10px' textAlign='left' tabIndex={103} flexDirection='column' gap='10px'>
            <Typography> {cardData.p02.exampleAnswerEng} </Typography>
            <Box tabIndex={102} marginTop='20px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
            <Typography> {cardData.p02.questionKor} </Typography>
            <Typography> {cardData.p02.exampleAnswerKor} </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
