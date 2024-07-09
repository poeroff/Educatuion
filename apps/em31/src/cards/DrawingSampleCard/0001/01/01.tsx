import { useEffect, useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Drawing, IQuestionProps, Label, TMainHeaderInfoTypes, ICanvasFunction } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { dataURLToBlob } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { DrawingSampleCard_0001_01 } from './store';

const P01 = () => {
  const { initData, submitData, saveData, changeData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(DrawingSampleCard_0001_01);
  const { userId } = useRecoilValue(studentAtom);
  const canvasRef = useRef<ICanvasFunction>(null);
  const subjectCode = import.meta.env.VITE_APP_CODE.toUpperCase();

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' />
        Drawing Sample
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
          value: '', //for real save data path
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '', //for tmp save data url text
        },
      ],
    },
  ];

  const tmpSaveCanvas = async () => {
    if (!canvasRef.current?.isCanvasBlank()) {
      const canvasDataURL = canvasRef.current?.getValue();
      if (canvasDataURL) {
        setCardData(prev => ({ ...prev, p01: { ...prev.p01, canvasDataURL: canvasDataURL } }));
        changeData('P01', 1, 2, canvasDataURL);
      }
    }
  };

  const onSubmit = async () => {
    const uploadCanvasImagePromise = canvasRef.current?.uploadCanvasImage({
      subjectCode: subjectCode,
      cardPath: '/DrawingSampleCard/0001/01', //setting required based on card
      canvasIndex: 1,
      page: '01',
      userId: userId,
    });
    const canvasPath = await uploadCanvasImagePromise;
    if (canvasPath) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, canvasPath1: canvasPath, isSubmitted: true } }));
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
      submitData('P01', userSubmission);
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
            canvasPath1: userSubmissionList[0].inputData[0]?.value || cardData.p01.canvasPath1,
            canvasDataURL: userSubmissionList[0].inputData[1]?.value || cardData.p01.canvasDataURL,
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
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, [userId]);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} onSubmit={onSubmit} useRound vAlign='flex-start'>
      <Drawing ref={canvasRef} tmpSave={tmpSaveCanvas} disabled={cardData.p01.isSubmitted} />
    </Container>
  );
};

export default P01;
