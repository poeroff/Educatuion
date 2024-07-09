import { Box, BoxWrap, IQuestionProps, Input, Label } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EM05001 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={19} marginRight={12} />
        다음 중에서 무게의 합이 4 kg인 것의 기호를 써 보세요.
      </>
    ),
  };
  const data = [
    { label: '가', item1: '버섯 1 kg 200 g', item2: '옥수수 2 kg 800 g' },
    { label: '나', item1: '당근 1 kg 300 g', item2: '배추 1 kg 700 g' },
  ];
  return (
    <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} onSubmit={() => {}} useRound>
      <Box useFull>
        <BoxWrap>
          {data.map((value, index) => {
            return (
              <BoxWrap key={`list-item-${index}`}>
                <Label value={value.label} />
                <Box background='yellow' marginLeft='8px' width='400px' hAlign='center' useRound>
                  <Box padding='8px 12px' fontSize='var(--font-size-36)' lineHeight='54px' whiteSpace='pre-line' textAlign='left'>
                    {value.item1}
                    {'\n'}
                    {value.item2}
                  </Box>
                </Box>
              </BoxWrap>
            );
          })}
        </BoxWrap>
        <Box hAlign='end' marginTop='24px'>
          <Input placeholder='' ariaLabel='무게의 합이 4kg인 것의 기호 입력란' value='' width='256px' onChange={() => {}} />
        </Box>
      </Box>
    </Container>
  );
};

export default EM05001;
