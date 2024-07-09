import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  Drawing,
  EStyleButtonTypes,
  ETagLine,
  ICanvasFunction,
  IQuestionProps,
  Label,
  TMainHeaderInfoTypes,
  Tag,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { dataURLToBlob } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A01_0006_06 } from './store';

const P03 = () => {
  const [cardData, setCardData] = useRecoilState(A01_0006_06);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { initData, submitData, saveData, changeData } = usePageData();
  const canvasRef = useRef<ICanvasFunction>(null);
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '491-218 계산하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄷ' type='paint' background='#969590' color='var(--color-white)' />
        계산 결과와 어림한 값을 비교해 보세요.
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
        changeData('P03', 1, 1, canvasDataURL);
      }
    }
  };

  const onSubmit = async () => {
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
      return;
    } else {
      const canvasDataURL = canvasRef.current?.getValue();
      if (canvasDataURL) {
        setCardData(prev => ({ ...prev, p03: { ...prev.p03, canvasDataURL: canvasDataURL, isSubmitted: true } }));
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
      submitData('P03', userSubmission);
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
            canvasDataURL: userSubmissionList[0].inputData[0]?.value || cardData.p03.canvasDataURL,
            isSubmitted,
          },
        }));

        if (userSubmissionList[0].inputData[0]?.value || cardData.p03.canvasDataURL) {
          if (userSubmissionList[0].inputData[0]?.value)
            canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(userSubmissionList[0].inputData[0]?.value));
          else canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(cardData.p03.canvasDataURL));
        }
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P03');
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
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitBtnColor={cardData.p03.isSubmitted ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.YELLOW}
      onSubmit={onSubmit}
      useRound
    >
      <Box useFull>
        <Drawing ref={canvasRef} tmpSave={tmpSaveCanvas} disabled={cardData.p03.isSubmitted} />
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시 답안' />
          </Box>
          <Box marginTop='12px'>300쯤으로 어림했는데 계산하면 273입니다.</Box>
          <Box marginTop='24px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
