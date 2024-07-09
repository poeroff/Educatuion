import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import {
  Box,
  BoxWrap,
  Button,
  Dialog,
  Dropdown,
  EImageType,
  EStyleButtonTypes,
  EStyleFontSizes,
  Image,
  PinchZoom,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
  BottomSheet,
  IQuestionProps,
  ETagLine,
  Tag,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L03C07A02 } from './store';

import { textContentA02, imgContentA02P05 } from './commonData';
import { getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P05 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C07A02);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false]);

  const { title, subTitle, content, subTitleIndexes } = textContentA02;
  const { imgSrc, imgAlt } = imgContentA02P05;

  const [isMainTextOpen, setIsMainTextOpen] = useState(false);
  const currentPage = 'P05';

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: [''],
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
          p05: {
            ...prev.p05,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p05.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData.p05.isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
    const isCorrect = cardData.p05.answer.every((a, idx = 0) => a === cardData.p05.solution[idx]);
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p05.answer,
            isAnswer: true,
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

  const handleButtonClick = () => {
    setIsMainTextOpen(true);
  };

  const handleDialogClose = () => {
    setIsMainTextOpen(false);
  };

  const handleDropdownClick = (index: number, newValue: string | undefined) => {
    setOpenDropdown(openDropdown.map((val, idx) => idx === index));
    const originalValue = cardData.p05.answer;
    const newValues = [...originalValue];

    if (newValue !== undefined) {
      newValues[index] = newValue;
      setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer: newValues } }));
    }
    changeData(currentPage, 1, 1, newValues);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Complete',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks to summarize the main text.',
    mark: getMarking(cardData.p05.isSubmitted, cardData.p05.isCorrect),
  };

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={
        cardData.p05.answer.every(isNotEmptyString) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
      submitLabel={cardData.p05.isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      onSubmit={submitAnswer}
      submitDisabled={!cardData.p05.answer.every(isNotEmptyString)}
      vAlign={'flex-start'}
    >
      <Box hAlign='flex-end' vAlign='flex-start'>
        <Button width='96px' color={EStyleButtonTypes.TERTIARY} style={{ height: '44px' }} onClick={handleButtonClick}>
          <CustomButtonLabel>지문 보기</CustomButtonLabel>
        </Button>
      </Box>
      <BoxWrap>
        <Box width={'50%'} hAlign={'center'} height={'342px'}>
          <PinchZoom>
            <Image type={EImageType.IMG} src={imgSrc} height='285px' width='243px' />
            <Box type='hidden' id='img_desc'>
              {imgAlt}
            </Box>
          </PinchZoom>
        </Box>
        <Box marginLeft={'24px'} height={'342px'} width='50%' hAlign='center'>
          <Scroll height={'282px'} width={'434px'}>
            <Box hAlign='center'>
              <Typography useGap={true} weight={'bold'} size={EStyleFontSizes.MEDIUM}>
                Noise Cancelling Headphone
              </Typography>
            </Box>
            <Box hAlign='center'>
              <Typography weight={'bold'} textDecoration='underline' style={{ textUnderlinePosition: 'under' }} size={EStyleFontSizes.MEDIUM}>
                Noise-Cancelling Circuity
              </Typography>
            </Box>
            <Box>
              <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                analyzes the sounds that the microphones detect and
              </Typography>
            </Box>
            <Box hAlign='flex' display='inline-flex'>
              <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                generates
              </Typography>
              <Typography>(6)</Typography>{' '}
              <Dropdown
                width='200px'
                dropdownList={cardData.p05.dropArr}
                isOpen={openDropdown[0]}
                selectedValue={cardData.p05.answer[0]}
                readOnly={cardData.p05.isSubmitted}
                onClick={value => handleDropdownClick(0, value)}
                ariaLabel='6번째 답 선택칸'
                isError={cardData.p05.isSubmitted && cardData.p05.answer[0] !== cardData.p05.solution[0]}
              />
            </Box>
            <Box display='inline'>
              <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                sound waves
              </Typography>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>
      <Dialog
        useHeader
        header={() => {
          return (
            <Box background={'gray'} height='50px' marginBottom='20px' useRound useFull>
              <Typography weight={'bold'} lineHeight='unset' size={EStyleFontSizes.MEDIUM}>
                {subTitle}
              </Typography>
              <Typography weight={'bold'} lineHeight='unset' size={EStyleFontSizes.MEDIUM}>
                {title}
              </Typography>
            </Box>
          );
        }}
        topHeight={50}
        width={893}
        height={458}
        isShow={isMainTextOpen}
        onClose={handleDialogClose}
        useFooter={true}
        closeLabel={'지문 닫기'}
      >
        <Typography>
          {content.split('\n').map((paragraph, index, arr) => (
            <React.Fragment key={index}>
              <Typography weight={!subTitleIndexes.has(index) ? 'normal' : 'bold'} size={EStyleFontSizes.MEDIUM} style={{ marginBottom: '20px' }}>
                {paragraph}
              </Typography>
              {index !== arr.length - 1}
            </React.Fragment>
          ))}
        </Typography>
      </Dialog>
      <BottomSheet bottomSheetTargetId='container' height={'30%'} show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='10px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box>
            {cardData.p05.solution.map((ans, idx) => {
              return <Box key={idx} margin='10px'>{`(${idx + 6}) ${ans}    `}</Box>;
            })}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P05;

const CustomButtonLabel = styled.span`
  font-size: 16px;
  font-weight: var(--font-weight-bold);
  color: #6a6d73;
  line-height: 24px;
  white-space: nowrap;
`;