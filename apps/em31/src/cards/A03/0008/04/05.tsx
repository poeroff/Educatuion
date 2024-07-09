import { useEffect, useState } from 'react';
import { Label, Typography, IQuestionProps } from '@maidt-cntn/ui';
import EM03702, { IApiInfo, IBottomSheetInfo, IImageInfo } from '@maidt-cntn/math/pages/EM-037-02';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { A03000804 } from './store';

const P05 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [mark, setMark] = useState('none');
  const [cardData, setCardData] = useRecoilState(A03000804);

  const apiInfo: IApiInfo = {
    pageId: 'P05',
    changeData,
    initData,
    pageIds,
    saveData,
    submitDataWithResult,
    userId,
  };

  const imageInfo: IImageInfo = {
    src: '/A03/0008/04/MC31307.png',
    alt: '색연필 18자루가 있습니다.',
    width: '638px',
    height: '65px',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='5' type='icon' />
        <Typography>색연필 18자루를 필통 한 개에 6자루씩 담으려고 합니다. 필요한 필통은 몇 개인가요?</Typography>
      </>
    ),
    mark: mark,
  };

  const bottomSheetInfo: IBottomSheetInfo = {
    correctAnswer: '18÷6=3, 3',
    explanation: '색연필 18개를 필통 한 개에 6자루씩 담으면 필통은 18÷6=3(개) 필요합니다.',
    hint: '색연필 18자루를 6자루씩 묶어 보고 식으로 나타내 보세요.',
  };

  useEffect(() => {
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, isSubmitted: mark != 'none' ? true : false, isCorrect: mark == 'correct' ? true : false } }));
  }, [mark]);

  return (
    <EM03702
      apiInfo={apiInfo}
      headerInfo={null}
      imageInfo={imageInfo}
      questionInfo={questionInfo}
      bottomSheetInfo={bottomSheetInfo}
      setMark={setMark}
      correctAnswer='3'
      expression='18÷6=3'
      unit='개'
    />
  );
};

export default P05;
