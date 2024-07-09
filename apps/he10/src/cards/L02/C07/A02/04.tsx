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
import { L02C07A02 } from './store';

import { textContentA02, imgContentA02P04 } from './commonData';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const DialogHeader = () => {
  const { title, subTitle } = textContentA02;
  return (
    <Box background={'gray'} height='50px' marginBottom='20px' useRound useFull>
      <Typography weight={'bold'} lineHeight='unset' size={EStyleFontSizes.MEDIUM}>
        {title}
        {'    '}
      </Typography>
      <Typography size={EStyleFontSizes.MEDIUM}>{subTitle}</Typography>
    </Box>
  );
};

const P04 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C07A02);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false]);

  const { content } = textContentA02;
  const { imgSrc, imgAlt } = imgContentA02P04;

  const [isMainTextOpen, setIsMainTextOpen] = useState(false);

  const currentPage = 'P04';

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
    const isCorrect = cardData.p04.answer.every((a, idx = 0) => a === cardData.p04.solution[idx]);
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p04.answer,
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
    const originalValue = cardData.p04.answer;
    const newValues = [...originalValue];

    if (newValue !== undefined) {
      newValues[index] = newValue;
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer: newValues } }));
    }
    changeData(currentPage, 1, 1, newValues);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Complete',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks to summarize the story',

    mark: getMarking(cardData.p04.isSubmitted, cardData.p04.isCorrect),
  };

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={
        Array.isArray(cardData.p04.answer) && cardData.p04.answer.some(value => value === '' || value === undefined)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      submitLabel={cardData.p04.isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      onSubmit={submitAnswer}
      submitDisabled={Array.isArray(cardData.p04.answer) && cardData.p04.answer.some(value => value === '' || value === undefined)}
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
            <Image type={EImageType.IMG} src={imgSrc} alt={imgAlt} height='250px' width='438px' />
          </PinchZoom>
        </Box>
        <Box marginLeft={'24px'} height={'342px'} width='50%' hAlign='center'>
          <Scroll height={'282px'} width={'434px'}>
            <Box hAlign='center'>
              <Typography weight={'bold'} size={EStyleFontSizes.MEDIUM}>
                Climax
              </Typography>
            </Box>
            <Box display='inline'>
              <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                To{' '}
              </Typography>
            </Box>
            <Box hAlign='flex' display='inline-flex'>
              <Typography>(4)</Typography>{' '}
              <Dropdown
                width='200px'
                dropdownList={cardData.p04.dropArr1}
                isOpen={openDropdown[0]}
                selectedValue={cardData.p04.answer[0]}
                readOnly={cardData.p04.isSubmitted}
                onClick={value => handleDropdownClick(0, value)}
                ariaLabel='4번째 답 선택칸'
                isError={cardData.p04.isSubmitted && cardData.p04.answer[0] !== cardData.p04.solution[0]}
              />
            </Box>
            <Box display='inline'>
              <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                the missing names, Nani Tama visited his old friend’s house in Murupara. The two old men recalled the{' '}
              </Typography>
            </Box>
            <Box hAlign='flex' display='inline-flex'>
              <Typography>(5)</Typography>{' '}
              <Dropdown
                width='225px'
                dropdownList={cardData.p04.dropArr2}
                isOpen={openDropdown[1]}
                selectedValue={cardData.p04.answer[1]}
                readOnly={cardData.p04.isSubmitted}
                onClick={value => handleDropdownClick(1, value)}
                ariaLabel='5번째 답 선택칸'
                isError={cardData.p04.isSubmitted && cardData.p04.answer[1] !== cardData.p04.solution[1]}
              />
            </Box>
            <Box display='inline'>
              <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                and they finally finished the whakapapa.
              </Typography>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='container' height={'30%'} show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='10px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box>
            {cardData.p04.solution.map((ans, idx) => {
              return <Box key={idx} margin='10px'>{`(${idx + 4}) ${ans}    `}</Box>;
            })}
          </Box>
        </Box>
      </BottomSheet>
      <Dialog
        useHeader
        header={DialogHeader}
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
              <Typography useGap={true} weight={'normal'} size={EStyleFontSizes.MEDIUM} style={{ marginBottom: '20px' }}>
                {paragraph}
              </Typography>
              {index !== arr.length - 1}
            </React.Fragment>
          ))}
        </Typography>
      </Dialog>
    </Container>
  );
};

export default P04;

const CustomButtonLabel = styled.span`
  font-size: 16px;
  font-weight: var(--font-weight-bold);
  color: #6a6d73;
  line-height: 24px;
  white-space: nowrap;
`;
