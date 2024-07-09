import { TMainHeaderInfoTypes, Box, Typography, ToggleButton, ListHeader, Scroll, List, BoxWrap, Label, EStyleFontSizes } from '@maidt-cntn/ui';
import { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Then and Now (1)',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: '해석을 확인해 봅시다.',
  };

  const headerData: IListenAndAnswer = {
    originText: (
      <Box border='none' padding='4px 12px' hAlign='center' width={'900px'}>
        <Typography useGap={false} weight={700}>
          Then and Now
        </Typography>
      </Box>
    ),
    translation: (
      <Box border='none' padding='4px 12px' hAlign='center' width={'900px'}>
        <Typography useGap={false} weight={700}>
          그때 그리고 지금
        </Typography>
      </Box>
    ),
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'Meet Jihun and Minjun.',
      translation: '지훈이와 민준이를 만나 보세요.',
    },
    {
      originText: 'They are 12 years old.',
      translation: '그들은 열두 살입니다.',
    },
    {
      originText: 'They both love comics and music, but they live in different times.',
      translation: '그들은 모두 만화와 음악을 매우 좋아하지만, 서로 다른 시대에 살고 있어요.',
    },
    {
      originText: 'Jihun lives in 1995, and Minjun lives in the present.',
      translation: '지훈이는 1995년에 살고, 민준이는 현재에 살고 있어요.',
    },
    {
      originText: `Let's look at their lives.`,
      translation: '그들의 생활을 살펴봅시다.',
    },
  ];

  const [isOpen, setIsOpen] = useState<boolean>(false);

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
      <BoxWrap boxGap={10}>
        <Box>
          <Typography>{headerData.originText}</Typography>
          <Box height='80px' paddingTop={4}>
            {isOpen && (
              <Typography color={'var(--color-blue-900)'} size={EStyleFontSizes['X-MEDIUM']}>
                {headerData.translation}
              </Typography>
            )}
          </Box>
        </Box>
      </BoxWrap>

      <Scroll height={'330px'} tabIndex={0}>
        <List<IListenAndAnswer> data={data}>
          {({ value }) => (
            <BoxWrap boxGap={10}>
              {value?.label && (
                <Box padding={'4px 0px'}>
                  <Label value={value?.label} type={'paint'} background={value?.labelColor} />
                </Box>
              )}
              <Box>
                <Typography>{value?.originText}</Typography>
                <Box height='72px'>
                  {isOpen && (
                    <Typography color={'var(--color-blue-900)'} fontSize='22px' lineHeight='32px'>
                      {value?.translation}
                    </Typography>
                  )}
                </Box>
              </Box>
            </BoxWrap>
          )}
        </List>
      </Scroll>
    </Container>
  );
};

export default P03;
