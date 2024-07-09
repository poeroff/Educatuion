import { Box, EStyleButtonTypes, IQuestionProps, Label, TMainHeaderInfoTypes, Drawing } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EM00902 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '492 + 194 계산하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄷ' type='paint' background='#969590' color='var(--color-white)' />
        계산 결과와 어림한 값을 비교해 보세요.
      </>
    ),
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='완료하기'
      submitBtnColor={EStyleButtonTypes.YELLOW}
      onSubmit={() => {}}
      useRound
    >
      <Box useFull>
        <Drawing />
      </Box>
    </Container>
  );
};

export default EM00902;
