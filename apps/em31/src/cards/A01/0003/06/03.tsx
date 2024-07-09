import { useEffect, useRef } from 'react';
import EM00902 from '@maidt-cntn/math/pages/EM-009-02';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { A01_0003_06 } from './store';
import { ICanvasFunction, IQuestionProps, Label, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useRecoilValue, useRecoilState } from 'recoil';
import { MathExpression } from '@maidt-cntn/ui/math';
import { dataURLToBlob } from '@maidt-cntn/util/CommonUtil';

const P03 = () => {
  const pageNo = 'P03';
  const { initData, submitData, saveData, changeData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0003_06);
  const { userId } = useRecoilValue(studentAtom);
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
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: <MathExpression equation={'$492+194$ 계산하기'} />,
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄷ' type='paint' background='var(--color-grey-600)' color='var(--color-white)' />
        계산 결과와 어림한 값을 비교해 보세요.
      </>
    ),
  };

  const tmpSaveCanvas = async () => {
    if (!canvasRef.current?.isCanvasBlank()) {
      const canvasDataURL = canvasRef.current?.getValue();
      if (canvasDataURL) {
        setCardData(prev => ({ ...prev, p03: { ...prev.p03, canvasDataURL: canvasDataURL } }));
        changeData(pageNo, 1, 1, canvasDataURL);
      }
    }
  };

  const onSubmit = async () => {
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
    submitData(pageNo, userSubmission);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
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
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <EM00902
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      answers={cardData.p03.solution}
      isSubmit={cardData.p03.isSubmitted}
      onSubmit={onSubmit}
      canvasRef={canvasRef}
      canvasTmpSave={tmpSaveCanvas}
    />
  );
};

export default P03;
