import { Box, BoxWrap, EStyleFontSizes, List, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

export interface IME11302 {
  en: string;
  ko: string;
  verbs: string[];
  answers?: {
    en: string;
    ko: string;
  }[];
}

interface Idata {
  data: IME11302[];
}

const ME11302 = ({ data }: Idata) => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'writeENG',
    headerText: '주요 내용 이해하기',
  };

  const highlightVerbs = (sentence: string, verbs: string[]) => {
    const pattern = new RegExp(`(\\b(?:${verbs.join('|')})\\b)`, 'g');
    const parts = sentence.split(pattern);
    return parts.map((part, index) =>
      verbs.includes(part) ? (
        <Typography key={index} useGap={false} color='var(--color-required)' weight='var(--font-weight-bold)'>
          {part}
        </Typography>
      ) : (
        part
      ),
    );
  };

  const answer = (answers: { en: string; ko: string }[]) => {
    return (
      <div>
        {answers.map((answer, index) => (
          <Typography key={index}>
            {index === 0 && <>&nbsp;-&nbsp;</>}
            {answer.en}&nbsp;
            <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-grey-600)'>
              {answer.ko}
            </Typography>
            {index !== answers.length - 1 && '/'}
          </Typography>
        ))}
      </div>
    );
  };

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start'>
      <Box width='fit-content' background='var(--color-blue-1200)' borderRadius='0 32px 32px 0' padding='2px 10px'>
        <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-white)'>
          대표 예문 확인하기
        </Typography>
      </Box>
      <Box hAlign='start' flexDirection='column' marginTop='24px'>
        <List
          gap={8}
          data={data}
          row={({ value }) =>
            value ? (
              <Box hAlign='flex-start' alignItems='flex-start'>
                <Box width='6px' height='30px' margin='8px' borderRadius='999px' background='var(--color-grey-300)' />
                <BoxWrap flexDirection='column'>
                  <Typography lineHeight='42px'>{highlightVerbs(value.en, value.verbs)}</Typography>
                  <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-grey-600)'>
                    {value.ko}
                  </Typography>
                  {value.answers && (
                    <BoxWrap flexDirection='column' marginTop='8px'>
                      {answer(value.answers)}
                    </BoxWrap>
                  )}
                </BoxWrap>
              </Box>
            ) : (
              <></>
            )
          }
        />
      </Box>
    </Container>
  );
};

export default ME11302;
