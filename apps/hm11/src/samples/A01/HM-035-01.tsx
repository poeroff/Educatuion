import { HContainer } from '@maidt-cntn/ui/math';
import { Box, Button, Typography, Image } from '@maidt-cntn/ui';

const HM03501 = () => {
  return (
    <HContainer headerInfo={null}>
      <Box flexDirection='column' hAlign='center'>
        <Box padding='145px 0 25px 0'>
          <Image src='/example/HM-035-01/title.svg' alt='초성 퀴즈' />
        </Box>
        <Box border='1px dashed var(--color-h-math-purple-origin)' padding='12px 24px' useRound>
          <Box hAlign='center' width='49px' height='25px' backgroundColor='var(--color-h-math-purple-strong)' useRound>
            <Typography
              useGap={false}
              lineHeight='16px'
              fontSize='var(--font-size-14)'
              fontWeight='var(--font-weight-extraBold)'
              color='var(--color-white)'
            >
              규칙
            </Typography>
          </Box>
          <Box marginTop='8px'>
            <Typography usePre useGap={false} lineHeight='30px' fontSize='var(--font-size-20)'>
              1. 해당 중단원에서 사용한 단어 중에서 출제합니다.{'\n'}2. 출제자의 정답만 인정합니다.
            </Typography>
          </Box>
        </Box>
        <Box marginTop='24px'>
          <Button
            height='48px'
            ariaLabel='시작 버튼'
            style={{ padding: '12px 24px', color: 'var(--color-black)', background: 'var(--color-white)', border: '1px solid var(--color-grey-300)' }}
          >
            Start
          </Button>
        </Box>
      </Box>
    </HContainer>
  );
};

export default HM03501;
