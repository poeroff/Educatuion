import { TMainHeaderInfoTypes, Box, Typography, ToggleButton, ListHeader, Scroll, List, BoxWrap, Label, EStyleFontSizes } from '@maidt-cntn/ui';
import { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Small Actions, Big Change (1)',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: '해석을 확인해 봅시다.',
  };

  const headerData: IListenAndAnswer = {
    originText: (
      <Box border='none' padding='4px 12px' hAlign='center' width={'900px'}>
        <Typography useGap={false} weight={700}>
          Small Actions, Big Change
        </Typography>
      </Box>
    ),
    translation: (
      <Box border='none' padding='4px 12px' hAlign='center' width={'900px'}>
        <Typography useGap={false} weight={700}>
          작은 행동, 큰 변화
        </Typography>
      </Box>
    ),
  };

  const data: IListenAndAnswer[] = [
    {
      originText: `Last month, I saw “#ZeroWasteChallenge” on Jiwoo’s social media. `,
      translation: `지난달에 나는 지우의 소셜 미디어에서 ‘#제로웨이스트챌린지’를 보았다. `,
    },
    {
      originText: `The challenge was making no trash. `,
      translation: `그 챌린지는 쓰레기를 만들지 않는 것이었다. `,
    },
    {
      originText: `I liked her idea and tried the challenge. `,
      translation: `나는 그녀의 생각이 마음에 들어서 그 챌린지를 해 보았다. `,
    },
    {
      originText: `Here is my one-week plan for a trash-free life.`,
      translation: `여기에 쓰레기 없는 생활을 위한 나의 일주일 계획이 있다.`,
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
