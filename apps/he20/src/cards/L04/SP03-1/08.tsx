import { Box, BoxWrap, EStyleFontSizes, Image, PinchZoom, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';


const P08 = ({ _page = 'P08' }: { _page?: string }) => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };


  const imageData: { src: string; alt: string }[] = [
    {
      src: '/L04/SP03-1/HE2-L04-SP03-1-P08.jpg',
      alt: '뇌와 컴퓨터를 연결하고 휠체어에서 일어나 걷고 있는 남성의 사진 . 그 옆에 뇌 임플란트와 척추 임플란트 작동 방법이 쓰여 있는 인체 그림이 그려져 있다.',
    },
  ];

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <BoxWrap useFull>
        <Box useFull marginTop='4px'>
          <Scroll tabIndex={0} height='420px'>
            <Box background='white' useRound paddingBottom='28px'>
              <Box display='flex' alignItems='center' justifyContent='center' gap={20} marginTop={10} marginBottom={10}>
                {imageData.map((img) => (
                  <PinchZoom key={img.src}>
                    <Image src={img.src} width='240px' height='50%' alt={img.alt} />
                  </PinchZoom>
                ))}
              </Box>

              <Typography color='var(--color-grey-900)' useGap={false} weight={'500'}>
                The AI-powered neural implant has shown great promise in 
              </Typography>{' '}
              <Typography color='var(--color-red-700)' useGap={false} weight={'500'}>
                medical 
              </Typography>{' '}
              <Typography color='var(--color-red-700)' useGap={false} weight={'500'}>
                applications
              </Typography>
              <Typography color='var(--color-grey-900)' useGap={false} weight={'500'}>
                , offering solutions to a range of problems.
              </Typography>{' '}
              <Typography color='var(--color-blue-900)' useGap={false} size={EStyleFontSizes['X-MEDIUM']}>
                AI 기반 신경 임플란트는 다양한 문제에 대한 해결책을 제시하며 의학적인 적용에서 큰 가능성을 보여주었습니다.
              </Typography>{' '}
              <Typography color='var(--color-grey-900)' useGap={false} weight={'500'}>
                Neural implants are used to
              </Typography>{' '}
              <Typography color='var(--color-grey-900)' useGap={false} textDecoration={'underline'} weight={'500'}>
                treat brain disorders
              </Typography>{' '}
              <Typography color='var(--color-grey-900)' useGap={false} weight={'500'}>
                like Parkinson’s disease.
              </Typography>{' '}
              <Typography color='var(--color-blue-900)' useGap={false} size={EStyleFontSizes['X-MEDIUM']}>
              신경 임플란트는 파킨슨병과 같은 뇌 질환을 치료하는 데 사용됩니다.
              </Typography>{' '}
              <Typography color='var(--color-grey-900)' useGap={false} weight={'500'}>
              These implants electrically stimulate targeted regions of the brain at the right time with the help of AI to restore normal brain activity.
              </Typography>{' '}
              <Typography color='var(--color-blue-900)' useGap={false} size={EStyleFontSizes['X-MEDIUM']}>
              이러한 임플란트는 AI 의 도움을 받아 적시에 뇌의 표적 부위를 전기적으로 자극하여 정상적인 뇌 활동을 회복시킵니다 .
              </Typography>{' '}
              <Typography color='var(--color-grey-900)' useGap={false} weight={'500'}>
              Paralyzed people can have 
              </Typography>{' '}
              <Typography color='var(--color-grey-900)' useGap={false} textDecoration={'underline'} weight={'500'}>
              the ability to walk again
              </Typography>{' '}
              <Typography color='var(--color-grey-900)' useGap={false} weight={'500'}>
              with the help of a 
              </Typography>{' '}
              <Typography color='var(--color-grey-900)' useGap={false} weight={'500'}>
              “digital bridge” between two implants inserted into their brain and spine.
              </Typography>{' '}
              <Typography color='var(--color-blue-900)' useGap={false} size={EStyleFontSizes['X-MEDIUM']}>
              마비된 사람들은 뇌와 척추에 삽입된 두 개의 임플란트 사이의 ' 디지털 다리 ' 의 도움을 받아 다시 걸을 수 있게 됩니다 .
              </Typography>{' '}
              <Typography color='var(--color-grey-900)' useGap={false} weight={'500'}>
              Similarly, those who have lost their arms can 
              </Typography>{' '}
              <Typography color='var(--color-grey-900)' useGap={false} textDecoration={'underline'} weight={'500'}>
              use artificial arms 
              </Typography>{' '}
              <Typography color='var(--color-grey-900)' useGap={false} weight={'500'}>
              operated by the same mechanism.
              </Typography>
              <Typography color='var(--color-blue-900)' useGap={false} size={EStyleFontSizes['X-MEDIUM']}>
              마찬가지로 , 팔을 잃은 사람들도 동일한 방법으로 작동되는 의수를 사용할 수 있습니다 .
              </Typography>{' '}
              
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P08;