import { useState } from 'react';
import { Box, ETagPaint, Tag } from '@maidt-cntn/ui';
import { HContainer, RatingList } from '@maidt-cntn/ui/math';

const ratingListData = {
  data: [
    { text: '서두르지 않고 꼼꼼하게 문제를 풀어 보겠다.', rating: '아주 잘할 거야!' },
    { text: '여러 가지 방법으로 문제를 해결하도록 하겠다.', rating: '잘할 거야!' },
    { text: '틀린 문제에 대해 풀이를 확인하기 전에 한 번 더 고민하여 풀어 보겠다.', rating: '노력할 거야!' },
  ],
  ratingData: ['조금\n부족해!', '잘했어!', '아주\n잘했어!'],
};

const HM00402 = () => {
  const [ratings, setRatings] = useState<number[]>(Array(ratingListData.data.length).fill(0));

  const handleRatingChange = (index: number, rating: number) => {
    const currentRatings = [...ratings];
    currentRatings[index] = rating;
    setRatings(currentRatings);
  };

  return (
    <HContainer headerInfo={null} useExtend submitLabel='완료하기' onSubmit={() => {}} vAlign='flex-start'>
      <Box padding='0 12px'>
        <Tag type={ETagPaint.GREEN_PAINT} label='내가 설정한 학습 목표' />
      </Box>
      <RatingList data={ratingListData.data} />
      <Box padding='0 12px' marginTop='48px'>
        <Tag type={ETagPaint.GREEN_PAINT} label='학습 목표 점검' useTypoPadding />
        <RatingList
          ratingType='check'
          title='위에서 내가 정한 학습 목표를 잘 지켰는지 스스로 체크해요!'
          data={ratingListData.data}
          ratingData={ratingListData.ratingData}
          ratings={ratings}
          onRatingChange={handleRatingChange}
        />
      </Box>
    </HContainer>
  );
};

export default HM00402;
