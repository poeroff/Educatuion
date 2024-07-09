import { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  Image,
  Box,
  TMainHeaderInfoTypes,
  Label,
  IQuestionProps,
  Tag,
  ETagLine,
  BottomSheet,
  Typography,
  EStyleButtonTypes,
  Drawing,
  EStyleFontSizes,
  ICanvasFunction,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { dataURLToBlob } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { A03_0005_05 } from './store';

const P03 = () => {
  const { initData, submitData, saveData, changeData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A03_0005_05);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);
  const canvasRef = useRef<ICanvasFunction>(null);

  const pageNumber = 'P03';
  const pageKey = 'p03';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '나눗셈의 몫을 곱셈구구로 구하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={'ㄷ'} color='var(--color-white)' background='var(--color-grey-600)' /> 32÷4의 몫을 곱셈식으로 구하는 방법을 설명해 보세요.
      </>
    ),
  };

  const answer: React.ReactNode = <Typography>32÷4＝8, 4×8＝32입니다.</Typography>;

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

  const submitAnswer = async () => {
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
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
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitBtnColor={isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      onSubmit={submitAnswer}
      useRound
    >
      <Box display='flex' height='400px'>
        <Box margin='100px 10px 0 0' borderRadius={8} padding='20px 30px' width='374px' height='206px' background='var(--color-orange-100)'>
          <Image
            src='/A03/0005/05/A-EM31-030005-0503.png'
            width='264px'
            height='166px'
            alt='32와 4의 관계를 표현한 이미지가 있습니다.32나누기 4의 답이 4 X x=32에서 x의 답과 같습니다.'
            ariaLabel='32와 4의 관계를 표현한 이미지가 있습니다.'
          />
        </Box>
        <Box useFull>
          <Drawing ref={canvasRef} tmpSave={tmpSaveCanvas} disabled={cardData[pageKey].isSubmitted} />
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' show={cardData[pageKey].isSubmitted && isShow} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography useGap={false} size={EStyleFontSizes.MEDIUM} usePre>
              {answer}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
