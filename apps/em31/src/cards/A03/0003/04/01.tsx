import { ICanvasFunction, IQuestionProps, Label, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useRecoilValue, useRecoilState } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { useEffect, useRef } from 'react';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { A03_0003_04 } from './store';
import EM00902 from '@maidt-cntn/math/pages/EM-009-02';
import { dataURLToBlob } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const [cardData, setCardData] = useRecoilState(A03_0003_04);
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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            canvasDataURL: userSubmissionList[0].inputData[0]?.value || cardData.p01.canvasDataURL,
            isSubmitted,
          },
        }));

        if (userSubmissionList[0].inputData[0]?.value || cardData.p01.canvasDataURL) {
          if (userSubmissionList[0].inputData[0]?.value)
            canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(userSubmissionList[0].inputData[0]?.value));
          else canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(cardData.p01.canvasDataURL));
        }
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '필요한 봉투 수 알아보기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' type='paint' color='var(--color-white)' background='var(--color-grey-600)' />
        달걀 10개를 2개씩 덜어 내면 몇 번 덜어 낼 수 있는지 이야기 해 보세요.
      </>
    ),
  };
  const tmpSaveCanvas = async () => {
    if (!canvasRef.current?.isCanvasBlank()) {
      const canvasDataURL = canvasRef.current?.getValue();
      if (canvasDataURL) {
        setCardData(prev => ({ ...prev, p01: { ...prev.p01, canvasDataURL: canvasDataURL } }));
        changeData(pageNumber, 1, 1, canvasDataURL);
      }
    }
  };

  const onSubmit = async () => {
    const canvasDataURL = canvasRef.current?.getValue();
    if (canvasDataURL) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, canvasDataURL: canvasDataURL, isSubmitted: true } }));
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
      answers={cardData[pageKey].solution}
      isSubmit={cardData[pageKey].isSubmitted}
      onSubmit={onSubmit}
      canvasRef={canvasRef}
      canvasTmpSave={tmpSaveCanvas}
    />
  );
};

export default P01;
