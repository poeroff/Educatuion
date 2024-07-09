import { Box, EStyleFontSizes, Image, Scroll, Typography } from '@maidt-cntn/ui';
import { HContainer, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';

const HM02502 = () => {
  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerText: '국가유산 디지털 복원가, 다항식으로 국가유산에 새 숨을 불어 넣다!',
    headerPattern: 'icon',
    headerTextColor: 'var(--color-header-purple)',
    iconType: 'mathDream',
  };

  return (
    <HContainer headerInfo={headerInfo} useExtend>
      <Scroll tabIndex={0}>
        <Box>
          <Typography size={EStyleFontSizes['X-MEDIUM']}>
            &nbsp; 2010년 곡면의 질감을 사실적으로 표현할 수 있는 그래픽 기법의 하나로 다항식 텍스처 매핑(PTM, Polynomial Texture Mapping) 기법이
            개발되어 큰 관심을 끌었다.
          </Typography>
        </Box>
        <Box marginTop='24px'>
          <Typography size={EStyleFontSizes['X-MEDIUM']}>
            &nbsp; 다항식 텍스처 매핑은 질감을 나타내는 요소인 텍셀(texel)마다 계수가 주어지는 사차 다항식을 이용하여 다양한 조명을 비추면서 표면의
            색깔을 재구성하는 것이다. 이 기법은 표면 형상의 변경 사항을 추적하고 기록하면서 곡면이 갖는 자체 그림자와 상호 반사에 한 다양한 변화를
            포착함으로써 곡면의 현실감을 더욱 향상한다.
          </Typography>
        </Box>
        <Box marginTop='24px' vAlign='flex-start'>
          <Image
            src='/example/HM-025-02/M1P-1-_02 1.png'
            width='339px'
            height='227px'
            alt='국가유산 디지털 복원가가 불상을 디지털 장치로 살펴보고 있습니다.'
          />
          <Box marginLeft='12px'>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>
              &nbsp; 이처럼 다항식 텍스처 매핑은 여러 각도의 조명으로 유물을 비추면서 표면을 관찰하고 이를 기록하여 원래의 질감을 구성하는 것으로,
              유물의 디지털 복원에 매우 큰 역할을 한다.
            </Typography>
          </Box>
        </Box>
      </Scroll>
    </HContainer>
  );
};

export default HM02502;
