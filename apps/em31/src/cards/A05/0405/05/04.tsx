import EM00902 from '@maidt-cntn/math/pages/EM-009-02';
import { ICanvasFunction, IQuestionProps, Label, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useEffect, useRef } from 'react';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { A05040505_store } from './store';
import { useRecoilValue, useRecoilState } from 'recoil';
import { MathExpression } from '@maidt-cntn/ui/math';

const P04 = () => {
  const pageNo = 'P04';
  const { initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A05040505_store);
  const { userId } = useRecoilValue(studentAtom);
  const canvasRef = useRef<ICanvasFunction>(null);
  const subjectCode = import.meta.env.VITE_APP_CODE.toUpperCase();

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: <MathExpression equation={'지도에서 거리 어림하기'} />,
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄹ' type='paint' background='var(--color-grey-600)' color='var(--color-white)' />
        지도에서 거리를 어림한 방법을 설명해 보세요.
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
          isAnswer: true,
        },
      ],
    },
  ];

  const onSubmit = async () => {
    const uploadCanvasImagePromise = canvasRef.current?.uploadCanvasImage({
      subjectCode: subjectCode,
      cardPath: '/A05/0405/05',
      canvasIndex: 1,
      page: '04',
      userId: userId,
    });
    const canvasPath = await uploadCanvasImagePromise;
    if (canvasPath) {
      setCardData(prev => ({ ...prev, P04: { ...prev.P04, canvasPath1: canvasPath, isSubmitted: true } }));
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
      submitData(pageNo, userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P04: {
            ...prev.P04,
            canvasPath: userSubmissionList[0].inputData[0]?.value || cardData.P04.canvasPath1,
            isSubmitted,
          },
        }));
        if (userSubmissionList[0].inputData[0]?.value || cardData.P04.canvasPath1) {
          canvasRef.current?.settingCanvasImage({
            subjectCode: subjectCode,
            uploadPath: userSubmissionList[0].inputData[0]?.value || cardData.P04.canvasPath1,
          });
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
      answers={cardData.P04.solution}
      isSubmit={cardData.P04.isSubmitted}
      onSubmit={onSubmit}
      canvasRef={canvasRef}
    />
  );
};
export default P04;
