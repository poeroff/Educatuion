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
  IQuestionProps,
  BottomSheet,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { textContentA02b, imgContentA02bP04 } from './commonData';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L03C07A02b } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';

const P04 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C07A02b);

  const { title, content, subTitleIndexes } = textContentA02b;
  const { imgSrc } = imgContentA02bP04;

  const dropArr1: string[] = ['private', 'physical'];
  const dropAnswer: string[] = ['physical'];

  const [isMainTextOpen, setIsMainTextOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false]);

  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false); // 모범 답안

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Complete',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks to summarize the main text.',
    mark: cardData.p04.isSubmitted ? (cardData.p04.isCorrect ? 'correct' : 'incorrect') : undefined,
  };

  const handleButtonClick = () => {
    setIsMainTextOpen(true);
  };

  const handleDialogClose = () => {
    setIsMainTextOpen(false);
  };

  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: [''],
          isAnswer: true,
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (!cardData.p04.isSubmitted) {
      // 채점하기
      const isCorrect = cardData.p04.answer.every((a, idx) => a === dropAnswer[idx]);

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
              isCorrect: isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P04', userSubmission, isCorrect);
    } else {
      // 답안보기
      setShowAnswer(!showAnswer);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P04')?.pageId;
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
      initData('P04', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleDropdownClick = (index: number, value: string | undefined) => {
    setOpenDropdown(openDropdown.map((val, idx) => idx === index));

    const newAnswer = [...cardData.p04.answer];
    if (value !== undefined) {
      newAnswer[index] = value;
      setCardData(prev => ({
        ...prev,
        p04: {
          ...prev.p04,
          answer: newAnswer,
        },
      }));
      changeData('P04', 1, 1, newAnswer);
    }
  };

  useEffect(() => {
    const allAnswered = cardData.p04.answer.filter(a => a !== undefined && a !== '').length === dropAnswer.length;
    if (allAnswered) {
      setSubmitDisabled(!allAnswered);
    }
  }, [cardData.p04.answer, dropAnswer.length]);

  useEffect(() => {
    return () => {
      saveData('P04');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const getSubmitBtnColor = () => {
    if (!cardData.p04.isSubmitted && submitDisabled) {
      return EStyleButtonTypes.SECONDARY;
    } else if (!cardData.p04.isSubmitted && !submitDisabled) {
      return EStyleButtonTypes.PRIMARY;
    } else if (cardData.p04.isSubmitted && !showAnswer) {
      return EStyleButtonTypes.PRIMARY;
    } else if (cardData.p04.isSubmitted && showAnswer) {
      return EStyleButtonTypes.DEFAULT;
    }
  };

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={getSubmitBtnColor()}
      submitLabel={cardData.p04.isSubmitted ? (showAnswer ? '답안닫기' : '답안보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={submitDisabled}
      vAlign={'flex-start'}
    >
      <Box hAlign='flex-end' vAlign='flex-start' marginBottom='8px'>
        <Button width='96px' color={EStyleButtonTypes.TERTIARY} style={{ height: '44px' }} onClick={handleButtonClick}>
          <CustomButtonLabel>지문 보기</CustomButtonLabel>
        </Button>
      </Box>

      <BoxWrap>
        <Box width={'30%'} hAlign={'center'} height={'342px'}>
          <PinchZoom>
            <Image type={EImageType.IMG} src={imgSrc} alt='' ariaDescribedby='img_desc' width='100%' height='100%' />
            <Box type='hidden' id='img_desc'>
              <p>글의 구조가 보이는 인포그래픽</p>
              <p>제목 Artists Who Never Gave up on Their Art Despite 빈칸 in Their Lives</p>
              <p>첫 번째 칸 Bill Traylor의 born, Life History, Works에 관한 내용</p>
              <p>두 번째 칸 Maud Lewis의 born, Life History, Works에 관한 내용</p>
              <p>세 번째 칸 Anna Ancher의 born, Life History, Works에 관한 내용</p>
            </Box>
          </PinchZoom>
        </Box>
        <Box marginLeft={'24px'} width={'70%'} height={'342px'} hAlign='center'>
          <Scroll>
            <Box display='flex' justifyContent='center'>
              <Typography weight={'var(--font-weight-bold)'} size={EStyleFontSizes.MEDIUM}>
                Maud Lewis - Life History
              </Typography>
            </Box>
            <Box hAlign='flex' display='inline-flex'>
              <Typography size={EStyleFontSizes.MEDIUM}>• born with</Typography>
              <Typography weight={'var(--font-weight-bold)'} useGap={false}>
                3)
              </Typography>
              <Dropdown
                readOnly={cardData.p04.isSubmitted}
                width='264px'
                dropdownList={dropArr1}
                isOpen={openDropdown[0]}
                onClick={value => handleDropdownClick(0, value)}
                selectedValue={cardData.p04.answer[0]}
                isError={cardData.p04.isSubmitted && !isAnswer(cardData.p04.answer[0], dropAnswer)}
                ariaLabel='3번 답 선택칸'
              />
            </Box>
            <Box display='inline-flex' marginLeft={'18px'}>
              <Typography size={EStyleFontSizes.MEDIUM}>weaknesses</Typography>
            </Box>
            <Box display='inline-flex'>
              <Typography size={EStyleFontSizes.MEDIUM}>• painted and sold Christmas cards</Typography>
            </Box>
            <Box>
              <Typography size={EStyleFontSizes.MEDIUM}>• moved to Digby and met her husband</Typography>
            </Box>
            <Box>
              <Typography size={EStyleFontSizes.MEDIUM}>• continued painting</Typography>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>

      <Dialog width={893} height={458} isShow={isMainTextOpen} onClose={handleDialogClose} useFooter={true} closeLabel={'지문 닫기'}>
        <Box height={'15%'} background={'gray'} useRound={true} hAlign='flex-start' vAlign='flex-center' useFull={true}>
          <Typography weight={'var(--font-weight-bold)'} size={EStyleFontSizes.MEDIUM}>
            {title}
          </Typography>
        </Box>
        <Box hAlign='center' marginTop='24px'>
          <Scroll height={'261px'}>
            {content.split('\n').map((paragraph, index, arr) => (
              <React.Fragment key={index}>
                <Typography
                  style={{ whiteSpace: 'pre-wrap' }}
                  weight={!subTitleIndexes.has(index) ? 'var(--font-weight-medium)' : 'var(--font-weight-semiBold)'}
                  size={EStyleFontSizes.MEDIUM}
                >
                  {paragraph}
                </Typography>
                <br />
                {index !== arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </Scroll>
        </Box>
      </Dialog>

      <BottomSheet bottomSheetTargetId='container' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <BoxWrap>
            {dropAnswer.map((elem, idx) => (
              <Box marginTop='12px' marginLeft='12px' key={idx}>
                {idx + 3}) {elem}
              </Box>
            ))}
          </BoxWrap>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P04;

const CustomButtonLabel = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #6a6d73;
  line-height: 24px;
  white-space: nowrap;
`;
