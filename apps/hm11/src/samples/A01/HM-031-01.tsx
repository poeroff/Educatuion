import { useState } from 'react';
import { Box, BoxWrap, Button, EStyleButtonTypes, ETagLine, Tag, Typography } from '@maidt-cntn/ui';
import { HContainer } from '@maidt-cntn/ui/math';

const HM03101 = () => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const dataText = ['ㄴ', 'ㄹ', 'ㅊ', 'ㅅ'];
  const answer = '내림차순';

  return (
    <HContainer headerInfo={null}>
      <BoxWrap justifyContent='center'>
        {dataText.map(value => {
          return (
            <Box backgroundColor='var(--color-white)' padding='40px 48px' height='116px' useRound useShadow>
              <Typography
                useGap={false}
                lineHeight='36px'
                fontSize='80px'
                fontWeight='var(--font-weight-bold)'
                color='var(--color-h-math-purple-strong)'
              >
                {value}
              </Typography>
            </Box>
          );
        })}
      </BoxWrap>
      <Box marginTop={80} vAlign='center' height='48px'>
        <Box marginLeft={8}>
          <Button
            color={EStyleButtonTypes.NORMAL}
            onClick={() => {
              setShowAnswer(!showAnswer);
            }}
            ariaLabel='정답 보기'
          >
            <Tag type={ETagLine.GREEN} label='정답' fontSize='var(--font-size-24)' height='38px' />
          </Button>
        </Box>
        <Typography color='var(--color-h-math-primary-strong)' weight='var(--font-weight-bold)'>
          {showAnswer && answer}
        </Typography>
      </Box>
    </HContainer>
  );
};

export default HM03101;
