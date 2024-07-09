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
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L03C07A02 } from './store';

import { textContentA02, imgContentA02P03 } from './commonData';
import { getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C07A02);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false]);

  const { title, subTitle, content, subTitleIndexes } = textContentA02;
  const { imgSrc, imgAlt } = imgContentA02P03;

  const [isMainTextOpen, setIsMainTextOpen] = useState(false);

  const currentPage = 'P03';

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', ''],
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
    const isCorrect = cardData.p03.answer.every((a, idx = 0) => a === cardData.p03.solution[idx]);
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p03.answer,
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
    const originalValue = cardData.p03.answer;
    const newValues = [...originalValue];

    if (newValue !== undefined) {
      newValues[index] = newValue;
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: newValues } }));
    }
    changeData(currentPage, 1, 1, newValues);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Complete',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks to summarize the main text.',
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
  };

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={
        cardData.p03.answer.every(isNotEmptyString) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      onSubmit={submitAnswer}
      submitDisabled={!cardData.p03.answer.every(isNotEmptyString)}
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
            <Box hAlign='center' width={'400px'}>
              <Typography>(3)</Typography>
              <Dropdown
                width='190px'
                dropdownList={cardData.p03.dropArr1}
                isOpen={openDropdown[0]}
                selectedValue={cardData.p03.answer[0]}
                readOnly={cardData.p03.isSubmitted}
                onClick={value => handleDropdownClick(0, value)}
                ariaLabel='3번째 답 선택칸'
                isError={cardData.p03.isSubmitted && cardData.p03.answer[0] !== cardData.p03.solution[0]}
              />
              <Typography weight={'bold'} size={EStyleFontSizes.MEDIUM}>
                Interference
              </Typography>
            </Box>
            <Box display='inline'>
              <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                The peak of one sound wave overlaps with the
              </Typography>
            </Box>
            <Box hAlign='flex' display='inline-flex'>
              <Typography>(4)</Typography>
              <Dropdown
                width='220px'
                dropdownList={cardData.p03.dropArr2}
                isOpen={openDropdown[1]}
                selectedValue={cardData.p03.answer[1]}
                readOnly={cardData.p03.isSubmitted}
                onClick={value => handleDropdownClick(1, value)}
                ariaLabel='4번째 답 선택칸'
                isError={cardData.p03.isSubmitted && cardData.p03.answer[1] !== cardData.p03.solution[1]}
              />
              <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                of
              </Typography>
            </Box>
            <Box display='inline'>
              <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                another wave, which results in a quieter sound silence.
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
              <Typography useGap={true} weight={!subTitleIndexes.has(index) ? 'normal' : 'bold'} size={EStyleFontSizes.MEDIUM}>
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
            {cardData.p03.solution.map((ans, idx) => {
              return <Box key={idx} margin='10px'>{`(${idx + 3}) ${ans}    `}</Box>;
            })}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;

const CustomButtonLabel = styled.span`
  font-size: 16px;
  font-weight: var(--font-weight-bold);
  color: #6a6d73;
  line-height: 24px;
  white-space: nowrap;
`;
