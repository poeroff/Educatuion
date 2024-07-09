import { Box, BoxWrap, EStyleFontSizes, Image, Label, Scroll, Typography } from '@maidt-cntn/ui';
import { HContainer, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';

const HM02001 = () => {
  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathStory',
    headerText: '조립제법은 누가 만들었나?',
    headerTextColor: 'var(--color-header-brown)',
  };

  return (
    <HContainer headerInfo={headerInfo} useExtend>
      <BoxWrap useFull>
        <Box width='322px' background='#FABF141A' borderRadius='0px 8px 8px 0px' hAlign='center' flexDirection='column'>
          <Box>
            <Image src={'/example/HM-020-01/image 781.png'} alt='조립제법의 원리가 적혀있는 구장산술의 모습입니다.' />
            <Box hAlign='flex-end' marginRight='16px' marginTop='-20px'>
              <Label type='arrow' title='위쪽 화살표' direction='up' background='var(--color-h-math-border-strong)' />
              <Box marginLeft='4px'>
                <Typography fontSize='var(--font-size-16)' useGap={false} color='var(--color-grey-800)'>
                  『구장산술』
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box flex={1}>
          <Scroll tabIndex={0}>
            <Box marginBottom='24px'>
              <Typography size={EStyleFontSizes['X-MEDIUM']}>
                &nbsp; 1802년 이탈리아과학회에서는 다항식의 일차식인 인수를 구하는 방법을 공모하였다. 이 공모에서 루피니(Ruffini, P., 1765~1822)가
                조립제법을 제시하여 금메달을 수상했기 때문에 이를 ‘루피니의 방법’이라 부른다. 이 방법은 동시대 영국의 수학자 호너(Horner, W. G.,
                1786~1837)도 독립적으로 개발하여 ‘호너의 방법’으로 부르기도 한다.
              </Typography>
            </Box>
            <Box marginBottom='24px'>
              <Typography size={EStyleFontSizes['X-MEDIUM']}>
                &nbsp; 그런데 이보다 훨씬 이전인 중국 한나라 때 편찬되고 3세기 위나라의 유휘(劉徽, 260 년경)가 주석을 단 산학서
                『구장산술(九章算術)』에 이미 조립제법의 원리가 나타나 있 다. 또, 13세기 남송 시대의 진구소(秦九韶, 1202~1261)가 쓴
                『수서구장(數書九章)』 에도 호너의 방법과 비슷하게 방정식의 해를 구하는 방법을 소개하고 있다.
              </Typography>
            </Box>
            <Box>
              <Typography fontSize='var(--font-size-16)' weight='var(--font-weight-regular)' color='var(--color-grey-700)' lineHeight='24px'>
                (출처: Cajori, F., 『Horner’s method of approximation anticipated by Ruffini』 / 칼 B. 보이어 외, 『수학의 역사(상)』)
              </Typography>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>
    </HContainer>
  );
};

export default HM02001;
