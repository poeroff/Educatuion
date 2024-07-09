import { Image, Box, TMainHeaderInfoTypes, Typography, Scroll, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const HE04501 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Fun with Grammar',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'With your partner, create as many sentences as you can using the words below and the structures above. Whoever comes up with the most sentences wins.',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='start'>
      <Box useFull>
        <Scroll tabIndex={0}>
          <Box>
            <Image src={'/example/images.png'} alt={''} width='100%' />
          </Box>
          <Box
            border={'1px solid #8D9299'}
            hAlign='center'
            flexWrap={'wrap'}
            gap={' 8px 24px'}
            background='#F4F8FF'
            padding={'10px 62px'}
            marginTop={10}
            useRound
          >
            {['impossible', 'fun', 'essential', 'Rarely', 'Little', 'Seldom', 'Behide me', 'Around the corner', 'in front of our school'].map(
              item => (
                <Typography>{item}</Typography>
              ),
            )}
          </Box>
          <Box vAlign='flex-start' marginTop={10} border={'1px dashed #75c2ff'} borderRadius={8} padding={'10px 16px'}>
            {' '}
            <Typography color={'var(--color-blue-900)'}>e.g.</Typography>
            <Box marginLeft={16}>
              <Typography>
                {' '}
                <Typography useGap={false} color={'#275CE7'}>
                  It
                </Typography>{' '}
                is impossible{' '}
                <Typography useGap={false} color={'#275CE7'}>
                  for me to live
                </Typography>{' '}
                without tteokbokki.{' '}
              </Typography>
              <Typography>
                Rarely{' '}
                <Typography useGap={false} color={'#275CE7'}>
                  have we seen
                </Typography>{' '}
                such a beautiful landscape.
              </Typography>
              <Typography>
                Around the corner{' '}
                <Typography useGap={false} color={'#275CE7'}>
                  is the bank
                </Typography>{' '}
                .
              </Typography>
            </Box>
          </Box>
        </Scroll>
      </Box>
    </Container>
  );
};

export default HE04501;
