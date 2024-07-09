import { Box, Button, Image } from '@maidt-cntn/ui';
import { HContainer } from '@maidt-cntn/ui/math';

const HM03401 = () => {
  return (
    <HContainer headerInfo={null}>
      <Box hAlign='center' flexDirection='column'>
        <Image src='/example/HM-034-01/Group 1000004210.svg' alt='배운 개념 확인하기' />
        <Box marginTop='80px'>
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

export default HM03401;
