import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  Drawing,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  ICanvasFunction,
  IQuestionProps,
  Image,
  Label,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A04_0002_05 } from './store';
import { dataURLToBlob } from '@maidt-cntn/util/CommonUtil';

const P04 = () => {
  const { initData, submitData, changeData, saveData } = usePageData();
  const [isShow, setShow] = useState(false);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A04_0002_05);
  const canvasRef = useRef<ICanvasFunction>(null);
  const subjectCode = import.meta.env.VITE_APP_CODE.toUpperCase();

  const pageNumber = 'P04';
  const pageKey = 'p04';

  const explanation = '십의 자리 수 3과 2를 곱한 6을 십의 자리에 쓰고, 일의 자리에 0을 씁니다.';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '30×2 계산하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='center'>
        <Label value={'ㄷ'} color='var(--color-white)' background='var(--color-grey-600)' marginRight={12} />
        <Box marginTop={5} vAlign='center'>
          계산하는 방법을 설명해 보세요.
        </Box>
      </Box>
    ),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
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
        changeData(pageNumber, 1, 2, canvasDataURL);
      }
    }
  };

  const submitAnswer = async () => {
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
    } else {
      const uploadCanvasImagePromise = canvasRef.current?.uploadCanvasImage({
        subjectCode: subjectCode,
        cardPath: 'A04/0002/05', //setting required based on card
        canvasIndex: 1,
        page: '04',
        userId: userId,
      });

      const canvasPath = await uploadCanvasImagePromise;
      if (canvasPath) {
        setCardData(prev => ({ ...prev, p04: { ...prev.p04, canvasPath1: canvasPath, isSubmitted: true } }));
        const userSubmission: userSubmissionType[] = [
          {
            mainKey: 1,
            inputData: [
              {
                subKey: 1,
                type: 'TEXT',
                value: canvasPath,
              },
            ],
          },
        ];
        submitData(pageNumber, userSubmission);
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
            canvasPath1: userSubmissionList[0].inputData[0]?.value || cardData.p04.canvasPath1,
            canvasDataURL: userSubmissionList[0].inputData[1]?.value || cardData.p04.canvasDataURL,
            isSubmitted,
          },
        }));

        if (!isSubmitted) {
          //canvas image load from temp save
          if (userSubmissionList[0].inputData[1]?.value || cardData.p04.canvasDataURL) {
            if (userSubmissionList[0].inputData[1]?.value)
              canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(userSubmissionList[0].inputData[1]?.value));
            else canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(cardData.p04.canvasDataURL));
          }
        } else {
          //canvas image load from real save
          if (userSubmissionList[0].inputData[0]?.value || cardData.p04.canvasPath1) {
            canvasRef.current?.settingCanvasImage({
              subjectCode: subjectCode,
              uploadPath: userSubmissionList[0].inputData[0]?.value || cardData.p04.canvasPath1,
            });
          }
        }
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P04');
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
        <Box margin='100px 10px 0 0' borderRadius={8} padding='20px 30px' width='374px' height='245px' background='var(--color-orange-100)'>
          <Image
            src='/A04/0002/05/A-EM31-040002-0504_1.png'
            width='264px'
            height='200px'
            alt='첫 번째 줄의 식은 3곱하기2는 빈칸이고, 3과 빈칸을 각각 10배하여 표현한 식이 두 번째 줄에 있습니다. 두 번째 줄의 식은 30곱하기2는 빈칸입니다.'
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
              {explanation}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P04;
