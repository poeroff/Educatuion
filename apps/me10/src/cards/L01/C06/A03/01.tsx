import { Scroll, Typography, Box, TMainHeaderInfoTypes, PinchZoom, Image, IAudioPlayerProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'What’s in Your School Survival Kit? (전체 읽기)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C06/A03/ME1-L01-C06-A03-P01.mp3',
    right: 10,
    top: -10,
  };

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <Box background='white' useRound useFull>
        <Scroll>
          <Box vAlign='center' hAlign='center'>
            <PinchZoom pinchType={'image'}>
              <Image
                alt={'교실안의 풍경. 학생들이 자리에 앉아 있고 여자 선생님이 교탁 앞에 서서 말하고 있다. 교탁 위에는 상자가 놓여 있다.'}
                src={'/L01/C06/A03/ME1-L01-C06-A03-P01-01.jpg'}
                width='320px'
                height='240px'
              />
            </PinchZoom>
          </Box>
          <Box marginTop={'24px'}>
            <Typography style={{ textIndent: 'var(--font-size-28)' }}>
              Hello, everyone! Welcome to my class! I’m Ms. Seo, your English teacher. Today is the first day of middle school. Are you nervous? I’m
              also nervous, but I feel okay with this box.
            </Typography>
          </Box>
          <Box vAlign='center' hAlign='center' marginTop={'30px'}>
            <PinchZoom pinchType={'image'}>
              <Image
                alt={'반쯤 열려 있는 상자 안에 사탕들이 들어 있다. 여자 선생님은 상자 옆에 서서 손짓으로 설명을 하고 있다'}
                src={'/L01/C06/A03/ME1-L01-C06-A03-P01-02.jpg'}
                width='320px'
                height='192px'
              />
            </PinchZoom>
          </Box>
          <Box marginTop={'24px'}>
            <Typography style={{ textIndent: 'var(--font-size-28)' }}>
              This box is my school survival kit. I have many things in it. First, I have some sticky notes. I use them on the first day. I write your
              names and remember them. Next, I have some candies. These are for you. They’re sweet, like your smiles.
            </Typography>
          </Box>
          <Box vAlign='center' hAlign='center' marginTop={'30px'}>
            <PinchZoom pinchType={'image'}>
              <Image
                alt={'테이블 위에 상자가 놓여 있다. 학생 다섯 명과 여자 선생님은 상자가 놓여 있는 테이블 앞에 모여 있다.'}
                src={'/L01/C06/A03/ME1-L01-C06-A03-P01-03.jpg'}
                width='320px'
                height='160px'
              />
            </PinchZoom>
          </Box>
          <Box marginTop={'24px'} textAlign='left'>
            <Box>
              <Typography weight={'bold'} color='var(--color-green-800)'>
                Mrs. Seo
              </Typography>
              Now, what do you want in your school survival kit?
            </Box>
            <Box>
              <Typography weight={'bold'} color='var(--color-pink-600)'>
                Somin
              </Typography>
              A mirror! I look in the mirror and say, “Just be you!”
            </Box>
            <Box>
              <Typography weight={'bold'} color='#EB6707'>
                Jiwon
              </Typography>
              For me, a stress ball. I hold the ball tightly. Then my stress goes away.
            </Box>
            <Box>
              <Typography weight={'bold'} color='var(--color-blue-800)'>
                Mike
              </Typography>
              An eraser! It erases my mistakes. I start all over again!
            </Box>
            <Box>
              <Typography weight={'bold'} color='var(--color-purple-800)'>
                Emily
              </Typography>
              I need a Band-Aid! My feelings get hurt sometimes. But with the Band-Aid, I’m okay.
            </Box>
            <Box>
              <Typography weight={'bold'} color='var(--color-green-800)'>
                Mrs. Seo
              </Typography>
              Great! Now make your own survival kit. Let’s have a great year!
            </Box>
          </Box>
        </Scroll>
      </Box>
    </Container>
  );
};

export default P01;
