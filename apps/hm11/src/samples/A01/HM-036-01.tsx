import { Box, Button, Image } from '@maidt-cntn/ui';
import { HContainer } from '@maidt-cntn/ui/math';

const HM03601 = () => {
  return (
    <HContainer headerInfo={null}>
      <Box hAlign='center' flexDirection='column'>
        <Image src='/example/HM-036-01/Group 1000004209.svg' alt='빙고게임' />
        <Box marginTop='12px'>
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

export default HM03601;
