import { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  Drawing,
  IQuestionProps,
  Label,
  ICanvasFunction,
  Box,
  Typography,
  EStyleFontSizes,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { dataURLToBlob } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { A03_0007_03 } from './store';

const P06 = () => {
  const { initData, submitData, saveData, changeData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A03_0007_03);
  const { userId } = useRecoilValue(studentAtom);
  const canvasRef = useRef<ICanvasFunction>(null);
  const [isShow, setShow] = useState<boolean>(false);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={2} />
        <Box vAlign='center'>
          <Label type='icon' size='small' value={1} marginRight={8} />
          에서 알게 된 점을 살펴보세요.
        </Box>
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
        setCardData(prev => ({ ...prev, p06: { ...prev.p06, canvasDataURL: canvasDataURL } }));
        changeData('P06', 1, 1, canvasDataURL);
      }
    }
  };

  const onSubmit = async () => {
    if (cardData.p06.isSubmitted) {
      setShow(!isShow);
    } else {
      const canvasDataURL = canvasRef.current?.getValue();
      if (canvasDataURL) {
        setCardData(prev => ({ ...prev, p06: { ...prev.p06, canvasDataURL: canvasDataURL, isSubmitted: true } }));
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
      submitData('P06', userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P06')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p06: {
            ...prev.p06,
            canvasDataURL: userSubmissionList[0].inputData[0]?.value || cardData.p06.canvasDataURL,
            isSubmitted,
          },
        }));

        if (userSubmissionList[0].inputData[0]?.value || cardData.p06.canvasDataURL) {
          if (userSubmissionList[0].inputData[0]?.value)
            canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(userSubmissionList[0].inputData[0]?.value));
          else canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(cardData.p06.canvasDataURL));
        }
      }
      initData('P06', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P06');
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
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      onSubmit={onSubmit}
      submitLabel={cardData.p06.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitBtnColor={isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      useRound
      vAlign='flex-start'
    >
      <Box vAlign='flex-start' marginBottom={'24px'}>
        <Box height={'60px'} display='flex' alignItems='center'>
          <Label value='ㄱ' lineColor='none' background='#969590' color='var(--color-white)' marginRight={20} />
        </Box>
        <Typography useGap={false} size={EStyleFontSizes.LARGE}>
          ‘먹는 시간 간격’이 커질수록 ‘먹을 수 있는 횟수’는 어떻게 달라지나요?
        </Typography>
      </Box>

      <Drawing ref={canvasRef} tmpSave={tmpSaveCanvas} disabled={cardData.p06.isSubmitted} />

      <BottomSheet height={'50%'} show={cardData.p06.isSubmitted && isShow} bottomSheetTargetId={'targetContainer'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시 답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>먹는 시간 간격이 커질수록 먹을 수 있는 횟수는 작아집니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P06;
