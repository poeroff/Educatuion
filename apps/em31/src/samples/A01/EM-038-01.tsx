import { Box, IQuestionProps, Input, Label, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EM03801 = () => {
  const headerInfo = {};
  const questionInfo: IQuestionProps = {
    size: 'large',
    text: (
      <>
        <Box vAlign='center'>
          <Label type='icon' size='small' value={4} marginRight={12} />
        </Box>
        나눗셈의 몫을 구할 수 있는 곱셈식을 쓰고 몫을 구해보세요.
      </>
    ),
  };
  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} useRound>
      <Box display='flex'>
        <Box useFull type='dashed' borderRadius='16px' padding='24px'>
          <Box background='yellow' textAlign='center' useRound marginBottom={36}>
            <Box padding='8px 12px' lineHeight='54px' fontSize='36px' whiteSpace='nowrap'>
              36÷4
            </Box>
          </Box>
          <Box display='flex' whiteSpace='nowrap' alignItems='center'>
            <Box width='100px' display='flex' justifyContent='right'>
              <Box
                color='var(--color-yellow-800)'
                backgroundColor='var(--color-yellow-100)'
                border='1px solid var(--color-yellow-700)'
                fontSize={22}
                borderRadius={50}
                display='flex'
                alignItems='center'
                padding='4px 18px'
                height={44}
                marginRight={8}
              >
                곱셈식
              </Box>
            </Box>
            <Box display='flex' width={'calc(100% - 108px'}>
              <Input width='100%' value='' onChange={() => {}} />
              <Typography>×</Typography>
              <Input width='100%' value='' onChange={() => {}} />
              <Typography>=</Typography>
              <Input width='100%' value='' onChange={() => {}} />
            </Box>
          </Box>

          <Box display='flex' marginTop={12}>
            <Box width='100px' display='flex' justifyContent='right' alignItems='center'>
              <Label
                value='몫'
                color='var(--color-yellow-800)'
                background='var(--color-yellow-100)'
                lineColor='var(--color-yellow-700)'
                size='small'
                marginRight={8}
              />
            </Box>
            <Input width='146px' value='' onChange={() => {}} />
          </Box>
        </Box>
        <Box useFull type='dashed' borderRadius='16px' padding='24px' marginLeft='24px'>
          <Box background='yellow' textAlign='center' useRound marginBottom={36}>
            <Box padding='8px 12px' lineHeight='54px' fontSize='36px' whiteSpace='nowrap'>
              48÷6
            </Box>
          </Box>

          <Box display='flex' whiteSpace='nowrap' alignItems='center'>
            <Box width='100px' display='flex' justifyContent='right'>
              <Box
                color='var(--color-yellow-800)'
                backgroundColor='var(--color-yellow-100)'
                border='1px solid var(--color-yellow-700)'
                fontSize={22}
                borderRadius={50}
                display='flex'
                alignItems='center'
                padding='4px 18px'
                height={44}
                marginRight={8}
              >
                곱셈식
              </Box>
            </Box>
            <Box display='flex' width={'calc(100% - 108px'}>
              <Input width='100%' value='' onChange={() => {}} />
              <Typography>×</Typography>
              <Input width='100%' value='' onChange={() => {}} />
              <Typography>=</Typography>
              <Input width='100%' value='' onChange={() => {}} />
            </Box>
          </Box>

          <Box display='flex' marginTop={12}>
            <Box width='100px' display='flex' justifyContent='right' alignItems='center'>
              <Label
                value='몫'
                color='var(--color-yellow-800)'
                background='var(--color-yellow-100)'
                lineColor='var(--color-yellow-700)'
                size='small'
                marginRight={8}
              />
            </Box>
            <Input width='146px' value='' onChange={() => {}} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default EM03801;
