import { ICanvasFunction, IQuestionProps, Label, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import EM00902 from '@maidt-cntn/math/pages/EM-009-02';
import { useRecoilValue, useRecoilState } from 'recoil';
import { A01_0004_05 } from './store';
import usePageData from '@/hooks/usePageData';
import { useEffect, useRef } from 'react';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { MathExpression } from '@maidt-cntn/ui/math';
import { dataURLToBlob } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const [cardData, setCardData] = useRecoilState(A01_0004_05);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { initData, submitData, saveData, changeData } = usePageData();
  const canvasRef = useRef<ICanvasFunction>(null);

  const pageKey = 'p02';
  const pageNumber = 'P02';

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

  const answers = ['일의 자리끼리, 십의 자리끼리, 백의 자리끼리 더합니다. 각 자리의 합이 두 자리 수이면 윗자리 계산에 1을 더합니다.'];

  const descriptions = [
    '- 일의 자리끼리, 십의 자리끼리, 백의 자리끼리 더합니다.',
    '- 각 자리의 합이 두 자리 수이면 윗자리 계산에 1을 더합니다.',
    '- 일의 자리에서 받아올림한 수는 십의 자리에 더하고, 십의 자리에서 받아올림한 수는 백의 자리에 더합니다.',
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: <MathExpression equation={'$256+378$ 계산하기'} />,
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

export default P02;
