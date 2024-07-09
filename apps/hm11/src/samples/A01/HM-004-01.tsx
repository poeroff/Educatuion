import { useState } from 'react';
import { Box, ETagPaint, IQuestionProps, Tag } from '@maidt-cntn/ui';
import { HContainer, RatingList, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';

const ratingListData = {
  data: [
    { text: '서두르지 않고 꼼꼼하게 문제를 풀어 보겠다.', rating: '아주 잘할 거야!' },
    { text: '여러 가지 방법으로 문제를 해결하도록 하겠다.', rating: '잘할 거야!' },
    { text: '틀린 문제에 대해 풀이를 확인하기 전에 한 번 더 고민하여 풀어 보겠다.', rating: '노력할 거야!' },
  ],
  ratingData: ['노력할\n거야!', '잘할\n거야!', '아주\n잘할 거야!'],
};

const HM00401 = () => {
  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathThisChapter',
  };

  const questionInfo: IQuestionProps = {
    text: '다항식의 덧셈과 뺄셈, 곱셈과 나눗셈의 원리를 이해한다.',
  };

  const [ratings, setRatings] = useState<number[]>(Array(ratingListData.data.length).fill(0));

  const handleRatingChange = (index: number, rating: number) => {
    const currentRatings = [...ratings];
    currentRatings[index] = rating;
    setRatings(currentRatings);
  };

  return (
    <HContainer headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start' useExtend submitLabel='완료하기' onSubmit={() => {}}>
      <Box padding='0 12px'>
        <Tag type={ETagPaint.GREEN_PAINT} label='학습 목표 설정' />
        <RatingList
          ratingType='check'
          title='스스로 학습 목표를 설정해 보세요!'
          data={ratingListData.data}
          ratingData={ratingListData.ratingData}
          ratings={ratings}
          onRatingChange={handleRatingChange}
        />
      </Box>
    </HContainer>
  );
};

export default HM00401;
