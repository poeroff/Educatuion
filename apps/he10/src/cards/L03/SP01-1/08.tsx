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
          <Typography>▪ 알고 있는지 묻기</Typography>
          <Typography color='var(--color-blue-700)'>
            <Typography useGap={false} weight={'var(--font-weight-extraBold)'}>
              &nbsp;Have you heard of~&nbsp;
            </Typography>
            를 사용하여 상대방이 어떠한 정보에 대해 알고 있는지 물어볼 수 있다.
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
                Have you heard of
              </Typography>
              &nbsp;a washable keyboard?
            </Typography>
          </Box>
          <Box>
            <Typography>세척 가능한 키보드에 대해 들어보았니?</Typography>
          </Box>
        </>
      ),
      audioSrc: '/L03/SP01-1/HE1-L03-SP01-1-P08-01.mp3',
    },
    {
      content: (
        <>
          <Box>
            <Typography>
              <Typography useGap={false} weight={'var(--font-weight-extraBold)'}>
                Have you heard of
              </Typography>
              &nbsp;a 3D printing pen?
            </Typography>
          </Box>
          <Box>
            <Typography>3D 프린팅 펜에 대해 들어보았니?</Typography>
          </Box>
        </>
      ),
      audioSrc: '/L03/SP01-1/HE1-L03-SP01-1-P08-02.mp3',
    },
  ];

  return <HE00801 headerInfo={headerInfo} questionInfo={questionInfo} data={data} onlyListen />;
};

export default P08;
