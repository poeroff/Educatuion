import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import {
  Box,
  BoxWrap,
  Button,
  Dialog,
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
  Input,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { textContentA02a, imgContentA02aP05 } from './commonData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L03C07A02a } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P05 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C07A02a);

  const { title, content, subTitleIndexes } = textContentA02a;
  const { imgSrc } = imgContentA02aP05;

  const dropAnswer1: string[] = ['rivate', 'private'];
  const dropAnswer2: string[] = ['arried', 'married'];

  const [isMainTextOpen, setIsMainTextOpen] = useState(false);

  const [showAnswer, setShowAnswer] = useState(false); // 모범 답안

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Complete',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks to summarize the main text.',
    mark: cardData.p05.isSubmitted ? (cardData.p05.isCorrect ? 'correct' : 'incorrect') : undefined,
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
          value: '',
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const checkCorrect = (questionIdx: number): boolean => {
    if (questionIdx === 1) {
      return dropAnswer1.some(answer => answer.trim().toLowerCase() === cardData.p05.answer1.trim().toLowerCase());
    } else {
      // questionIdx === 2
      return dropAnswer2.some(answer => answer.trim().toLowerCase() === cardData.p05.answer2.trim().toLowerCase());
    }
  };

  const handleSubmit = () => {
    if (cardData.p05.isSubmitted) {
      setShowAnswer(!showAnswer);
    } else {
      const isCorrect1 = checkCorrect(1);
      const isCorrect2 = checkCorrect(2);
      const isCorrect = isCorrect1 && isCorrect2;
      setCardData(prev => ({ ...prev, p05: { ...prev.p05, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p05.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p05.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P05', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P05')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p05: {
            ...prev.p05,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p05.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p05.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P05', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer2: value } }));
    }
    changeData('P05', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P05');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={
        !(cardData.p05.answer1 && cardData.p05.answer2)
          ? EStyleButtonTypes.SECONDARY
          : showAnswer
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      submitLabel={cardData.p05.isSubmitted ? (showAnswer ? '답안닫기' : '답안보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={!(cardData.p05.answer1 && cardData.p05.answer2)}
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
            <Image type={EImageType.IMG} src={imgSrc} alt='' ariaDescribedby='img_desc' width='100%' />
            <Box type='hidden' id='img_desc'>
              <p>글의 구조가 보이는 인포그래픽</p>
              <p>제목 Artists Who Never Gave up on Their Art Despite 1 C 빈칸 in Their Lives</p>
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
                Anna Ancher - Life History
              </Typography>
            </Box>
            <Box>
              <Typography size={EStyleFontSizes.MEDIUM}>• moved to Copenhagen to attend a</Typography>
            </Box>
            <Box marginLeft={'30px'} hAlign='flex' display='inline-flex'>
              <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                6) p
              </Typography>
              <Input
                width='228px'
                value={cardData.p05.answer1}
                onChange={e => handleChange(1, e.target.value)}
                readOnly={cardData.p05.isSubmitted}
                status={!cardData.p05.isSubmitted ? InputStatus.ENABLE : !checkCorrect(1) ? InputStatus.ERROR : InputStatus.DEFAULT}
                ariaLabel='6번 답 입력란'
              />
            </Box>
            <Box display='inline-flex'>
              <Typography size={EStyleFontSizes.MEDIUM}>painting school</Typography>
            </Box>
            <Box>
              <Typography size={EStyleFontSizes.MEDIUM}>• studied abroad in Paris</Typography>
            </Box>
            <Box>
              <Typography size={EStyleFontSizes.MEDIUM}>• persisted in painting</Typography>
            </Box>
            <Box>
              <Typography size={EStyleFontSizes.MEDIUM}>• objected to social pressure on</Typography>
            </Box>
            <Box marginLeft={'30px'} hAlign='flex' display='inline-flex'>
              <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                7) m
              </Typography>
              <Input
                width='228px'
                value={cardData.p05.answer2}
                onChange={e => handleChange(2, e.target.value)}
                readOnly={cardData.p05.isSubmitted}
                status={!cardData.p05.isSubmitted ? InputStatus.ENABLE : !checkCorrect(2) ? InputStatus.ERROR : InputStatus.DEFAULT}
                ariaLabel='7번 답 입력란'
              />
            </Box>
            <Box display='inline-flex'>
              <Typography size={EStyleFontSizes.MEDIUM}>women</Typography>
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
            <Box marginTop='12px' marginLeft='12px'>
              6) rivate (private도 정답 인정)
            </Box>
          </BoxWrap>
          <BoxWrap>
            <Box marginTop='12px' marginLeft='12px'>
              7) arried (married도 정답 인정)
            </Box>
          </BoxWrap>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P05;

const CustomButtonLabel = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #6a6d73;
  line-height: 24px;
  white-space: nowrap;
`;
