import {
  Box,
  Drawing,
  ETagLine,
  IQuestionProps,
  Label,
  EStyleButtonTypes,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
  BottomSheet,
  ICanvasFunction,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { dataURLToBlob } from '@maidt-cntn/util/CommonUtil';
import { useRecoilValue, useRecoilState } from 'recoil';
import { A04_0003_05 } from './store';
import usePageData from '@/hooks/usePageData';
import { useEffect, useState, useRef } from 'react';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const [cardData, setCardData] = useRecoilState(A04_0003_05);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { initData, submitData, saveData, changeData } = usePageData();
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const canvasRef = useRef<ICanvasFunction>(null);
  const pageKey = 'p02';
  const pageNumber = 'P02';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '12×4 계산하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄴ' type='paint' background='var(--color-grey-600)' color='var(--color-white)' />
        계산하는 방법을 설명해 보세요.
      </>
    ),
  };

  const answers = [
    '일의 자리 수와 십의 자리 수에 4를 각각 곱합니다.',
    '일의 자리 수 2와 4를 곱하여 8을 일의 자리에 쓰고, 십의 자리 수 1과 4를 곱하여 4를 십의 자리에 씁니다.',
    '일의 자리 계산과 십의 자리 계산 결과를 자리에 맞추어 씁니다.',
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'CANVAS',
          value: '',
        },
      ],
    },
  ];

  const tmpSaveCanvas = async () => {
    if (!canvasRef.current?.isCanvasBlank()) {
      const canvasDataURL = canvasRef.current?.getValue();
      if (canvasDataURL) {
        setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], canvasDataURL: canvasDataURL } }));
        changeData(pageNumber, 1, 1, canvasDataURL);
      }
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            canvasDataURL: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].canvasDataURL,
            isSubmitted,
          },
        }));

        if (userSubmissionList[0].inputData[0]?.value || cardData[pageKey].canvasDataURL) {
          if (userSubmissionList[0].inputData[0]?.value)
            canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(userSubmissionList[0].inputData[0]?.value));
          else canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(cardData[pageKey].canvasDataURL));
        }
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = async () => {
    if (cardData[pageKey].isSubmitted) {
      setShowAnswer(show => !show);
    } else {
      const canvasDataURL = canvasRef.current?.getValue();
      if (canvasDataURL) {
        setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], canvasDataURL: canvasDataURL, isSubmitted: true } }));
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
      submitData(pageNumber, userSubmission);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId={'targetContainer'}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={!cardData[pageKey].isSubmitted ? '완료하기' : !showAnswer ? '답안 보기' : '답안 닫기'}
      submitBtnColor={EStyleButtonTypes.YELLOW}
      onSubmit={handleSubmit}
      useRound
    >
      <Drawing ref={canvasRef} tmpSave={tmpSaveCanvas} disabled={cardData[pageKey].isSubmitted} />

      <BottomSheet
        height={'50%'}
        show={showAnswer}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShowAnswer(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          {answers && (
            <Box>
              <Tag type={ETagLine.GREEN} label='예시답안' />
              <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'10px'}>
                {answers.map((answer, index) => (
                  <Typography key={`answer-${index}`} lineHeight='normal'>
                    {answers.length === 1 ? '' : '- '}
                    {answer}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
