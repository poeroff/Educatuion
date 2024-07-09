import { atom } from 'recoil';
import { Box, Dialog, EStyleFontSizes, Typography, Image } from '@maidt-cntn/ui';

export const L01C07A03 = atom({
  key: 'L01C07A03',
  default: {
    p01: {
      answer1: '',
      answer2: '',
      solution1: 'remember',
      solution2: 'okay',
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer1: '',
      answer2: '',
      solution1: 'sweet',
      solution2: 'tightly',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

export const getDialogText = (isShowDialog: boolean, handleShowDialog: () => void) => {
  const width = '400px';
  return (
    <Dialog
      tabIndex={102}
      width={1000}
      height={600}
      topHeight={50}
      useHeader
      header={() => (
        <Box height='50px' marginBottom='20px' background={'gray'} useRound={true}>
          <Typography useGap={false} weight={'bold'} size={EStyleFontSizes.MEDIUM} usePre>
            What’s in Your School Survival Kit?
          </Typography>
        </Box>
      )}
      isShow={isShowDialog}
      onClose={handleShowDialog}
      useFooter={true}
      closeLabel={'지문 닫기'}
    >
      <Box width='100%' height={'300px'} display='block' textAlign='center'>
        <Image
          width={width}
          src='/L01/C06/A03/ME1-L01-C06-A03-P01-01.jpg'
          alt='교실안의 풍경. 학생들이 자리에 앉아 있고 여자 선생님이 교탁 앞에 서서 말하고 있다. 교탁 위에는 상자가 놓여 있다.'
        />
      </Box>
      <Typography tabIndex={103} usePre weight={'normal'} size={EStyleFontSizes.MEDIUM} style={{ textIndent: '15px' }}>
        Hello, everyone! Welcome to my class! I’m Ms. Seo, your English teacher. Today is the first day of middle school. Are you nervous? I’m also
        nervous, but I feel okay with this box.{'\n\n'}
      </Typography>

      <Box width='100%' height={'250px'} display='block' textAlign='center'>
        <Image
          width={width}
          height={'250px'}
          src='/L01/C06/A03/ME1-L01-C06-A03-P01-02.jpg'
          alt='반쯤 열려 있는 상자 안에 사탕들이 들어 있다. 여자 선생님은 상자 옆에 서서 손짓으로 설명을 하고 있다.'
        />
      </Box>

      <Typography usePre weight={'normal'} size={EStyleFontSizes.MEDIUM} style={{ textIndent: '15px' }}>
        This box is my school survival kit. I have many things in it. First, I have some sticky notes. I use them on the first day. I write your names
        and remember them. Next, I have some candies. These are for you. They’re sweet, like your smiles. {'\n\n'}
      </Typography>

      <Box width='100%' height={'200px'} display='block' textAlign='center'>
        <Image
          width={width}
          src='/L01/C06/A03/ME1-L01-C06-A03-P01-03.jpg'
          alt='테이블 위에 상자가 놓여 있다. 학생 다섯 명과 여자 선생님은 상자가 놓여 있는 테이블 앞에 모여 있다.'
        />
      </Box>

      <Box>
        <Box vAlign='start'>
          <Typography weight='bold' color='var(--color-green-800)'>
            Mrs. Seo
          </Typography>
          <Typography>Now, what do you want in your school survival kit?</Typography>
        </Box>
        <Box vAlign='start'>
          <Typography weight='bold' color='var(--color-pink-600)'>
            Somin
          </Typography>
          <Typography>A mirror! I look in the mirror and say, “Just be you!”</Typography>
        </Box>
        <Box vAlign='start'>
          <Typography weight='bold' color='#EB6707'>
            Jiwon
          </Typography>
          <Typography>For me, a stress ball. I hold the ball tightly. Then my stress goes away.</Typography>
        </Box>
        <Box vAlign='start'>
          <Typography weight='bold' color='var(--color-blue-800)'>
            Mike
          </Typography>
          <Typography>An eraser! It erases my mistakes. I start all over again!</Typography>
        </Box>
        <Box vAlign='start'>
          <Typography weight='bold' color='var(--color-purple-800)'>
            Emily
          </Typography>
          <Typography>I need a Band-Aid! My feelings get hurt sometimes. But with the Band-Aid, I’m okay.</Typography>
        </Box>
        <Box vAlign='start'>
          <Typography weight='bold' color='var(--color-green-800)'>
            Mrs. Seo
          </Typography>
          <Typography>Great! Now make your own survival kit. Let’s have a great year!</Typography>
        </Box>
      </Box>
    </Dialog>
  );
};
