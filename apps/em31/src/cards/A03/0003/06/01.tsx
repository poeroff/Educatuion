import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { userSubmissionType, getUserSubmission } from '@maidt-cntn/api';
import {
  Box,
  EStyleFontSizes,
  ETextViewColor,
  ICanvasFunction,
  IQuestionProps,
  TMainHeaderInfoTypes,
  TextViewTitle,
  Typography,
  Image,
} from '@maidt-cntn/ui';
import { dataURLToBlob, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { MathExpression } from '@maidt-cntn/ui/math';
import { A03_0003_06 } from './store';
import EM00903 from '@maidt-cntn/math/pages/EM-009-03';

const P01 = () => {
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(A03_0003_06);

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
        <MathExpression equation={'와 같이 $18÷3$ 으로 문제를 만들고 답을 구해 보세요.'} />
      </Box>
    ),
    size: EStyleFontSizes.MEDIUM,
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };
  const example = (
    <>
      <Typography size={EStyleFontSizes.MEDIUM}>
        봉사자 18명이 3명씩 한 모둠을 만들어 쓰레기를 주웠습니다. <br /> 만든 모둠은 몇 모둠인가요?
      </Typography>
      <Image src={'/A03/0003/06/MA31305.png'} alt='다양한 인종과 성별의 봉사자 18명의 얼굴이 그려져 있습니다.' width='100%' height='100%' />
    </>
  );

  const exampleAnswer = (
    <>
      <Typography>문제: 반 학생 18명이 3명씩 조를 만 들어 영화를 보러 영화관에 갔습니다. 만든 조는 몇 개의 조 인가요?</Typography>
      <Typography>답: 6명</Typography>
    </>
  );
  const answer = '6';

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
      drawingHeight={'182px'}
    />
  );
};

export default P01;
