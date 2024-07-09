import { Box, BoxWrap, SvgIcon, Typography, IQuestionProps, Image } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import e_fish_icon from '@maidt-cntn/assets/icons/e_fish_icon.svg';

const P01 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='start' marginBottom='10px'>
        <Box marginTop='5px'>
          <SvgIcon src={e_fish_icon} width='48px' height='34px' />
        </Box>
        <Typography lineHeight='48px'>
          해열제는 열을 내리게 하는 약입니다. 해열제마다 하루에 먹을 수 있는 양과 먹는 시간 간격이 다르므로 양이나 시간 간격을 잘 지켜서 먹어야
          안전합니다. 세 종류 해열제의 먹는 시간 간격을 살펴보고 물음에 답하세요.
        </Typography>
      </Box>
    ),
  };

  const imageInfo = {
    altText:
      '3가지 해열제가 있습니다. 해열제의 이름과 용법은 다음과 같습니다. 다나 : 4시간마다 먹어요, 시원 : 6시간마다 먹어요, 튼튼 : 8시간마다 먹어요',
    imageSrc: '/B03/0008/10/B-EM31-03-0008-1001.png',
    imageWidth: `${Math.floor(447 * 1.5)}px`,
    imageHeight: `${Math.floor(224 * 1.5)}px`,
  };

  return (
    <Container headerInfo={null} questionInfo={questionInfo} vAlign='flex-start' background={'var(--color-white)'} useRound>
      <BoxWrap flexDirection='column' alignItems='center' boxGap={0} marginBottom={10}>
        <Box useRound tabIndex={101}>
          <Box vAlign='center' flexDirection='column'>
            <Image
              src={imageInfo.imageSrc}
              width={imageInfo?.imageWidth || '100%'}
              height={imageInfo?.imageHeight || '100%'}
              alt={imageInfo.altText}
            />
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
