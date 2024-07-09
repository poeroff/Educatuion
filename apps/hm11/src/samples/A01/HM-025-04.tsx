import { Box, EStyleFontSizes, Image, Label, List, Scroll, Typography } from '@maidt-cntn/ui';
import { HContainer, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';

const HM02504 = () => {
  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathDream',
    headerTextColor: 'var(--color-header-purple)',
    headerText: '컴퓨터 보안 전문가, 순열과 조합으로 해커의 위협에 맞서다!',
  };

  const data = [
    '지문을 스캐닝한다.',
    '스캔된 지문을 이용하여 특징 정보를 추출한다.',
    '지문의 특징 정보를 가진 특징점에 소수를 할당한다.',
    '특징점을 스캔한 순서에 따라서 그 점에 할당된 소수들의 순열을 생성한다.',
    '순열을 이용하여 암호 키를 생성한다.',
  ];

  return (
    <HContainer headerInfo={headerInfo} useExtend>
      <Scroll tabIndex={0}>
        <Typography fontSize='var(--font-size-32)' fontWeight='var(--font-weight-semiBold)' lineHeight='48px'>
          지문 인식 시스템에서 암호 키를 생성하는 단계
        </Typography>

        <Box marginTop='24px'>
          <Box hAlign='center'>
            <Image
              src='/example/HM-025-04/B1-3-01R.jpg'
              alt='지문을스캐닝해서 종합된 특징점 정보를 추출하는 과정을 보여주는 그림입니다.'
              width='611px'
              height='180px'
            />
          </Box>

          <List
            gap={0}
            data={data}
            row={({ value, index }) => (
              <Box vAlign='center' key={index} padding='4px 12px'>
                <Label svgWidth={24} svgHeight={24} fontSize={20} value={index} />
                &nbsp;
                <Typography size={EStyleFontSizes['X-MEDIUM']} useGap={false}>
                  {value}
                </Typography>
              </Box>
            )}
          />
          <Box textAlign='right'>
            <Typography color='var(--color-grey-700)' size={EStyleFontSizes['X-SMALL']}>
              (출처: 워크넷, 2021 / 차병래, 「지문 특징의 준동형 그래프를 이용한 일회용 암호 키 생성 기법 및 시뮬레이션」)
            </Typography>
          </Box>
        </Box>
      </Scroll>
    </HContainer>
  );
};

export default HM02504;
