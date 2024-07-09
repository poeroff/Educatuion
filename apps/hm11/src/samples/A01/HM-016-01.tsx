import { Box, IQuestionProps, Typography } from '@maidt-cntn/ui';
import { HContainer, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';

const HM01601 = () => {
  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerText: '중단원의 핵심 개념을 확인해 보자.',
    headerTextColor: 'var(--color-black)',
    headerPattern: 'icon',
    iconType: 'mathWrapUp',
    useExtend: true,
  };

  const questionInfo: IQuestionProps = {
    text: (
      <Box vAlign='center'>
        <Box width='6px' height='24px' background='var(--color-h-math-primary-normal)' borderRadius='3px' />
        <Typography fontSize='var(--font-size-32)' lineHeight='50px' weight='var(--font-weight-semiBold)' color='var(--color-h-math-primary-normal)'>
          다항식의 정리
        </Typography>
      </Box>
    ),
  };

  return (
    <HContainer headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start'>
      <Typography>
        (1) 다항식을 한 문자에 대하여 차수가 높은 항부터 차례대로 나타내는 것을 그 문자에 대하여&nbsp;
        <Typography useGap={false} useSticker>
          ‘내림차순으로 정리한다’
        </Typography>
        고 한다
      </Typography>
      <Box marginTop='24px'>
        <Typography>
          (2) 다항식을 한 문자에 대하여 차수가 낮은 항부터 차례대로 나타내는 것을 그 문자에 대하여&nbsp;
          <Typography useGap={false} useSticker>
            ‘오름차순으로 정리한다’
          </Typography>
          고 한다
        </Typography>
      </Box>
    </HContainer>
  );
};

export default HM01601;
