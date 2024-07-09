import { useState } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  Button,
  EStyleButtonTypes,
  BoxWrap,
  EStyleSizes,
  Scroll,
  IAudioPlayerProps,
  PinchZoom,
  Image,
  Typography,
  Dialog,
  Dropdown,
  IQuestionProps,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const HE01804 = () => {
  const [isContentShow, setContentShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Complete',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Fill in the blanks to summarize the story.',
  };

  const dropArr = ['a', 'b', 'c', 'd'];

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
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
              <Image
                src={'../../assets/example/HE1-L02-C07-A02a-P02.png'}
                alt={
                  '글의 구조가 보이는 인포그래픽​ 왼쪽부터 첫 번째 그림 제목 story structure: “Gathering of the Whakapapa” beginning 성냥개비 한 개 두 번째 그림 Rising Action Climax 타오르는 성냥개비 한 개 세 번째 그림 Ending 다 타버린 성냥 개비 한 개, Beginning, Rising Action, Climax, Ending의 순서를 나타내는 모습'
                }
                width='100%'
                height='282px'
              />
            </PinchZoom>
            <Box vAlign='center' marginTop={10}>
              <Box useRound marginRight='8px' padding='4px' backgroundColor='#FDCFAE'>
                <Typography weight={'var(--font-weight-bold)'}>Beginning</Typography>
              </Box>
              <Dropdown width='277px' dropdownList={dropArr} />
            </Box>
          </Box>
          <Box height='355px' background={'white'} useFull useRound>
            <Scroll height='313px' tabIndex={0}>
              Now let’s turn our attention to ourselves, Homo sapiens. How have we managed to survive for so long? Neanderthals existed together with
              Homo sapiens until about 40,000 years ago, and they were known to be intelligent and physically superior to Homo sapiens.
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

export default HE01804;
