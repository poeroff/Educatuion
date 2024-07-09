import { Box, ETextViewColor, TextView, Typography, Label, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
    const questionInfo: IQuestionProps = {
        type: 'icon',
        text: (
          <>
            <Label type='icon' size='middle' value='1' />
            길이를 재어 보세요.
          </>
        ),
      };
  return (
    <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} useRound>
      <Box hAlign='center' useFull>
        
      </Box>
    </Container>
  );
};

export default P01;
