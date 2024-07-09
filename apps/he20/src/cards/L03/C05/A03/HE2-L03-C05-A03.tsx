import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Label,
  TMainHeaderInfoTypes,
  Typography,
  IQuestionProps,
  BoxWrap,
  EStyleFontSizes,
  BottomSheet,
  EStyleButtonTypes,
  Tag,
  ETagLine,
  Radio,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L03C05A03, TL03C05A03Keys } from './store';

export interface IData {
  word: string;
  meaning: string;
}

export interface IProps {
  sentence: JSX.Element;
  data: IData[];
  pageKey: TL03C05A03Keys;
}

const HE2L03C05A03 = ({ sentence, data, pageKey }: IProps) => {
  const pageNo = pageKey.toUpperCase();

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C05A03);

  const [ready, setReady] = useState<boolean>(false);
  const [isShowAnswer, setShowAnswer] = useState<boolean>(false);

  const isAllFilled = useMemo(() => cardData[pageKey].answer, [cardData, pageKey]);
  const disabled = useMemo(() => !cardData[pageKey].isSubmitted && !isAllFilled, [cardData, pageKey, isAllFilled]);

  const submitBtnColor = useMemo(() => {
    if (cardData[pageKey].isSubmitted) {
      return isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    } else {
      return isAllFilled ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    }
  }, [cardData, pageKey, isShowAnswer, isAllFilled]);

  const mark = useMemo(() => (cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none'), [cardData, pageKey]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Word Preview',
  };

  const questionInfo: IQuestionProps = {
    text: 'Choose the word to fill in the blank.',
    size: 'medium',
    mark: mark,
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: false,
          isCorrect: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer,
            isSubmitted: isSubmitted,
            isCorrect: userSubmissionList[0].isCorrect ?? false,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      (async () => {
        await init();
        setReady(true);
      })();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  const handleClickOption = (index: number) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: index + 1 } }));
    changeData(pageNo, 1, 1, index + 1);
  };

  const handleSubmit = () => {
    if (!cardData[pageKey].isSubmitted) {
      const isCorrect = cardData[pageKey].answer === cardData[pageKey].solution;
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData[pageKey].answer,
              isAnswer: true,
              isCorrect: cardData[pageKey].isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageNo, userSubmission, isCorrect);
    } else {
      setShowAnswer(!isShowAnswer);
    }
  };

  // Set the height of the radio button to the maximum height of the radio button.
  useEffect(() => {
    const radios = document.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
    const divs = Array.from(radios).map(el => el.nextElementSibling as HTMLDivElement);

    let maxHeight = 0;

    divs.forEach(el => {
      maxHeight = Math.max(maxHeight, el.clientHeight);
    });

    divs.forEach(el => {
      el.style.height = `${maxHeight}px`;
    });
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData[pageKey].isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={disabled}
      submitBtnColor={submitBtnColor}
    >
      <Box useFull hAlign='center' padding='50px 0px' height='100%'>
        <Box useFull hAlign='center' flexDirection='column' gap='20px'>
          <Box width='910px' vAlign='center' display='inline' textAlign='center' padding='20px' background='white' useRound lineHeight='40px'>
            <Typography useGap={false} usePre>
              {sentence}
            </Typography>
          </Box>
          <BoxWrap useFull width='calc(100% - 8px)'>
            {data.map((value, index) => (
              <Box key={'radio-option-' + (index + 1)} useFull>
                <Radio
                  type='box'
                  align='vertical'
                  name={'radio-question-A'}
                  label={value.word}
                  ariaLabel={`${index + 1}번 보기`}
                  value={ready ? index === cardData[pageKey].answer - 1 : undefined}
                  onClick={() => handleClickOption(index)}
                  isError={cardData[pageKey].isSubmitted && cardData[pageKey].answer !== cardData[pageKey].solution}
                  readOnly={cardData[pageKey].isSubmitted}
                >
                  <Box>
                    <Box>
                      <Label value={index + 1} />
                      <Typography style={{ fontWeight: 800 }}>{value.word}</Typography>
                    </Box>
                    <Box marginTop='8px' marginLeft='50px' lineHeight='36px'>
                      <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']} usePre>
                        {value.meaning}
                      </Typography>
                    </Box>
                  </Box>
                </Radio>
              </Box>
            ))}
          </BoxWrap>
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{cardData[pageKey].solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE2L03C05A03;
