import { useState } from 'react';
import styled from '@emotion/styled';
import { Box, Image, Typography, EStyleFontSizes } from '@maidt-cntn/ui';
import { HContainer, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';

const HM01301 = () => {
  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathInqConvg',
    headerText: '재미있는 다항식의 전개식!',
    headerTextColor: 'var(--color-header-purple)',
    headerSubTexts: ['inference', 'relation'],
  };

  const [isClicked, setIsClicked] = useState<boolean>(false);

  return (
    <HContainer headerInfo={headerInfo} vAlign='flex-end'>
      <Box position='absolute' top='0' width='calc(100% - 80px)'>
        <Typography fontSize='32px' lineHeight='50px' weight='var(--font-weight-semiBold)'>
          &nbsp; 1부터 1111111111까지 각 자리 숫자가 1인 자연수를 제곱하면 가운데 자리 숫자를 중심으로 좌우 대칭인 자연수들이 만들어진다. 이들을
          다음과 같이 피라미드 모양으로 나타낼 수 있다.
        </Typography>
      </Box>
      <PyramidButton onClick={() => setIsClicked(true)}>
        {isClicked || (
          <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']}>
            피라미드를 클릭해 보세요!
          </Typography>
        )}
      </PyramidButton>
      <Image
        src={
          isClicked
            ? '../../assets/example/HM-013-01/M1a-1-1-탐구_특화페이지_완성03-2.png'
            : '../../assets/example/HM-013-01/M1a-1-1-탐구_특화페이지_완성03.png'
        }
        alt='이집트 피라미드 왼쪽에 스핑크스 조각이 있고, 오른쪽엔 낙타 두 마리가 걷고 있습니다.'
        width='880px'
      />
    </HContainer>
  );
};

const PyramidButton = styled.button`
  width: 540px;
  height: 280px;
  position: absolute;
  z-index: 100;
  top: 190px;
  right: 130px;

  > span {
    position: absolute;
    bottom: 90px;
    left: 140px;
  }
`;

export default HM01301;
