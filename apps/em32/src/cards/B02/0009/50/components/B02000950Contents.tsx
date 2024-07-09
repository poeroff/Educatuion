import { Box, Image } from '@maidt-cntn/ui';

const imgInfo = {
  imgSrc: '/B02/0009/50/DIC322S01.png',
  imgExp:
    '원의 중심이 점 ㄱ이고, 반지름이 2 cm인 원과 원 위의 한 점이 맞닿은 원의 중심이 점 ㄷ이고, 반지름이 8 cm인 원이 있고, 두 원은 모두 또 다른 큰 원 안에 있으며 각 원 위의 한 점은 큰 원과 맞닿아 있는 3개의 원',
};

export const B02000950Contents = () => (
  <Box display='flex'>
    <Box vAlign='baseline' fontSize='var(--font-size-28)'>
      점 ㄱ, 점 ㄴ, 점 ㄷ은 원의 중심입니다. 가장 큰 원의 반지름은 몇 cm인지 풀이 과정을 쓰고 답을 구해 보세요.
    </Box>
    <Box fontSize='var(--font-size-28)'>
      <Image src={imgInfo.imgSrc} alt={imgInfo.imgExp} width='200px' height='155px' />
    </Box>
  </Box>
);

export default B02000950Contents;
