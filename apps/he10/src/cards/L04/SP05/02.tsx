import React, { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Box, TMainHeaderInfoTypes, Textarea, Typography, ETagLine, Tag, EStyleButtonTypes, BottomSheet } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L04SP05 } from './store';

const P02 = ({ _page = 'P02' }: { _page?: string }) => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04SP05);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 자유 영작',
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
      submitData(_page, userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page)?.pageId;
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
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: e.target.value } }));
    changeData(_page, 1, 1, e.target.value);
  };

  useEffect(() => {
    return () => {
      saveData(_page);
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
      <Box vAlign='center' marginTop='20px' textAlign='center' tabIndex={101} flexDirection='column' gap='8px'>
        <Typography weight='bold'>
          Write a short paragraph about what we can do in our daily life to reduce waste. Use key expressions you learned in this lesson.
        </Typography>
      </Box>

      <Box height='220px' marginTop='20px' useFull>
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
          <Box tabIndex={103}>
            <Tag type={ETagLine.GREEN} label='예시 답안' />
          </Box>
          <Box vAlign='flex-start' marginTop='10px' textAlign='left' tabIndex={104} flexDirection='column' gap='10px'>
            <Typography> {cardData.p02.exampleAnswerEng} </Typography>
            <Typography> {cardData.p02.exampleAnswerKor} </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
