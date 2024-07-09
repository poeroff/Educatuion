import { Box, BoxWrap, Label, Typography, Image, Tag, ETagLine, SvgIcon, ESvgType } from '@maidt-cntn/ui';
import { HContainer, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';
import icThinkOpen from '@maidt-cntn/assets/icons/icThinkOpen.svg';

const HM00701 = () => {
  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerText: '다항식의 정리',
    headerPattern: 'icon',
    headerTextColor: 'var(--color-h-math-primary-strong)',
    iconType: 'thinkOpen',
  };

  return (
    <HContainer headerInfo={headerInfo} vAlign='flex-start'>
      <BoxWrap justifyContent='center'>
        <Box width='600px'>
          <Box padding='7px 0' fontSize='var(--font-size-32)' fontWeight='var(--font-weight-semiBold)' lineHeight='48px'>
            <SvgIcon alt='생각열기' src={icThinkOpen} type={ESvgType.IMG} />
            &nbsp;오른쪽 그림은 국가통계포털에서 우리나라 광역시의 넓이를 (내림차순)을 클릭하여 정리한 것이다.
          </Box>
          <Box marginTop='24px'>
            <Box hAlign='center'>
              <Label type='arrow' title='오른쪽 화살표' direction='right' background='var(--color-h-math-primary-origin)' />
              <Typography>광역시 중에서 넓이가 셋째로 큰 도시를 말해 보자.</Typography>
            </Box>
            <Box marginTop={12} display='flex' alignItems='center' gap='7px'>
              <Tag type={ETagLine.GREEN} label='정답' fontSize='24px' height='38px' />
              <Typography color='var(--color-h-math-primary-strong)' weight='var(--font-weight-bold)'>
                대구광역시
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <Image src='/example/HM-007-01/AHM1010101B0101.png' width='330px' height='316px' />
          <Box type='hidden'>
            인천광역시의 넓이는 1,067,044,880.7제곱미터입니다. 울산광역시의 넓이는 1,062,833,506.3제곱미터입니다. 대구광역시의 넓이는
            885,222,208.1제곱미터입니다. 부산광역시의 넓이는 771,325,955.4제곱미터입니다. 대전광역시의 넓이는 539,668,542.3제곱미터입니다.
            광주광역시의 넓이는 501,024,298.6제곱미터입니다.
          </Box>
        </Box>
      </BoxWrap>
    </HContainer>
  );
};

export default HM00701;
