import styled from '@emotion/styled';
import React, { useEffect, useState, useRef } from 'react';
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
  IQuestionProps,
  BottomSheet,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { textContentA02, imgContentA02P03 } from './commonData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L02C07A02 } from './store';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C07A02);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false]);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

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

  const { title, content, subTitleIndexes } = textContentA02;
  const { imgSrc, imgAlt } = imgContentA02P03;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Complete',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks to summarize the main text.',
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
  };

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
            isCorrect: isCorrect,
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
    lastFocusedElementRef.current = document.activeElement as HTMLElement;
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    if (lastFocusedElementRef.current) {
      lastFocusedElementRef.current.focus();
    }
  };

  const handleDropdownClick = (index: number, value: string | undefined) => {
    setOpenDropdown(openDropdown.map((val, idx) => idx === index));
    const updatedAnswers = cardData.p03.answer.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        answer: value ? updatedAnswers : prev.p03.answer,
      },
    }));
    changeData(currentPage, 1, 1, value ? updatedAnswers : cardData.p03.answer);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={Array.isArray(cardData.p03.answer) && cardData.p03.answer.some(value => value === '' || value === undefined)}
      submitBtnColor={
        Array.isArray(cardData.p03.answer) && cardData.p03.answer.some(value => value === '' || value === undefined)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={submitAnswer}
      vAlign='center'
    >
      <Box hAlign='flex-end' vAlign='flex-start' marginBottom='8px'>
        <Button tabIndex={101} width='96px' color={EStyleButtonTypes.TERTIARY} style={{ height: '44px' }} onClick={handleButtonClick}>
          <CustomButtonLabel>지문 보기</CustomButtonLabel>
        </Button>
      </Box>

      <BoxWrap>
        <Box width={'30%'} hAlign={'center'} height={'342px'}>
          <PinchZoom>
            <Image type={EImageType.IMG} src={imgSrc} alt={imgAlt} width='100%' />
          </PinchZoom>
        </Box>
        <Box marginLeft={'24px'} width={'70%'} height={'342px'} hAlign='center'>
          <Scroll tabIndex={0}>
            <Box display='flex' justifyContent='center'>
              <Typography weight={'bold'} size={EStyleFontSizes.MEDIUM}>
                Meaning
              </Typography>
            </Box>
            <Box marginTop={'20px'}>
              <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                Deceptive designs used on websites
              </Typography>
            </Box>
            <Box display='inline-flex'>
              <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                and applications to
              </Typography>
            </Box>
            <Box hAlign='flex' display='inline-flex'>
              <Typography useGap={false}> 2)</Typography>
              <Dropdown
                readOnly={cardData.p03.isSubmitted}
                width='264px'
                dropdownList={cardData.p03.dropArr1}
                selectedValue={cardData.p03.answer[0]}
                isOpen={openDropdown[0]}
                onClick={value => handleDropdownClick(0, value)}
                ariaLabel='2번째 답 선택칸'
                isError={cardData.p03.isSubmitted && cardData.p03.answer[0] !== cardData.p03.solution[0]}
              />
            </Box>
            <Box marginTop={'20px'} display='inline-flex'>
              <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                users into making
              </Typography>
            </Box>
            <Box hAlign='flex' display='inline-flex'>
              <Typography useGap={false}> 3)</Typography>
              <Dropdown
                readOnly={cardData.p03.isSubmitted}
                width='264px'
                dropdownList={cardData.p03.dropArr2}
                selectedValue={cardData.p03.answer[1]}
                isOpen={openDropdown[1]}
                onClick={value => handleDropdownClick(1, value)}
                ariaLabel='3번째 답 선택칸'
                isError={cardData.p03.isSubmitted && cardData.p03.answer[1] !== cardData.p03.solution[1]}
                type='up'
              />
            </Box>
            <Box>
              <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                decisions
              </Typography>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>

      <Dialog
        tabIndex={102}
        width={893}
        height={458}
        topHeight={50}
        useHeader
        header={() => (
          <Box height='50px' marginBottom='20px' background={'gray'} useRound={true}>
            <Typography useGap={false} weight={'bold'} size={EStyleFontSizes.MEDIUM}>
              {title}
            </Typography>
          </Box>
        )}
        isShow={isDialogOpen}
        onClose={handleDialogClose}
        useFooter={true}
        closeLabel={'지문 닫기'}
      >
        {content.split('\n').map((paragraph, index, arr) => (
          <React.Fragment key={index}>
            <Typography useGap={false} weight={!subTitleIndexes.has(index) ? 'normal' : 'bold'} size={EStyleFontSizes.MEDIUM}>
              {paragraph}
            </Typography>
            <br />
            {index !== arr.length - 1 && <br />}
          </React.Fragment>
        ))}
      </Dialog>

      <BottomSheet bottomSheetTargetId='targetContainer' height={'40%'} show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false}>
              {cardData.p03.solution.map((elem, idx) => (
                <React.Fragment key={idx}>
                  ({idx + 2}) {elem}
                  <br />
                </React.Fragment>
              ))}
            </Typography>
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
