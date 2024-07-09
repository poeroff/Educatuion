import HE00801, { IListenAndAnswer } from '@maidt-cntn/pages/HE-008-01';
import { Box, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';

const P07 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 주요 내용 이해하기',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: (
      <>
        <Box>
          <Typography>▪ 궁금증 표현하기</Typography>
        </Box>
        <Box>
          <Typography color='var(--color-blue-700)'>
            <Typography useGap={false} weight={'var(--font-weight-extraBold)'}>
              &nbsp;I wonder~&nbsp;
            </Typography>
            를 사용하여 궁금증을 표현할 수 있다.
          </Typography>
        </Box>
      </>
    ),
  };

  const data: IListenAndAnswer[] = [
    {
      content: (
        <>
          <Box>
            <Typography>
              <Typography useGap={false} weight={'var(--font-weight-extraBold)'}>
                &nbsp;I wonder&nbsp;
              </Typography>
              why the sky is blue.
            </Typography>
          </Box>
          <Box>
            <Typography>나는 하늘이 왜 파란지 궁금해.</Typography>
          </Box>
        </>
      ),
      audioSrc: '/L03/SP01-1/HE1-L03-SP01-1-P07-01.mp3',
    },
    {
      content: (
        <>
          <Box>
            <Typography>
              <Typography useGap={false} weight={'var(--font-weight-extraBold)'}>
                &nbsp;I wonder&nbsp;
              </Typography>
              how flies walk on the ceiling.
            </Typography>
          </Box>
          <Box>
            <Typography>나는 어떻게 파리가 천장을 걷는지 궁금해.</Typography>
          </Box>
        </>
      ),
      audioSrc: '/L03/SP01-1/HE1-L03-SP01-1-P07-02.mp3',
    },
  ];

  return <HE00801 headerInfo={headerInfo} questionInfo={questionInfo} data={data} onlyListen />;
};

export default P07;
