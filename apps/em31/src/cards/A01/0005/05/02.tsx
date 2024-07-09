import {
  BottomSheet,
  Box,
  Drawing,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  ICanvasFunction,
  IQuestionProps,
  Label,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container, MathExpression } from '@maidt-cntn/ui/math';
import { dataURLToBlob } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useMemo, useRef, useState } from 'react';
import { A01_0005_05 } from './store';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const pageNo = 'P02';
  const subjectCode = import.meta.env.VITE_APP_CODE.toUpperCase();

  const exampleAnswer = '일의 자리끼리, 십의 자리끼리, 백의 자리끼리 뺍니다.';
  const explanation = [
    `- 각 자리 수를 맞추어 세로로 쓴 다음 일의 자리끼리, 십의 자리끼리, 백의 자리끼리 뺍니다.`,
    `- $4-2=2$이므로 일의 자리에 2를 쓰고, $4-1=3$이므로 십의 자리에 3을 쓰고, $2-1=1$이므로 백의 자리에 1을 씁니다.`,
  ];

  const { initData, submitData, saveData, changeData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0005_05);

  const [isShowAnswer, setShowAnswer] = useState<boolean>(false);

  const canvasRef = useRef<ICanvasFunction>(null);

  const submitBtnColor = useMemo(() => {
    if (cardData.p02.isSubmitted) {
      return isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW;
    } else {
      return EStyleButtonTypes.YELLOW;
    }
  }, [cardData.p02.isSubmitted, isShowAnswer]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '244-112 계산하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={'ㄴ'} color='var(--color-white)' background='var(--color-grey-600)' />
        계산하는 방법을 설명해 보세요.
      </>
    ),
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
      ],
    },
  ];

  const tmpSaveCanvas = async () => {
    if (!canvasRef.current?.isCanvasBlank()) {
      const canvasDataURL = canvasRef.current?.getValue();
      if (canvasDataURL) {
        setCardData(prev => ({ ...prev, p02: { ...prev.p02, canvasDataURL: canvasDataURL } }));
        changeData(pageNo, 1, 1, canvasDataURL);
      }
    }
  };

  const handleSubmit = async () => {
    if (!cardData.p02.isSubmitted) {
      const canvasDataURL = canvasRef.current?.getValue();
      if (canvasDataURL) {
        setCardData(prev => ({ ...prev, p02: { ...prev.p02, canvasDataURL: canvasDataURL, isSubmitted: true } }));
      }
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'CANVAS',
              value: canvasDataURL,
            },
          ],
        },
      ];
      submitData(pageNo, userSubmission);
    } else {
      setShowAnswer(!isShowAnswer);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            canvasDataURL: userSubmissionList[0].inputData[0]?.value || cardData.p02.canvasDataURL,
            isSubmitted,
          },
        }));

        if (userSubmissionList[0].inputData[0]?.value || cardData.p02.canvasDataURL) {
          if (userSubmissionList[0].inputData[0]?.value)
            canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(userSubmissionList[0].inputData[0]?.value));
          else canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(cardData.p02.canvasDataURL));
        }
      }

      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNo);
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
      background={'var(--color-white)'}
      useRound
      vAlign='flex-start'
      onSubmit={handleSubmit}
      submitLabel={cardData.p02.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitBtnColor={submitBtnColor}
    >
      <Drawing ref={canvasRef} tmpSave={tmpSaveCanvas} disabled={cardData.p02.isSubmitted} />
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>{exampleAnswer}</Typography>
          </Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            {explanation.map((text, idx) => (
              <Typography key={`explanation-${idx + 1}`} size={EStyleFontSizes.MEDIUM}>
                <MathExpression equation={text} />
              </Typography>
            ))}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
