import { Box, BoxWrap, IQuestionProps, List, ListHeader, Scroll, TMainHeaderInfoTypes, ToggleButton, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const P02 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  interface IListenAndAnswer {
    title?: boolean;
    originText: React.ReactNode;
    translation: React.ReactNode;
  }

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: `The World of Picasso (1)`,
  };

  const questionInfo: IQuestionProps = {
    text: '해석을 확인해 봅시다.',
  };

  const data: IListenAndAnswer[] = [
    {
      title: true,
      originText: 'The World of Picasso',
      translation: '피카소의 세상',
    },
    {
      originText: '\u00A0\u00A0\u00A0\u00A0Pablo Picasso was born in Spain in 1881.',
      translation: '\u00A0\u00A0\u00A0\u00A0파블로 피카소는 1881년에 스페인에서 태어났습니다.',
    },
    {
      originText: 'His father was an artist, too.',
      translation: '그의 아버지도 화가였습니다.',
    },
    {
      originText: 'But young Picasso could paint better than his father.',
      translation: '하지만, 어린 피카소는 그의 아버지보다 그림을 더 잘 그릴 줄 알았습니다.',
    },
    {
      originText: 'Picasso painted his mother when he was 14 years old.',
      translation: '피카소는 14살이었을 때 그의 어머니를 그렸습니다.',
    },
    {
      originText: `The painting was so good, and it looked real.`,
      translation: '그 그림은 매우 훌륭했고, 진짜처럼 보였습니다.',
    },
    {
      originText: (
        <>
          This time is his{' '}
          <Typography useGap={false} color='var(--color-green-600)' weight='var(--font-weight-bold)'>
            Realistic Period
          </Typography>
          .
        </>
      ),
      translation: '이 시기는 그의 ‘사실주의 시대’입니다.',
    },
  ];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start'>
      <ListHeader>
        <ToggleButton
          id='toggle'
          isChecked={isOpen}
          isTranslation
          onClick={() => setIsOpen(!isOpen)}
          ariaLabel={isOpen ? '해석 숨기기' : '해석 보기'}
        />
      </ListHeader>
      <Scroll height={'330px'} tabIndex={0}>
        <List<IListenAndAnswer> data={data}>
          {({ value, index = 1 }) => (
            <BoxWrap boxGap={10}>
              {value?.title ? (
                <Box useFull display='flex' flexDirection='column' alignItems='center'>
                  <Typography weight='var(--font-weight-bold)'>{value?.originText}</Typography>
                  <Box height='72px'>
                    {isOpen && (
                      <Typography color={'var(--color-blue-900)'} fontSize='var(--font-size-22)' lineHeight='32px'>
                        {value?.translation}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Typography>{value?.originText}</Typography>
                  <Box height='72px'>
                    {isOpen && (
                      <Typography color={'var(--color-blue-900)'} fontSize='var(--font-size-22)' lineHeight='32px'>
                        {value?.translation}
                      </Typography>
                    )}
                  </Box>
                </Box>
              )}
            </BoxWrap>
          )}
        </List>
      </Scroll>
    </Container>
  );
};

export default P02;
