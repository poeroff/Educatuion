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

const P09 = ({ _page = 'P09' }: { _page?: string }) => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };

  const data: ICardData[] = [
    {
      idx: 1,
      listenAndAnswer: [
        {
          text: 'The success of AI-powered neural implants in health care is also expected',
          style : 'var(--color-grey-900)',
          textType : 'question',
          decoration : 'none',
        },
        {
          text: 'to spread to other industries.',
          style : 'var(--color-red-700)',
          textType : 'question',
          decoration : 'none',
        },
        {
          text: '의료 서비스에서 AI 기반 신경 임플란트의 성공은 다른 산업 분야로도 확산할 것으로 예상됩니다 .',
          style : 'var(--color-blue-900)',
          textType : 'answer',
          decoration : 'none',
        },
        {
          text: 'Advances in neural implant technology will make it possible to install in our',
          style : 'var(--color-grey-900)',
          textType : 'question',
          decoration : 'none',
        },
        {
          text: 'brains',
          style : 'var(--color-grey-900)',
          textType : 'question',
          decoration : 'none',
        },
        {
          text: ' software that can read our minds.',
          style : 'var(--color-grey-900)',
          textType : 'question',
          decoration : 'underline',
        },
        {
          text: '신경 임플란트 기술의 발전으로 우리의 마음을 읽을 수 있는 소프트웨어를 뇌에 설치하는 것이 가능해질 것입니다.',
          style : 'var(--color-blue-900)',
          textType : 'answer',
          decoration : 'none',
        },
        {
          text: 'There is also great potential for',
          style : 'var(--color-grey-900)',
          textType : 'question',
          decoration : 'none',
        },
        {
          text: ' memory-enhancing brain implants,',
          style : 'var(--color-grey-900)',
          textType : 'question',
          decoration : 'underline',
        },
        {
          text: 'similar to computer memory chips.',
          style : 'var(--color-grey-900)',
          textType : 'question',
          decoration : 'none',
        },
        {
          text: '기억력을 향상하는 뇌 임플란트에서도 큰 잠재력을 가지고 있는데 , 이는 컴퓨터 메모리 칩과 유사합니다.',
          style : 'var(--color-blue-900)',
          textType : 'answer',
          decoration : 'none',
        },
        {
          text: 'Such devices would allow us to capture and enhance memories, and even upload and download them using the digital cloud.',
          style : 'var(--color-gray-900)',
          textType : 'question',
          decoration : 'none',
        },
        {
          text: '이러한 장치를 사용하면 기억을 포착하고 강화할 수 있으며 , 디지털 클라우드를 사용하여 기억을 업로드 및 다운로드할 수도 있습니다.',
          style : 'var(--color-blue-900)',
          textType : 'answer',
          decoration : 'none',
        },
        {
          text: 'Finally, AI-powered neural implants would',
          style : 'var(--color-gray-900)',
          textType : 'question',
          decoration : 'none',
        },
        {
          text: 'revolutionize the way our brains',
          style : 'var(--color-gray-900)',
          textType : 'question',
          decoration : 'underline',
        },
        {
          text: 'work',
          style : 'var(--color-gray-900)',
          textType : 'question',
          decoration : 'underline',
        },
        {
          text: '마지막으로 , AI 기반 신경 임플란트는 우리 뇌가 작동하는 방식에 혁명을 일으킬 것입니다.',
          style : 'var(--color-blue-900)',
          textType : 'answer',
          decoration : 'none',
        },
        {
          text: 'The role of the brain would shift from learning and storing information to processing the vast amounts of data provided by the implants.',
          style : 'var(--color-grey-900)',
          textType : 'question',
          decoration : 'none',
        },
        {
          text: '뇌의 역할이 정보를 학습하고 저장하는 것에서 신경 임플란트가 제공하는 방대한 양의 데이터를 처리하는 것으로 바뀌게 될 것입니다.',
          style : 'var(--color-blue-900)',
          textType : 'answer',
          decoration : 'none',
        },
       
      ],
    },
  ];

  const imageData: { src: string; alt: string }[] = [
    {
      src: '/L04/SP03-1/HE2-L04-SP03-1-P09.jpg',
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

export default P09;