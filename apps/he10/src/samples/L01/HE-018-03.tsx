import {
  Box,
  TMainHeaderInfoTypes,
  TextView,
  Button,
  EStyleButtonTypes,
  ETextViewColor,
  BoxWrap,
  EStyleSizes,
  Scroll,
  IAudioPlayerProps,
  PinchZoom,
  Image,
  Typography,
  EStyleFontSizes,
  Dialog,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const HE01803 = () => {
  const [isContentShow, setContentShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Power of Friendliness : Soft but Strong (3/5)',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: 'audioSrc',
    right: 20,
    top: 0,
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={null} audioInfo={audioInfo}>
      <Box flexDirection='column' vAlign='center' useFull>
        <Box alignSelf='flex-end'>
          <Button
            minWidth='96px'
            size={EStyleSizes.SMALL}
            color={EStyleButtonTypes.SECONDARY}
            label='지문보기'
            useRound
            onClick={() => setContentShow(!isContentShow)}
          />
        </Box>
        <BoxWrap marginTop={4}>
          <Box useFull>
            <PinchZoom>
              <Image src={'/example/HE1-L01-C06-A05.jpg'} alt={''} width='100%' height='200px' />
            </PinchZoom>
            <Box marginTop={10}>
              <TextView type={ETextViewColor.DEFAULT} title={'보기'} height='211px'>
                <Scroll height='160px' tabIndex={0}>
                  <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']}>
                    1929년에 발견된 침팬지속의 포유류로, 아프리카 콩고강 남쪽에만 분포한다. 서식지의 지리적 제한으로, 비교적 넓은 지역에 걸쳐 사는
                    침팬지보다 몇종 위기에 더 취약한 상황이지만, 자신들
                  </Typography>
                </Scroll>
              </TextView>
            </Box>
          </Box>
          <Box background={'white'} useFull useRound>
            <Scroll height='380px' tabIndex={0}>
              I'll give you another example of how friendliness is related to survival. Dr. Hare and his colleagues designed an experiment with
              chimpanzees and bonobos. Although the two are genetically similar, they are different in nature. To study their cooperative behavior,
              Dr. Hare's team set up a device which required two individuals to pull both ends of a rope at the same time in order to access food on a
              board. When placed with partners that the chimpanzees knew, they were able to work together to get the food. However, when paired with
              new partners, the chimpanzees usually failed to get the food, and when they occasionally succeeded, they did not share the food with
              their partner. The bonobos, on the other hand, got along much better than the chimpanzees. They solved the problem regardless of which
              individual they were paired with, and they were also more willing to share the food. This research shows that bonobos have a cooperative
              and friendly nature. Experts suggest that their nature has helped their species survive. Without these characteristics, they could have
              faced extinction.
            </Scroll>
          </Box>
        </BoxWrap>
      </Box>

      <Dialog isShow={isContentShow} width={893} height={458} useFooter onClose={() => setContentShow(!isContentShow)} closeLabel='닫기'>
        <Typography>
          I'll give you another example of how friendliness is related to survival. Dr. Hare and his colleagues designed an experiment with
          chimpanzees and bonobos. Although the two are genetically similar, they are different in nature. To study their cooperative behavior, Dr.
          Hare's team set up a device which required two individuals to pull both ends of a rope at the same time in order to access food on a board.
          When placed with partners that the chimpanzees knew, they were able to work together to get the food. However, when paired with new
          partners, the chimpanzees usually failed to get the food, and when they occasionally succeeded, they did not share the food with their
          partner. The bonobos, on the other hand, got along much better than the chimpanzees. They solved the problem regardless of which individual
          they were paired with, and they were also more willing to share the food. This research shows that bonobos have a cooperative and friendly
          nature. Experts suggest that their nature has helped their species survive. Without these characteristics, they could have faced extinction.
        </Typography>
      </Dialog>
    </Container>
  );
};

export default HE01803;
