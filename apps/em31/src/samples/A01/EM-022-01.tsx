import { useState } from 'react';
import styled from '@emotion/styled';

import { Box, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Stamp, EStampType, Container } from '@maidt-cntn/ui/math';

const EM01101 = () => {
  const [radio, setRadio] = useState<number | null>(null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathStar',
    headerText: '이번 시간에 공부한 내용을 문제를 풀며 확인해 보세요.',
  };

  const handleRadio = (index: number) => {
    setRadio(index);
  };

  return (
    <Container headerInfo={headerInfo} background={'var(--color-white)'} submitLabel='완료하기' onSubmit={() => {}} useRound>
      <Box hAlign='center'>
        {/* TODO: Typography 36px 사이즈 필요 */}
        <Typography weight={600}>이번 시간에 공부한 내용은 잘 이해했나요?</Typography>
      </Box>
      <Box hAlign='center' marginTop='24px'>
        <Box hAlign='center' marginRight='144px'>
          <Stamp isClicked={radio === 0} onClick={() => handleRadio(0)} stampType={EStampType.O} />
        </Box>
        <Box hAlign='center'>
          <Stamp isClicked={radio === 1} onClick={() => handleRadio(1)} stampType={EStampType.X} />
        </Box>
      </Box>
    </Container>
  );
};

export default EM01101;

const Text = styled(Typography)`
  font-size: var(--font-size-36);
`;
