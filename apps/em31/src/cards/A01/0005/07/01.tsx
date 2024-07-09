import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { userSubmissionType, getUserSubmission } from '@maidt-cntn/api';
import EM00903 from '@maidt-cntn/math/pages/EM-009-03';
import {
  Box,
  EStyleFontSizes,
  ETextViewColor,
  ICanvasFunction,
  IQuestionProps,
  TMainHeaderInfoTypes,
  TextViewTitle,
  Typography,
} from '@maidt-cntn/ui';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A01_0005_07 } from './store';
import { MathExpression } from '@maidt-cntn/ui/math';
import { dataURLToBlob } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(A01_0005_07);

  const canvasRef = useRef<ICanvasFunction>(null);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'CANVAS',
          value: '',
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

  const tmpSaveCanvas = async () => {
    if (!canvasRef.current?.isCanvasBlank()) {
      const canvasDataURL = canvasRef.current?.getValue();
      if (canvasDataURL) {
        setCardData(prev => ({ ...prev, p01: { ...prev.p01, canvasDataURL: canvasDataURL } }));
        changeData('P01', 1, 1, canvasDataURL);
      }
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            canvasDataURL: userSubmissionList[0].inputData[0]?.value || cardData.p01.canvasDataURL,
            answer1: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer1,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));

        if (userSubmissionList[0].inputData[0]?.value || cardData.p01.canvasDataURL) {
          if (userSubmissionList[0].inputData[0]?.value)
            canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(userSubmissionList[0].inputData[0]?.value));
          else canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(cardData.p01.canvasDataURL));
        }
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const onSubmit = async () => {
    const isCorrect = isAnswer(cardData.p01.answer1, cardData.p01.solution1);
    const canvasDataURL = canvasRef.current?.getValue();
    if (canvasDataURL) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, canvasDataURL: canvasDataURL, isSubmitted: true, isCorrect: isCorrect } }));
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
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p01.answer1,
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P01', userSubmission, cardData.p01.isCorrect);
  };

  const handleInputChange = (value: string) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: value } }));
    changeData('P01', 1, 2, value);
  };

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'write',
    headerText: '문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <Box vAlign='center'>
        <TextViewTitle title='보기' type={ETextViewColor.DEFAULT} />
        &nbsp;
        <MathExpression equation={'와 같이 $254-132$ 로 문제를 만들고 답을 구해 보세요.'} />
      </Box>
    ),
    size: EStyleFontSizes.MEDIUM,
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };
  const example = (
    <>
      <Typography size={EStyleFontSizes.MEDIUM}>공항에는 배달 로봇과 안내 로봇이 254대 있습니다.</Typography>
      <Typography size={EStyleFontSizes.MEDIUM}>그중에서 132대가 배달 로봇이면 안내 로봇은 몇 대인가요?</Typography>
    </>
  );

  const exampleAnswer = (
    <>
      <Typography>문제: 기차에 어른과 어린이가 254명 타고 있습니다. 그중에서 132명이 어른이면 어린이는 몇 명인가요?</Typography>
      <Typography>답: 122명</Typography>
    </>
  );
  const answer = '122';

  return (
    <EM00903
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      exampleAnswer={exampleAnswer}
      answer={answer}
      example={example}
      initialValue={cardData.p01.answer1}
      canvasRef={canvasRef}
      isSubmitted={cardData.p01.isSubmitted}
      handleInputChange={handleInputChange}
      onSubmit={onSubmit}
      canvasTmpSave={tmpSaveCanvas}
    ></EM00903>
  );
};

export default P01;
