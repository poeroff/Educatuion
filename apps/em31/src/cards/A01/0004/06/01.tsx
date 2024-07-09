import { ICanvasFunction, IQuestionProps, Label, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import EM00902 from '@maidt-cntn/math/pages/EM-009-02';
import { MathExpression } from '@maidt-cntn/ui/math';
import { useRecoilValue, useRecoilState } from 'recoil';
import { A01_0004_06 } from './store';
import usePageData from '@/hooks/usePageData';
import { useEffect, useRef } from 'react';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { dataURLToBlob } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const [cardData, setCardData] = useRecoilState(A01_0004_06);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { initData, submitData, saveData, changeData } = usePageData();
  const canvasRef = useRef<ICanvasFunction>(null);
  const pageKey = 'p01';
  const pageNumber = 'P01';

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

  const answers = ['1300쯤'];

  const descriptions = ['589를 600으로, 734를 700으로 생각하면 600+700=1300입니다.'];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: <MathExpression equation={'$589+734$ 계산하기'} />,
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' type='paint' background='var(--color-grey-600)' color='var(--color-white)' />
        <MathExpression equation={'$589+734$는 얼마쯤일지 어림해 보세요.'} />
      </>
    ),
  };

  const handleSubmit = async () => {
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
  };

  return (
    <EM00902
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      answers={answers}
      descriptions={descriptions}
      isSubmit={cardData[pageKey].isSubmitted}
      onSubmit={handleSubmit}
      canvasRef={canvasRef}
      canvasTmpSave={tmpSaveCanvas}
    />
  );
};

export default P01;
