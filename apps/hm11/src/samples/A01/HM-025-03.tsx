import { Box, BoxWrap, EStyleFontSizes, Image, Label, Typography } from '@maidt-cntn/ui';
import { HContainer, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';

const data = [
  { text: '원본 이미지', src: '/example/HM-025-03/페이지_ptm03.jpg', alt: '수메르 점토판이 왼쪽 상단부터 원본 이미지' },
  { text: 'PTM 기법으로 재구성한 이미지', src: '/example/HM-025-03/페이지_ptm04.jpg', alt: 'PTM 기법으로 재구성한 이미지' },
  { text: '픽셀당 조명 모델을 적용하여 계산한 이미지', src: '/example/HM-025-03/페이지_ptm02.jpg', alt: '픽셀당 조명 모델을 적용하여 계산한 이미지' },
  {
    text: (
      <>
        <Label type='line' value={3} svgWidth={24} svgHeight={24} />
        에서 계산한 값을 <Label type='line' value={2} svgWidth={24} svgHeight={24} />에 추가한 이미지
      </>
    ),
    src: '/example/HM-025-03/페이지_ptm01.jpg',
    alt: '픽셀당 조명 모델을 적용하여 계산한 값을 PTM 기법으로 재구성한 이미지',
  },
];

const HM02503 = () => {
  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerText: '국가유산 디지털 복원가, 다항식으로 국가유산에 새 숨을 불어 넣다!',
    headerPattern: 'icon',
    headerTextColor: 'var(--color-header-purple)',
    iconType: 'mathDream',
  };

  return (
    <HContainer headerInfo={headerInfo} useExtend>
      <Typography fontSize='var(--font-size-32)' lineHeight='50px' weight='var(--font-weight-semiBold)'>
        PTM 기법으로 재구성한 4000년 전 수메르 점토판
      </Typography>

      <BoxWrap padding='8px 0' flexWrap='wrap'>
        {data.map((item, index) => {
          const topGap = index > 1 ? '24px' : 0;
          const rightGap = (index + 1) % 2 === 1 ? '24px' : '0';
          return (
            <Box key={index} vAlign='center' width='calc(50% - 12px)' marginTop={topGap} marginRight={rightGap}>
              <Image src={item.src} width='233px' height='184px' alt={item.alt} />
              <Box flex='1'>
                <Typography size={EStyleFontSizes['X-MEDIUM']}>
                  <Box>
                    <Label type='line' value={index + 1} svgWidth={24} svgHeight={24} />
                  </Box>
                  {item.text}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </BoxWrap>
    </HContainer>
  );
};

export default HM02503;
