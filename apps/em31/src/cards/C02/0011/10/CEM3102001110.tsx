import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Drawing,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  ICanvasFunction,
  Image,
  Input,
  InputStatus,
  IQuestionProps,
  Label,
  Question,
  Tag,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { DialogContainer, MathExpression } from '@maidt-cntn/ui/math';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C02_0011_10, TC02001110Keys } from './store';
import { isAnswer, isNotEmptyString, dataURLToBlob } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

interface IProps {
  pageKey: TC02001110Keys;
  labelValue: number;
  question: string;
  explanation: string[];
  showBottomSheetImg?: boolean;
}

const CEM3102001110 = ({ pageKey, labelValue, question, explanation, showBottomSheetImg = true }: IProps) => {
  const pageNo = pageKey.toUpperCase();

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C02_0011_10);

  const [isShowAnswer, setShowAnswer] = useState<boolean>(false);

  const canvasRef = useRef<ICanvasFunction>(null);

  const isAllFilled = useMemo(() => isNotEmptyString(cardData[pageKey].answer), [cardData, pageKey]);
  const isCorrect = useMemo(() => isAnswer(cardData[pageKey].answer, String(cardData[pageKey].solution)), [cardData, pageKey]);
  const submitBtnColor = useMemo(() => {
    if (cardData[pageKey].isSubmitted) {
      return isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW;
    } else {
      return isAllFilled ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.SECONDARY;
    }
  }, [cardData, pageKey, isShowAnswer, isAllFilled]);
  const mark = useMemo(() => (cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none'), [cardData, pageKey]);
  const status = useMemo(
    () =>
      isNotEmptyString(cardData[pageKey].answer)
        ? !cardData[pageKey].isSubmitted || isCorrect
          ? InputStatus.ENABLE
          : InputStatus.ERROR
        : InputStatus.DEFAULT,
    [cardData, pageKey, isCorrect],
  );

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathDescriptive',
  };

  const questionInfo: IQuestionProps = {
    text: '그림에서 찾을 수 있는 크고 작은 직각삼각형은 모두 몇 개인지 풀이 과정을 쓰고 답을 구해 보세요.',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'CANVAS',
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
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
            answer: userSubmissionList[0].inputData[1]?.value || cardData[pageKey].answer,
            canvasDataURL: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].canvasDataURL,
            isSubmitted: isSubmitted,
            isCorrect: userSubmissionList[0].inputData[1].isCorrect ?? false,
          },
        }));
      }

      if (userSubmissionList[0].inputData[0]?.value || cardData[pageKey].canvasDataURL) {
        if (userSubmissionList[0].inputData[0]?.value) {
          canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(userSubmissionList[0].inputData[0]?.value));
        } else canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(cardData[pageKey].canvasDataURL));
      }

      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  const tmpSaveCanvas = async () => {
    if (!canvasRef.current?.isCanvasBlank()) {
      const canvasDataURL = canvasRef.current?.getValue();
      if (canvasDataURL) {
        setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], canvasDataURL: canvasDataURL } }));
        changeData(pageNo, 1, 1, canvasDataURL);
      }
    }
  };

  const handleChangeInput = (value: string) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: value } }));
    changeData(pageNo, 1, 2, value);
  };

  const handleSubmit = async () => {
    if (!cardData[pageKey].isSubmitted) {
      const canvasDataURL = canvasRef.current?.getValue();

      if (!canvasDataURL) {
        return;
      }

      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], canvasDataURL: canvasDataURL, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'CANVAS',
              value: canvasDataURL,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData[pageKey].answer,
              isAnswer: true,
              isCorrect,
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

  return (
    <DialogContainer
      bodyId={'targetContainer' + pageNo}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='start'
      submitLabel={cardData[pageKey].isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData[pageKey].isSubmitted && !isAllFilled}
      onSubmit={handleSubmit}
      submitBtnColor={submitBtnColor}
    >
      <Box paddingBottom='12px'>
        <Box width='100%' vAlign='center' hAlign='center' margin='12px 0'>
          <Image
            src='/C02/0011/10/DIC312S01.png'
            width='300px'
            alt='한 각이 직각인 작은 삼각형 4개를 이어붙여 큰 삼각형 한 개를 이루고 있는 그림입니다.'
          />
        </Box>
        <Box vAlign='flex-start'>
          <Question subject='math' type='icon' text={labelValue} mark={mark} markPosition='-15px 15px'>
            <Box display='flex' alignItems='center'>
              <Label type='icon' size='small' value={labelValue} />
              <Typography lineHeight='58px'>{question}</Typography>
            </Box>
          </Question>
        </Box>
        <BoxWrap useFull height='204px'>
          <Box paddingTop='40px'>
            <Label
              value='풀이'
              color='var(--color-yellow-800)'
              background='var(--color-yellow-100)'
              lineColor='var(--color-yellow-700)'
              svgWidth={67}
              fontSize={22}
              lineHeight={33}
            />
          </Box>
          <Box useFull>
            <Drawing ref={canvasRef} tmpSave={tmpSaveCanvas} disabled={cardData[pageKey].isSubmitted} />
          </Box>
        </BoxWrap>
        <BoxWrap justifyContent='flex-end' marginTop='24px'>
          <Box>
            <Label
              value='답'
              color='var(--color-yellow-800)'
              background='var(--color-yellow-100)'
              lineColor='var(--color-yellow-700)'
              fontSize={22}
              lineHeight={33}
            />
            <Input
              type='number'
              value={cardData[pageKey].answer}
              onChange={event => handleChangeInput(event.target.value)}
              width='130px'
              maxLength={3}
              status={status}
              readOnly={cardData[pageKey].isSubmitted}
              ariaLabel='답란'
              marginLeft={12}
            />
            <Typography>개</Typography>
          </Box>
        </BoxWrap>
      </Box>

      <BottomSheet bottomSheetTargetId={'targetContainer' + pageNo} height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='36px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>{cardData[pageKey].solution}</Typography>
          </Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <BoxWrap marginTop='12px'>
            <Box>
              {explanation.map((text, index) => (
                <Typography key={`explanation-${index + 1}`} size={EStyleFontSizes.MEDIUM}>
                  <MathExpression equation={text} />
                </Typography>
              ))}
            </Box>
            {showBottomSheetImg ? (
              <Box vAlign='center' hAlign='center'>
                <Image
                  src='/C02/0011/10/DIC312S02.png'
                  width='200px'
                  alt='큰 삼각형을 이루고 있는 작은 삼각형 4개에 왼쪽부터 차례로 각각 ①, ②, ③, ④ 가 표시되어 있는 그림입니다.'
                />
              </Box>
            ) : null}
          </BoxWrap>
        </Box>
      </BottomSheet>
    </DialogContainer>
  );
};

export default CEM3102001110;
