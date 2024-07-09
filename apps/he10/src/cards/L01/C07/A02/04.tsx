import styled from '@emotion/styled';
import { useEffect, useState, useRef } from 'react';
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
  SvgIcon,
  IQuestionProps,
  BottomSheet,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L01C07A02 } from './store';

import arrow_right from '@/assets/icon/arrow_right.svg';
import { imageAltA02 } from '@/cards/L01/C07/commonData';
import ContentInfo from '../A03/contentInfo';

const P04 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C07A02);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false, false]);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  const currentPage = 'P04';

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', ''],
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
    const updatedAnswers = cardData.p04.answer.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      p04: {
        ...prev.p04,
        answer: updatedAnswers,
      },
    }));
    changeData(currentPage, 1, 1, updatedAnswers);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Complete',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Choose the correct words to summarize the main text.',
    mark: cardData.p04.isSubmitted ? (cardData.p04.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p04.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={Array.isArray(cardData.p04.answer) && cardData.p04.answer.some(value => value === '' || value === undefined)}
      submitBtnColor={
        Array.isArray(cardData.p04.answer) && cardData.p04.answer.some(value => value === '' || value === undefined)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={submitAnswer}
      vAlign='center'
    >
      <Box width={920}>
        <Box hAlign='flex-end'>
          <Button width='96px' color={EStyleButtonTypes.TERTIARY} height='44px' onClick={handleButtonClick}>
            <CustomButtonLabel>지문 보기</CustomButtonLabel>
          </Button>
        </Box>
        <BoxWrap>
          <Box hAlign={'center'} height={'342px'}>
            <PinchZoom>
              <Image type={EImageType.IMG} src={'/L01/C07/A02/HE1-L01-C07-A02-P04.jpg'} height='240px' width='486px' />
              <Box type='hidden' id='img-desc'>
                {imageAltA02}
              </Box>
            </PinchZoom>
          </Box>
          <Box height={'342px'} hAlign='start'>
            <Scroll height={'282px'} width={'434px'} tabIndex={0}>
              <Box>
                <Typography weight={'bold'} size={EStyleFontSizes.MEDIUM}>
                  Neanderthals
                </Typography>
              </Box>
              <Box>
                <Typography weight={'medium'} size={EStyleFontSizes.MEDIUM}>
                  were intelligent and had stronger bodies, living in
                </Typography>
              </Box>
              <Box hAlign='flex'>
                <Typography>(5)</Typography>{' '}
                <Dropdown
                  width='264px'
                  dropdownList={cardData.p04.dropArr}
                  isOpen={openDropdown[0]}
                  selectedValue={cardData.p04.answer[0]}
                  readOnly={cardData.p04.isSubmitted}
                  onClick={value => handleDropdownClick(0, value)}
                  ariaLabel='5번째 답 선택칸'
                  isError={cardData.p04.isSubmitted && cardData.p04.answer[0] !== cardData.p04.solution[0]}
                />
                <Typography weight={'medium'}>groups.</Typography>
              </Box>
              <Box>
                <Box marginTop={'20px'}>
                  <Typography weight={'bold'} size={EStyleFontSizes.MEDIUM} fontStyle='italic'>
                    Homo Sapiens
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography weight={'medium'} size={EStyleFontSizes.MEDIUM}>
                  lived in larger communities, working together and
                </Typography>
              </Box>
              <Box hAlign='flex'>
                <Typography>(6)</Typography>{' '}
                <Dropdown
                  width='264px'
                  dropdownList={cardData.p04.dropArr2}
                  isOpen={openDropdown[1]}
                  selectedValue={cardData.p04.answer[1]}
                  readOnly={cardData.p04.isSubmitted}
                  onClick={value => handleDropdownClick(1, value)}
                  ariaLabel='6번째 답 선택칸'
                  isError={cardData.p04.isSubmitted && cardData.p04.answer[1] !== cardData.p04.solution[1]}
                />
              </Box>
              <Box>
                <Typography weight={'medium'}>knowledge</Typography>
              </Box>
              <Box marginTop={'20px'} hAlign='flex'>
                <SvgIcon src={arrow_right} size='34px' />
                <Typography weight={'medium'} size={EStyleFontSizes.MEDIUM} fontStyle='italic'>
                  Homo sapiens
                </Typography>
              </Box>
              <Box hAlign='flex'>
                <Typography>(7)</Typography>{' '}
                <Dropdown
                  width='264px'
                  dropdownList={cardData.p04.dropArr3}
                  isOpen={openDropdown[2]}
                  selectedValue={cardData.p04.answer[2]}
                  readOnly={cardData.p04.isSubmitted}
                  onClick={value => handleDropdownClick(2, value)}
                  ariaLabel='7번째 답 선택칸'
                  isError={cardData.p04.isSubmitted && cardData.p04.answer[2] !== cardData.p04.solution[2]}
                />
              </Box>
              <Box>
                <Typography weight={'medium'} size={EStyleFontSizes.MEDIUM}>
                  better to a changing environment and ultimately survived.
                </Typography>
              </Box>
            </Scroll>
          </Box>
        </BoxWrap>
      </Box>
      <Dialog
        width={893}
        height={458}
        topHeight={50}
        isShow={isDialogOpen}
        onClose={handleDialogClose}
        useFooter={true}
        closeLabel={'지문 닫기'}
        useHeader
        header={() => (
          <Box background={'gray'} height='50px' marginBottom='20px' useRound useFull>
            <Typography weight={'bold'} size={EStyleFontSizes.MEDIUM}>
              The Power of Friendliness: Soft but Strong
            </Typography>
          </Box>
        )}
        tabIndex={101}
      >
        <Typography>
          <ContentInfo />
        </Typography>
      </Dialog>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box hAlign='left' margin='20px 5px'>
            {cardData.p04.solution.map((ans, idx) => {
              return <Box key={idx} margin='10px'>{`(${idx + 5}) ${ans}`}</Box>;
            })}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P04;

const CustomButtonLabel = styled.span`
  font-size: 16px;
  font-weight: var(--font-weight-bold);
  color: var(--color-grey-700);
  line-height: 24px;
  white-space: nowrap;
`;
