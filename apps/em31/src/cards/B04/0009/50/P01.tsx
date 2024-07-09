import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Label,
  Typography,
  EStyleFontSizes,
  Input,
  TMainHeaderInfoTypes,
  IQuestionProps,
  TextView,
  EStyleButtonTypes,
  Drawing,
  ICanvasFunction,
  InputStatus,
  BottomSheet,
  Mark,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { dataURLToBlob } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { A04000950_Atom } from './store';
import AnswerSheet01 from './AnswerSheet01';

const P01 = () => {
  const CURRENT_PAGE = 'P01';
  const MAIN_KEY = 1;
  const ANSWER = '51';
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: MAIN_KEY,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '', //for real save data path
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '', //for tmp save data url text
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: {
            value: '', // answer
          },
        },
      ],
    },
  ];

  const { initData, submitDataWithResult, saveData, changeData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A04000950_Atom);
  const { userId } = useRecoilValue(studentAtom);
  const subjectCode = import.meta.env.VITE_APP_CODE.toUpperCase();
  const canvasRef = useRef<ICanvasFunction>(null);
  const [isShowBottom, setIsShowBottom] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'write',
    headerText:
      '현수와 지민이가 다음과 같이 땅콩을 봉지에 담았습니다. 현수와 지민이 중 누가 땅콩을 몇 개 더 많이 담았는지 풀이 과정을 쓰고 답을 구해 보세요.',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    markPosition: '-105px 0 0 -4px',
  };

  const tmpSaveCanvas = async () => {
    if (!canvasRef.current?.isCanvasBlank()) {
      const canvasDataURL = canvasRef.current?.getValue();
      if (canvasDataURL) {
        setCardData(prev => ({ ...prev, p01: { ...prev.p01, canvasDataURL: canvasDataURL } }));
        changeData(CURRENT_PAGE, MAIN_KEY, 2, canvasDataURL);
      }
    }
  };

  const isBtnDisabled = () => {
    const answer1 = cardData.p01.answer1.value;
    const allZero = answer1 !== '';
    return allZero || cardData.p01.isSubmitted;
  };

  const submitAnswer = async () => {
    const correct = cardData.p01.answer1.value === ANSWER;
    const uploadCanvasImagePromise = canvasRef.current?.uploadCanvasImage({
      subjectCode: subjectCode,
      cardPath: '/B04/0009/50', //setting required based on card
      canvasIndex: 1,
      page: '01',
      userId: userId,
    });
    const canvasPath = await uploadCanvasImagePromise;
    if (canvasPath) {
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: MAIN_KEY,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: canvasPath,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: '',
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: {
                value: cardData.p01.answer1.value,
              },
              isCorrect: correct,
            },
          ],
          isCorrect: correct,
        },
      ];
      setCardData(prev => ({
        ...prev,
        p01: {
          ...prev.p01,
          answer1: { ...prev.p01.answer1, isCorrect: correct },
          canvasPath1: canvasPath,
          isSubmitted: true,
          isCorrect: correct,
          inputData: userSubmission[0].inputData as [],
        },
      }));
      //   console.log('----> ', userSubmission);
      submitDataWithResult(CURRENT_PAGE, userSubmission, correct);
    }
  };

  const onSubmit = () => {
    if (!cardData.p01.isSubmitted) {
      submitAnswer();
    } else {
      setIsShowBottom(prev => !prev);
    }
  };

  const answerInputChange = (value: string, num = 3) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: { ...prev.p01.answer1, value: value } } }));
    changeData(CURRENT_PAGE, MAIN_KEY, num, { value: value });
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === CURRENT_PAGE)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            canvasPath1: userSubmissionList[0].inputData[0]?.value || cardData.p01.canvasPath1,
            canvasDataURL: userSubmissionList[0].inputData[1]?.value || cardData.p01.canvasDataURL,
            answer1: {
              ...prev.p01.answer1,
              value: userSubmissionList[0].inputData[2]?.value.value || cardData.p01.answer1.value,
              isCorrect: userSubmissionList[0].inputData[2]?.isCorrect,
            },
            isCorrect: userSubmissionList[0].isCorrect,
            isSubmitted,
          },
        }));
        if (!isSubmitted) {
          //canvas image load from temp save
          if (userSubmissionList[0].inputData[1]?.value || cardData.p01.canvasDataURL) {
            if (userSubmissionList[0].inputData[1]?.value)
              canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(userSubmissionList[0].inputData[1]?.value));
            else canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(cardData.p01.canvasDataURL));
          }
        } else {
          //canvas image load from real save
          if (userSubmissionList[0].inputData[0]?.value || cardData.p01.canvasPath1) {
            canvasRef.current?.settingCanvasImage({
              subjectCode: subjectCode,
              uploadPath: userSubmissionList[0].inputData[0]?.value || cardData.p01.canvasPath1,
            });
          }
        }
      }
      initData(CURRENT_PAGE, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const inputStatus = (isCorrect: boolean) => {
    return cardData.p01.isSubmitted ? (isCorrect ? InputStatus.ENABLE : InputStatus.ERROR) : InputStatus.ENABLE;
  };

  useEffect(() => {
    return () => {
      saveData(CURRENT_PAGE);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      headerInfo={headerInfo}
      bodyId={'targetContainer'}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitBtnColor={isBtnDisabled() ? (isShowBottom ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={!isBtnDisabled()}
      submitLabel={cardData.p01.isSubmitted ? (isShowBottom ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={onSubmit}
      useRound
    >
      <Box display='flex' flexDirection='column' useFull>
        <Box>
          <Box>
            <TextView title='' hAlign='start' padding='10px 10px'>
              <Typography style={{ whiteSpace: 'nowrap' }} size={EStyleFontSizes.MEDIUM}>
                현수 : 나는 땅콩을 한 봉지에 17개씩 담았는데 모두 3봉지가 되었어.
              </Typography>
              <Typography style={{ whiteSpace: 'nowrap' }} size={EStyleFontSizes.MEDIUM}>
                지민 : 나는 다른 방법으로 담아 볼래! 한 봉지에 28개씩 2봉지에 담아야지.
              </Typography>
            </TextView>
          </Box>
          <Box marginTop='30px'>
            <Mark size={'medium'} type={cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none'}>
              <Typography
                useGap={false}
                fontSize='var(--font-size-28)'
                color='var(--color-yellow-800)'
                weight='var(--font-weight-semiBold)'
                align='center'
              >
                &nbsp;1
              </Typography>
            </Mark>
            <Typography>현수가 봉지에 담은 땅콩은 몇 개인지 구해 보세요.</Typography>
            <Box height={'220px'}>
              <Drawing ref={canvasRef} tmpSave={tmpSaveCanvas} disabled={cardData.p01.isSubmitted} />
            </Box>
            <Box display='flex' justifyContent='right' alignItems='center' marginTop='10px'>
              <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
              <Input
                type='number'
                marginLeft={8}
                width='245px'
                readOnly={cardData.p01.isSubmitted}
                status={inputStatus(cardData.p01.answer1.isCorrect)}
                onChange={e => answerInputChange(e.target.value)}
                value={cardData.p01.answer1.value}
                ariaLabel='17과 3의 곱하기 답란'
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <BottomSheet
        height={'50%'}
        show={isShowBottom}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setIsShowBottom(false);
          },
        }}
      >
        <AnswerSheet01 />
      </BottomSheet>
    </Container>
  );
};

export default P01;
