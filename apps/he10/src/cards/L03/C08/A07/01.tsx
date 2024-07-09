import { Box, IQuestionProps, Image, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { contentInfo } from './contentInfo';

const P01 = () => {
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
            <Image src={contentInfo.P01.image[0].src} alt={contentInfo.P01.image[0].alt} width='100%' />
            <Image src={contentInfo.P01.image[1].src} alt={contentInfo.P01.image[1].alt} width='100%' />
          </Box>
          <Box
            border={'1px solid var(--color-grey-600)'}
            hAlign='center'
            flexWrap={'wrap'}
            gap={' 8px 24px'}
            background='var(--color-blue-50)'
            padding={'10px 62px'}
            marginTop={10}
            useRound
          >
            {['impossible', 'fun', 'essential', 'Rarely', 'Little', 'Seldom', 'Behide me', 'Around the corner', 'in front of our school'].map(
              (item, index) => (
                <Typography key={index}>{item}</Typography>
              ),
            )}
          </Box>
          <Box vAlign='flex-start' marginTop={10} border={'1px dashed var(--color-blue-700)'} borderRadius={8} padding={'10px 16px'}>
            <Typography color={'var(--color-grey-600)'} style={{ fontSize: '24px' }}>
              e.g.
            </Typography>
            <Box marginLeft={5}>
              <Typography color='var(--color-grey-600)' style={{ fontSize: '24px' }}>
                <Typography useGap={false} color={'var(--color-blue-700)'} style={{ fontSize: '24px' }}>
                  {' '}
                  It{' '}
                </Typography>{' '}
                is impossible{' '}
                <Typography useGap={false} color={'var(--color-blue-700)'} style={{ fontSize: '24px' }}>
                  {' '}
                  for me to live{' '}
                </Typography>{' '}
                without tteokbokki.
              </Typography>
              <Typography color='var(--color-grey-600)' style={{ fontSize: '24px' }}>
                Rarely{' '}
                <Typography useGap={false} color={'var(--color-blue-700)'} style={{ fontSize: '24px' }}>
                  {' '}
                  have we seen
                </Typography>{' '}
                such a beautiful landscape.
              </Typography>
              <Typography color='var(--color-grey-600)' style={{ fontSize: '24px' }}>
                Around the corner{' '}
                <Typography useGap={false} color={'var(--color-blue-700)'} style={{ fontSize: '24px' }}>
                  is the bank.
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Scroll>
      </Box>
    </Container>
  );
};

export default P01;
