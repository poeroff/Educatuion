import { useEffect, useRef, useState } from 'react';
import {
  TMainHeaderInfoTypes,
  Box,
  Scroll,
  Button,
  Input,
  EStyleButtonTypes,
  EStyleSizes,
  Typography,
  Dialog,
  EStyleFontSizes,
  BottomSheet,
  SvgIcon,
  ESvgType,
  ETagLine,
  Tag,
  IQuestionProps,
  BoxWrap,
  TMarkType,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';
import RightArrowIcon from '@maidt-cntn/assets/icons/simple_right_arrow.svg';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilValue, useRecoilState } from 'recoil';
import { L03C06A06b } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

type TAnswers = { value: string; answer: string };

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C06A06b);
  const { userId } = useRecoilValue(studentAtom);

  const [openText, setOpenText] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);

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

  const [data, setData] = useState<TAnswers[]>([
    { value: '', answer: 'active' },
    { value: '', answer: 'still' },
  ]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'From Shadows to Spotlights (4)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q4. Fill in the blanks to complete the sentences.',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const contents = `Now let’s take a look at the final artist of this exhibition: Anna Ancher, a famous painter from Denmark. When observing her paintings, you may notice a common theme — they all feature female figures. Born in Skagen, Denmark, in 1859, she later moved to Copenhagen to attend a private painting school. After that, she even studied abroad in Paris, which was unusual for women at the time. Thanks to her mother’s encouragement, she was able to take advantage of these opportunities. Even after getting married, Ancher persisted in painting, objecting to the social pressure that married women were to solely focus on household duties. Ancher differed from other artists of that era, who depicted women as still life subjects. In contrast, she showcased them as active participants in everyday tasks, as seen in her works The Maid in the Kitchen and Sewing Fisherman’s Wife. She also skillfully explored light and color, contributing to the rich Impressionist movement in Denmark. In her painting Sunlight in the Blue Room, the reflection of the sunlight on the blue wall is stunningly portrayed. Ancher challenged the conventional roles of women in the 20th century and displayed her exceptional artistic talent. Her paintings continue to amaze us to this day.\n\nThank you for joining this guided tour, and I hope my explanations have aided you in appreciating these paintings. Please take some time to further explore the exhibition.`;

  const handleInputChangeEvent = (index: number, value: string) => {
    if (index === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
    } else if (index === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
    }
    changeData('P02', 1, index, value);
  };

  const onGrade = () => {
    if (cardData.p02.isSubmitted) {
      setIsShow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData.p02.answer1, cardData.p02.solution1);
      const isCorrect2 = isAnswer(cardData.p02.answer2, cardData.p02.solution2);
      const isCorrect = isCorrect1 && isCorrect2;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p02.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p02.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      onSubmit={onGrade}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p02.answer1 && cardData.p02.answer2)}
      submitBtnColor={
        !(cardData.p02.answer1 && cardData.p02.answer2) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
    >
      <BoxWrap marginBottom={'15px'}>
        <Box width={'100%'} hAlign='flex-end'>
          <Button
            size={EStyleSizes.SMALL}
            color={EStyleButtonTypes.SECONDARY}
            label='지문보기'
            useRound
            onClick={() => {
              setOpenText(true);
            }}
          />
        </Box>
      </BoxWrap>
      {openText && (
        <Dialog
          width={893}
          height={470}
          topHeight={50}
          useHeader
          header={() => (
            <Box height='50px' marginBottom='20px' background={'gray'} useRound={true}>
              <Typography useGap={false} weight={'var(--font-weight-bold)'} size={EStyleFontSizes.MEDIUM}>
                From Shadows to Spotlights (4)
              </Typography>
            </Box>
          )}
          isShow={openText}
          onClose={() => setOpenText(false)}
          useFooter={true}
          closeLabel={'지문 닫기'}
          tabIndex={101}
        >
          <Typography tabIndex={102} useGap={false} size={EStyleFontSizes.MEDIUM} usePre>
            {contents}
          </Typography>
        </Dialog>
      )}
      <Box background={'white'} useRound>
        <Typography usePre>
          How did Anna Ancher differ from other artists of that era? <br />
          <StyledIcon src={RightArrowIcon} type={ESvgType.IMG} />
          <TextPartLeft>She showcased women as </TextPartLeft>
          <Input
            ariaLabel='1번 답란'
            value={cardData.p02.answer1}
            minWidth='250px'
            onChange={e => handleInputChangeEvent(1, e.target.value)}
            maxLength={30}
            placeholder='내용을 넣어 주세요.'
            status={
              !isNotEmptyString(cardData.p02.answer1)
                ? InputStatus.DEFAULT
                : cardData.p02.isSubmitted && !isAnswer(cardData.p02.answer1, cardData.p02.solution1)
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            inputSize='x-small'
            readOnly={cardData.p02.isSubmitted}
          />
          {' participants in everyday tasks while other artists depicted them as '}
          <Input
            ariaLabel='2번 답란'
            value={cardData.p02.answer2}
            minWidth='250px'
            onChange={e => handleInputChangeEvent(2, e.target.value)}
            maxLength={30}
            placeholder='내용을 넣어 주세요.'
            status={
              !isNotEmptyString(cardData.p02.answer2)
                ? InputStatus.DEFAULT
                : cardData.p02.isSubmitted && !isAnswer(cardData.p02.answer2, cardData.p02.solution2)
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            inputSize='x-small'
            readOnly={cardData.p02.isSubmitted}
          />
          {' life subjects.'}
        </Typography>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>active, still</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;

const TextPartLeft = styled.span`
  display: inline;
  padding-left: 12px;
`;

const StyledIcon = styled(SvgIcon)`
  vertical-align: middle;
  padding-right: 12px;
`;
