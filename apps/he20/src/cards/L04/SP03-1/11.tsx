import { Box, BoxWrap, EStyleFontSizes, Image, PinchZoom, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IListenAndAnswer {
  text: string;
  style : string;
  textType : string;
  decoration : string;
}

interface ICardData {
  idx: number;
  listenAndAnswer: IListenAndAnswer[];
}

const P11 = ({ _page = 'P11' }: { _page?: string }) => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };

  const data: ICardData[] = [
    {
      idx: 1,
      listenAndAnswer: [
        {
          text: 'Another critical issue is',
          style : 'var(--color-grey-900)',
          textType : 'question',
          decoration : 'none',
        },
        {
          text: 'privacy.',
          style : 'var(--color-red-700)',
          textType : 'question',
          decoration : 'none',
        },
        {
          text: '또 다른 중요한 문제는 사생활입니다.',
          style : 'var(--color-blue-900)',
          textType : 'answer',
          decoration : 'none',
        },
        {
          text: 'There’s a risk that organizations or hackers could access personal data without permission through AI-connected implants.',
          style : 'var(--color-grey-900)',
          textType : 'question',
          decoration : 'none',
        },
        {
          text: '조직이나 해커가 AI 와 연결된 임플란트를 통해 허가 없이 개인정보에 접근할 수 있는 위험이 있습니다.',
          style : 'var(--color-blue-900)',
          textType : 'answer',
          decoration : 'none',
        },
        {
          text: 'This means that our thoughts, emotions, and behaviors could be controlled by hackers.',
          style : 'var(--color-grey-900)',
          textType : 'question',
          decoration : 'none',
        },
        {
          text: '이것은 우리의 생각 , 감정 , 행동이 해커에 의해 통제될 수 있다는 뜻입니다.',
          style : 'var(--color-blue-900)',
          textType : 'answer',
          decoration : 'none',
        },
        {
          text: 'There’s an additional risk that this technology could lead to even',
          style : 'var(--color-grey-900)',
          textType : 'question',
          decoration : 'none',
        },
        {
          text: 'greater',
          style : 'var(--color-red-700)',
          textType : 'question',
          decoration : 'none',
        },
        {
          text: 'social inequality, ',
          style : 'var(--color-red-700)',
          textType : 'question',
          decoration : 'none',
        },
        {
          text: 'given that it may not be available to all due to its high cost.',
          style : 'var(--color-grey-900)',
          textType : 'question',
          decoration : 'none',
        },
        {
          text: '이 기술은 높은 비용으로 인해 모든 사람에게 제공되지 않을 수 있다는 점에서 , 더 큰 사회적 불평등을 초래할 수 있는 위험 또한 있습니다.',
          style : 'var(--color-blue-900)',
          textType : 'answer',
          decoration : 'none',
        },
        {
          text: 'Such unequal access to the technology could intensify the division between those who can afford the implants and those who cannot.',
          style : 'var(--color-grey-900)',
          textType : 'question',
          decoration : 'none',
        },
        {
          text: '기술에 대한 그러한 불평등한 접근은 임플란트 비용을 감당할 수 있는 사람과 그렇지 않은 사람 사이의 격차를 심화시킬 수 있습니다.',
          style : 'var(--color-blue-900)',
          textType : 'answer',
          decoration : 'none',
        },
       
      ],
    },
  ];

  const imageData: { src: string; alt: string }[] = [
    {
      src: '/L04/SP03-1/HE2-L04-SP03-1-P11.jpg',
      alt: '뇌에 AI 칩이 심어진 여성의 그림 . 사진 , 책 , 게임 , 메신저 그림이 여성의 뇌와 연결되어 있다 .',
    },
  ];

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <BoxWrap useFull>
        <Box useFull marginTop='4px'>
          <Scroll tabIndex={0} height='420px'>
            <Box background='white' useRound paddingBottom='28px'>
              <Box display='flex' alignItems='center' justifyContent='center' gap={20} marginTop={10} marginBottom={10}>
                {imageData.map(img => (
                  <PinchZoom key={img.src}>
                    <Image src={img.src} width='240px' height='50%' alt={img.alt} />
                  </PinchZoom>
                ))}
              </Box>

              {data.map( ( item )=> (
                item.listenAndAnswer.map((item,index)=>(
                    item.textType === 'question'? 
                    <Typography key={`text-${index}`} color={item.style} weight={'500'} useGap={false} textDecoration={item.decoration}>{item.text }&nbsp;</Typography>
                    :
                    <Box key={`text-${index}`}>
                        <Typography color={item.style} useGap={false} textDecoration={item.decoration} size={EStyleFontSizes['X-MEDIUM']}> {item.text} </Typography>
                    </Box>
                ))
              ))}

            </Box>
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P11;