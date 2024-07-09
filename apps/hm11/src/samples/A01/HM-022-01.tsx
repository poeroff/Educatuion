import { Box, ESvgType, Image, PinchZoom, SvgIcon, Typography } from '@maidt-cntn/ui';
import { HContainer, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';

import icAimActive from '@maidt-cntn/assets/icons/icAimActive.svg';

const HM02201 = () => {
  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathCreativeUpProject',
    headerText: '평면도 속 교실의 넓이, 다항식으로 구해 보자!',
    headerTextColor: 'var(--color-h-math-blue-strong)',
    headerSubTexts: ['relation', 'compute'],
  };

  return (
    <HContainer headerInfo={headerInfo} useExtend>
      <Box vAlign='center'>
        <Box margin='0 12px 0 14px' vAlign='center'>
          <SvgIcon alt='활동목표' src={icAimActive} type={ESvgType.IMG} />
        </Box>
        <Typography weight='var(--font-weight-semiBold)' fontSize='var(--font-size-24)' color='var(--color-grey-700)' useGap={false}>
          다항식의 사칙연산을 이용하여 문제를 해결할 수 있다.
        </Typography>
      </Box>
      <Box marginTop='8px'>
        <Typography fontSize='var(--font-size-24)' lineHeight='36px'>
          &nbsp;다음 그림은 어느 학교 별관 건물의 평면도이다. 복도를 제외한 모든 교실은 직사각형 모양이고, 각 변에 표시된 다항식은 변의 길이를
          나타낸다. (단, 벽의 두께는 생각하지 않고, 길이의 단위는 m이다.)
        </Typography>
      </Box>

      <PinchZoom>
        <Box marginTop={12} background='var(--color-grey-100)' width='1000px' height='304px' hAlign='center' useRound>
          <Image
            src='/example/HM-022-01/_M1-1-창-01.png'
            width='488px'
            height='287px'
            alt='학교 건물의 평면도에 왼쪽부터 컴퓨터실, 음악실, 복도, 미술실, 과학실의 5개의 공간이 그려져 있습니다.'
          />
        </Box>
      </PinchZoom>
    </HContainer>
  );
};

export default HM02201;
