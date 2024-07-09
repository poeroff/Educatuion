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
import { L02C08A03 } from './store';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C08A03);
  const [isShow, setIsShow] = useState<boolean>(false);

  const currentPage = 'P01';

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
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
    const isCorrect = cardData.p01.answer === cardData.p01.solution;

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer,
            isAnswer: true,
            isCorrect: cardData.p01.isCorrect,
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

    if (value === undefined) {
      return;
    }

    const updatedAnswers = value;
    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        answer: updatedAnswers,
      },
    }));
    changeData(currentPage, 1, 1, updatedAnswers);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Practice',
  };

  const questionInfo: IQuestionProps = {
    text: 'Choose the grammatically correct words.',
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!isNotEmptyString(cardData.p01.answer)}
      submitBtnColor={
        !isNotEmptyString(cardData.p01.answer) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      onSubmit={submitAnswer}
      vAlign='center'
    >
      <Box>
        <Box>
          <TextView title='보기'>
            <PinchZoom>
              <Image src={'/L02/C08/A03/HE2-L02-C08-A03-P01.jpg'} width={'900px'} alt='' ariaDescribedby='img_desc' />
            </PinchZoom>
            <Box type='hidden' id='img_desc'>
              <p>이 이미지는 퍼즐 조각 모양으로 나뉜 텍스트를 보여준다. 각 조각은 다음과 같은 문장을 구성한다:</p>
              <p>첫 번째 조각: "If you have,"</p>
              <p>두 번째 조각: "then you may have fallen prey to a dark pattern." (may have fallen은 빨간색 글씨로 작성됨)</p>
              <p>이 조각들이 합쳐져서 "If you have, then you may have fallen prey to a dark pattern."라는 문장이 된다.</p>
            </Box>
          </TextView>
        </Box>
      </Box>
      <BoxWrap height='100px' flexDirection='column' marginTop={'30px'} marginBottom={'70px'}>
        <Box vAlign='center' hAlign={'flex-start'}>
          <Typography>1. My phone isn’t in my bag. I may</Typography>
          <Dropdown
            width={`211px`}
            dropdownList={cardData.p01.dropArr}
            isOpen={openDropdown[0]}
            selectedValue={cardData.p01.answer}
            isError={cardData.p01.isSubmitted && !cardData.p01.isCorrect}
            readOnly={cardData.p01.isSubmitted}
            onClick={value => handleDropdownClick(0, value)}
            ariaLabel='답란'
          />
          <Typography>it at the library.</Typography>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box hAlign='left' margin='20px 5px'>
            {cardData.p01.solution}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
