import { ChangeEvent, useEffect, useState } from 'react';
import { Image, Box, Label, Typography, Input, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import EM03701, { IApiInfo, IBottomSheetInfo, IImageInfo } from '@maidt-cntn/math/pages/EM-037-01';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { A03000804 } from './store';

const P01 = () => {
  const { changeData, initData, saveData, submitDataWithResult } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A03000804);

  const apiInfo: IApiInfo = {
    pageId: 'P01',
    changeData,
    initData,
    pageIds,
    saveData,
    submitDataWithResult,
    userId,
  };

  const bottomSheetInfo: IBottomSheetInfo = {
    correctAnswer: '30, 5, 6',
    explanation: ' 농구공 30개를 바구니 5개에 똑같이 나누어 담으면 바구니 한 개에 농구공을 30÷5=6(개) 담을 수 있습니다.',
    hint: '농구공 30개를 5개씩 묶어 보고 나눗셈식으로 나타내 보세요.',
  };

  const [mark, setMark] = useState<string>('none');
  const imageInfo: IImageInfo = {
    src: '/A03/0008/04/MC31305.png',
    alt: '농구공 30개와 바구니 5개가 있습니다.',
  };
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='1' type='icon' />
        <Typography>농구공 30개를 바구니 5개에 똑같이 나누어 담으면 바구니 한 개에 담을 수 있는 농구공은 몇 개인지 나눗셈식을 써 보세요.</Typography>
      </>
    ),
    mark: mark,
  };

  useEffect(() => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: mark != 'none' ? true : false, isCorrect: mark == 'correct' ? true : false } }));
  }, [mark]);

  return (
    <EM03701
      bottomSheetInfo={bottomSheetInfo}
      apiInfo={apiInfo}
      setMark={setMark}
      expression='30÷5=6'
      headerInfo={null}
      imageInfo={imageInfo}
      questionInfo={questionInfo}
    />
  );
};

export default P01;
