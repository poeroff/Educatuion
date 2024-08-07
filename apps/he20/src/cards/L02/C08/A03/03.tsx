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

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C08A03);
  const [isShow, setIsShow] = useState<boolean>(false);

  const currentPage = 'P03';

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
          p03: {
            ...prev.p03,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData.p03.isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
    const isCorrect = cardData.p03.answer === cardData.p03.solution;

    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p03.answer,
            isAnswer: true,
            isCorrect: cardData.p03.isCorrect,
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
      p03: {
        ...prev.p03,
        answer: value,
      },
    }));
    changeData(currentPage, 1, 1, value);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Practice',
  };

  const questionInfo: IQuestionProps = {
    text: 'Choose the grammatically correct words.',
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!isNotEmptyString(cardData.p03.answer)}
      submitBtnColor={
        !isNotEmptyString(cardData.p03.answer) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
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
          <Typography>3. Alice was the only one who can drive. She</Typography>
          <Dropdown
            width={`185px`}
            dropdownList={cardData.p03.dropArr}
            isOpen={openDropdown[0]}
            selectedValue={cardData.p03.answer}
            isError={cardData.p03.isSubmitted && !cardData.p03.isCorrect}
            readOnly={cardData.p03.isSubmitted}
            onClick={value => handleDropdownClick(0, value)}
            ariaLabel='답란'
          />
          <Typography>have</Typography>
        </Box>
        <Box vAlign='center' hAlign={'flex-start'}>
          <Typography>driven her family here.</Typography>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box hAlign='left' margin='20px 5px'>
            {cardData.p03.solution}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
