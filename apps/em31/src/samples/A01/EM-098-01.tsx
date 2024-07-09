import { useState } from 'react';
import { Box, IQuestionProps, Label, Image, TMainHeaderInfoTypes, Input } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EM09801 = () => {
  const [value, setValue] = useState<string>('');

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '지도에서 거리 어림하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={'ㄱ'} color='var(--color-white)' background='var(--color-grey-600)' />
        학교에서 도서관까지의 거리는 약 500 m입니다. 학교에서 은행까지의 거리는 얼마일지 어림해 보세요.
      </>
    ),
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='완료하기'
      onSubmit={() => {}}
      vAlign='flex-start'
    >
      <Box hAlign='center' flexDirection='column' paddingBottom={30}>
        <Box position='relative' marginBottom={12}>
          <Image
            src={'/example/EM-098-01/MA31508 1.jpg'}
            alt='학교, 도서관, 은행, 병원, 박물관, 지하철역이 그려진 지도가 있습니다. 학교와 도서관의 거리는 약 500미터입니다.'
            width='400px'
            height='321px'
          />
          <Box
            position='absolute'
            top={0}
            right={-140}
            width={94}
            height={94}
            backgroundColor='var(--color-grey-400)'
            fontSize={18}
            vAlign='center'
            textAlign='center'
          >
            눈금없는자교구
          </Box>
        </Box>
        <Input value={value} onChange={e => setValue(e.target.value)} />
      </Box>
    </Container>
  );
};

export default EM09801;
