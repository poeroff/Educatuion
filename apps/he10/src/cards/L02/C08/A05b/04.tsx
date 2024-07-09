import React, { useEffect, useState } from 'react';
import {
  Box,
  BoxWrap,
  Dropdown,
  EStyleButtonTypes,
  Image,
  TMainHeaderInfoTypes,
  Typography,
  IQuestionProps,
  BottomSheet,
  Tag,
  ETagLine,
  TextView,
  PinchZoom,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L02C08A05b } from './store';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P04 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C08A05b);
  const [isShow, setIsShow] = useState<boolean>(false);

  const currentPage = 'P04';

  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false]);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
          isCorrect: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p04.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData.p04.isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
    const isCorrect = cardData.p04.answer === cardData.p04.solution;

    setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p04.answer,
            isAnswer: true,
            isCorrect: cardData.p04.isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(currentPage, userSubmission, isCorrect);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  const handleDropdownClick = (index: number, value: string | undefined) => {
    setOpenDropdown(openDropdown.map((val, idx) => idx === index));
    if (value === undefined) return;
    setCardData(prev => ({
      ...prev,
      p04: {
        ...prev.p04,
        answer: value,
      },
    }));
    changeData(currentPage, 1, 1, value);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 2 : Practice',
  };

  const questionInfo: IQuestionProps = {
    text: 'Choose the grammatically correct words.',
    mark: cardData.p04.isSubmitted ? (cardData.p04.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p04.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!isNotEmptyString(cardData.p04.answer)}
      submitBtnColor={
        !isNotEmptyString(cardData.p04.answer) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      onSubmit={submitAnswer}
      vAlign='center'
    >
      <Box>
        <Box>
          <TextView title='보기'>
            <PinchZoom>
              <Image src={'/L02/C08/A05/HE1-L02-C08-A05-P01.jpg'} width={'900px'} alt='' ariaDescribedby='img_desc' />
            </PinchZoom>
            <Box type='hidden' id='img_desc'>
              <p>이미지에는 문장이 퍼즐 조각처럼 나뉘어져 있다:</p>
              <p>첫 번째 조각: "I felt"</p>
              <p>두 번째 조각: "as if people from the past were looking over the shoulders of the old men."</p>
              <p>문장 아래에 회색 글씨로 추가 설명이 있다: "(→ In fact, they were not looking.)"</p>
            </Box>
          </TextView>
        </Box>
      </Box>

      <BoxWrap height='100px' flexDirection='column' marginTop={'30px'} marginBottom={'70px'}>
        <Box vAlign='center' hAlign={'flex-start'}>
          <Typography>4. The woods where I got lost seemed as if fairies</Typography>
          <Dropdown
            width={`211px`}
            dropdownList={cardData.p04.dropArr}
            isOpen={openDropdown[0]}
            selectedValue={cardData.p04.answer}
            isError={cardData.p04.isSubmitted && !cardData.p04.isCorrect}
            readOnly={cardData.p04.isSubmitted}
            onClick={value => handleDropdownClick(0, value)}
            ariaLabel='답란'
          />
        </Box>
        <Box vAlign='center' hAlign={'flex-start'}>
          <Typography>in them.</Typography>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box hAlign='left' margin='20px 5px'>
            {cardData.p04.solution}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P04;
