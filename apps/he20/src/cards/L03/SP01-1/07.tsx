import HE00801, { IListenAndAnswer } from '@maidt-cntn/pages/HE-008-01';
import { Box, Label, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';

const P07 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 주요 내용 이해하기',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: (
      <>
        <Box>
          <Typography>▪ 감상 묻고 답하기</Typography>
        </Box>
        <Box>
          <Typography color='var(--color-blue-700)'>
            <Typography useGap={false} weight={'var(--font-weight-extraBold)'}>
              &nbsp;How was it? / It was~&nbsp;
            </Typography>
            를 사용하여 감상을 묻고 답할 수 있다.
          </Typography>
        </Box>
      </>
    ),
  };

  const data: IListenAndAnswer[] = [
    {
      content: (
        <Box display='flex'>
          <Box marginTop={4}>
            <Label value='A' type='paint' background='var(--color-blue-100)' />
          </Box>
          <Box>
            <Box>
              <Typography>
                <Typography useGap={false} weight={'var(--font-weight-extraBold)'}>
                  How was it?
                </Typography>
              </Typography>
            </Box>
            <Box>
              <Typography>어땠어?</Typography>
            </Box>
          </Box>
        </Box>
      ),
      audioSrc: '/L03/SP01-1/HE2-L03-SP01-1-P07-01.mp3',
    },
    {
      content: (
        <Box display='flex'>
          <Box marginTop={4}>
            <Label value='B' type='paint' background='var(--color-yellow-100)' />
          </Box>
          <Box>
            <Box>
              <Typography>
                <Typography useGap={false} weight={'var(--font-weight-extraBold)'}>
                  It was&nbsp;
                </Typography>
                fantastic!
              </Typography>
            </Box>
            <Box>
              <Typography>환상적이었어!</Typography>
            </Box>
          </Box>
        </Box>
      ),
      audioSrc: '/L03/SP01-1/HE2-L03-SP01-1-P07-02.mp3',
    },
    {
      content: (
        <Box display='flex'>
          <Box marginTop={4}>
            <Label value=' ' type='paint' background='var(--color-white-100)' />
          </Box>
          <Box>
            <Box>
              <Typography>I was especially impressed by the works of modern artists.</Typography>
            </Box>
            <Box>
              <Typography>나는 특히 현대 예술가들의 작품이 인상 깊었어.</Typography>
            </Box>
          </Box>
        </Box>
      ),
      audioSrc: '/L03/SP01-1/HE2-L03-SP01-1-P07-03.mp3',
    },
  ];

  return <HE00801 headerInfo={headerInfo} questionInfo={questionInfo} data={data} onlyListen />;
};

export default P07;
