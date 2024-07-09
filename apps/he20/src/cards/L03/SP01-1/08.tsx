import HE00801, { IListenAndAnswer } from '@maidt-cntn/pages/HE-008-01';
import { Box, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';

const P08 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 주요 내용 이해하기',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: (
      <>
        <Box>
          <Typography>▪ 금지하기</Typography>
        </Box>
        <Box>
          <Typography color='var(--color-blue-700)'>
            <Typography useGap={false} weight={'var(--font-weight-extraBold)'}>
              &nbsp;You’re not allowed to~&nbsp;
            </Typography>
            를 사용하여 금지를 표현할 수 있다.
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
                You’re not allowed to
              </Typography>
              &nbsp;kick the seat in front of you.
            </Typography>
          </Box>
          <Box>
            <Typography>앞 좌석을 발로 차면 안 됩니다.</Typography>
          </Box>
        </>
      ),
      audioSrc: '/L03/SP01-1/HE2-L03-SP01-1-P08-01.mp3',
    },
    {
      content: (
        <>
          <Box>
            <Typography>
              <Typography useGap={false} weight={'var(--font-weight-extraBold)'}>
                You’re not allowed to
              </Typography>
              &nbsp;make loud noise.
            </Typography>
          </Box>
          <Box>
            <Typography>큰 소음을 내면 안 됩니다.</Typography>
          </Box>
        </>
      ),
      audioSrc: '/L03/SP01-1/HE2-L03-SP01-1-P08-02.mp3',
    },
  ];

  return <HE00801 headerInfo={headerInfo} questionInfo={questionInfo} data={data} onlyListen />;
};

export default P08;
