import { useEffect, useState } from 'react';
import { Typography, IQuestionProps, SvgIcon, Box } from '@maidt-cntn/ui';
import EM03701, { IApiInfo, IBottomSheetInfo, IImageInfo } from '@maidt-cntn/math/pages/EM-037-01';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import headerIcon from '@/assets/icon/m_default_01.svg';
import { C03_0008_30 } from './store';

const P01 = () => {
  const { changeData, initData, saveData, submitDataWithResult } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C03_0008_30);

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
    correctAnswer: '24, 4, 6',
    explanation: '토마토 24개를 바구니 4개에 똑같이 나누어 담으면 바구니 한 개에 토마토를 24÷4=6(개) 담을 수 있습니다.',
  };

  const [mark, setMark] = useState<string>('none');
  const imageInfo: IImageInfo = {
    src: '/C03/0008/30/DEC313M01.png',
    alt: '토마토 24개와 바구니 4개가 그려진 그림입니다.',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='center'>
        <SvgIcon src={headerIcon} size='48px' />
        <Typography>토마토 24개를 바구니 4개에 똑같이 나누어 담으면 바구니 한 개에 담을 수 있는 토마토는 몇 개인지 나눗셈식을 써 보세요.</Typography>
      </Box>
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
      expression='24÷4=6'
      headerInfo={null}
      imageInfo={imageInfo}
      questionInfo={questionInfo}
    />
  );
};

export default P01;
