import { Box, BoxWrap, EStyleFontSizes, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IListenAndAnswer {
  text: string;
  style : string;
  textType : string;
}

interface ICardData {
  idx: number;
  listenAndAnswer: IListenAndAnswer[];
}

const P10 = ({ _page = 'P10' }: { _page?: string }) => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };

  const data: ICardData[] = [
    {
      idx: 1,
      listenAndAnswer: [
        {
          text: 'Before we can fully embrace the era of AI-powered neural implants,',
          style : 'var(--color-grey-900)',
          textType : 'question',
        },
        {
          text: 'many tricky ethical issues',
          style : 'var(--color-red-700)',
          textType : 'question',
        },
        {
          text: 'should be addressed.',
          style : 'var(--color-grey-900)',
          textType : 'question',
        },
        {
          text: '우리가 AI 기반 신경 임플란트 시대를 완전히 받아들이기 전에 , 많은 까다로운 윤리적 문제들이 해결되어야 합니다.',
          style : 'var(--color-blue-900)',
          textType : 'answer',
        },
        {
          text: 'The integration of AI technology with the human brain raises concerns about what it means to be human.',
          style : 'var(--color-grey-900)',
          textType : 'question',
        },
        {
          text: 'AI 기술과 인간의 뇌를 통합하는 것은 인간 존재의 의미가 무엇인지에 대한 우려를 제기할 수 있습니다.',
          style : 'var(--color-blue-900)',
          textType : 'answer',
        },
        {
          text: 'An over-reliance on technology may delay our natural development and create confusion about whether we are human, AI, or something in between.',
          style : 'var(--color-grey-900)',
          textType : 'question',
        },
        {
          text: '기술에 대한 지나친 의존은 인간의 자연스러운 발달을 지연시키고 우리가 인간인지 , AI 인지 , 또는 그 중간의 무언가인지에 대한 혼란을 야기할 수 있습니다 .',
          style : 'var(--color-blue-900)',
          textType : 'answer',
        },
       
      ],
    },
  ];

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <BoxWrap useFull>
        <Box useFull marginTop='4px'>
          <Scroll tabIndex={0} height='420px'>
            <Box background='white' useRound paddingBottom='28px'>
              {data.map( ( item )=> (
                item.listenAndAnswer.map((item,index)=>(
                    item.textType === 'question'? 
                    <Typography key={`text-${index}`} color={item.style} useGap={false} weight={'500'}>{item.text }&nbsp;</Typography>
                    :
                    <Box key={`text-${index}`}>
                        <Typography color={item.style} useGap={false}  size={EStyleFontSizes['X-MEDIUM']}> {item.text} </Typography>
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

export default P10;