import { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  Drawing,
  IQuestionProps,
  Label,
  TMainHeaderInfoTypes,
  ICanvasFunction,
  EStyleButtonTypes,
  BottomSheet,
  Box,
  Tag,
  ETagLine,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { dataURLToBlob } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { A05_0008_05 } from './store';

const P03 = () => {
  const { initData, submitData, saveData, changeData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A05_0008_05);
  const { userId } = useRecoilValue(studentAtom);
  const canvasRef = useRef<ICanvasFunction>(null);
  const subjectCode = import.meta.env.VITE_APP_CODE.toUpperCase();
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '시간의 뺄셈하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={'ㄷ'} color='var(--color-white)' background='#969590' />
        시간의 뺄셈을 하는 방법을 설명해 보세요.
      </>
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
        {
          subKey: 2,
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
        setCardData(prev => ({ ...prev, p03: { ...prev.p03, canvasDataURL: canvasDataURL } }));
        changeData('P03', 1, 2, canvasDataURL);
      }
    }
  };

  const onSubmit = async () => {
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
    } else {
      const uploadCanvasImagePromise = canvasRef.current?.uploadCanvasImage({
        subjectCode: subjectCode,
        cardPath: '/A05/0008/05',
        canvasIndex: 1,
        page: '03',
        userId: userId,
      });
      const canvasPath = await uploadCanvasImagePromise;
      if (canvasPath) {
        setCardData(prev => ({ ...prev, p03: { ...prev.p03, canvasPath1: canvasPath, isSubmitted: true } }));
        const userSubmission: userSubmissionType[] = [
          {
            mainKey: 1,
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
            ],
          },
        ];
        submitData('P03', userSubmission);
      }
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            canvasPath1: userSubmissionList[0].inputData[0]?.value || cardData.p03.canvasPath1,
            canvasDataURL: userSubmissionList[0].inputData[1]?.value || cardData.p03.canvasDataURL,
            isSubmitted,
          },
        }));
        if (!isSubmitted) {
          if (userSubmissionList[0].inputData[1]?.value) {
            canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(userSubmissionList[0].inputData[1]?.value));
          } else if (cardData.p03.canvasDataURL) {
            canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(cardData.p03.canvasDataURL));
          }
        } else {
          if (userSubmissionList[0].inputData[0]?.value || cardData.p03.canvasPath1) {
            canvasRef.current?.settingCanvasImage({
              subjectCode: subjectCode,
              uploadPath: userSubmissionList[0].inputData[0]?.value || cardData.p03.canvasPath1,
            });
          }
        }
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P03');
    };
  }, [userId]);

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
      onSubmit={onSubmit}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitBtnColor={isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      useRound
      vAlign='flex-start'
    >
      <Drawing ref={canvasRef} tmpSave={tmpSaveCanvas} disabled={cardData.p03.isSubmitted} />

      <BottomSheet height={'50%'} show={cardData.p03.isSubmitted && isShow} bottomSheetTargetId={'targetContainer'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시 답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>초 단위의 수끼리, 분 단위의 수끼리, 시 단위의 수끼리 뺍니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
