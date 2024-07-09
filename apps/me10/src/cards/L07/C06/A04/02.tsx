import { TMainHeaderInfoTypes, Box, Typography, ToggleButton, ListHeader, Scroll, List, BoxWrap, Label, EStyleFontSizes } from '@maidt-cntn/ui';
import { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Amazing Facts About the World (1)',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: '해석을 확인해 봅시다.',
  };

  const headerData: IListenAndAnswer = {
    originText: (
      <Box border='none' padding='4px 12px' hAlign='center' width={'900px'}>
        <Typography useGap={false} weight={700}>
          Amazing Facts About the World
        </Typography>
      </Box>
    ),
    translation: (
      <Box border='none' padding='4px 12px' hAlign='center' width={'900px'}>
        <Typography useGap={false} weight={700}>
          세상에 관한 놀라운 사실들
        </Typography>
      </Box>
    ),
  };

  const data: IListenAndAnswer[] = [
    {
      label: 'Host',
      labelColor: 'var(--color-purple-800)',
      originText: ` Welcome to the Paran Quiz Show! `,
      translation: '파란 퀴즈 쇼에 오신 것을 환영합니다! ',
    },
    {
      originText: ` I’m your host, Suji. `,
      translation: `저는 진행자인 수지입니다. `,
      inLine: true,
    },
    {
      originText: ` Today, we have two finalists, Namjun from Class 2 and Sara from Class 5. `,
      translation: `오늘 두 명의 결승 진출자인 2반의 남준이와 5반의 사라가 나와 있습니다. `,
      inLine: true,
    },
    {
      originText: ` Namjun and Sara, how are you today? `,
      translation: `남준과 사라, 오늘 어떤가요?`,
      inLine: true,
    },
    {
      label: 'Namjun',
      labelColor: '#EB6707',
      originText: ` I’m nervous, but I’ll do my best.`,
      translation: '저는 긴장되지만, 최선을 다하겠습니다.',
    },
    {
      label: 'Sara',
      labelColor: 'var(--color-green-800)',
      originText: ` I’m excited!`,
      translation: '저는 신이 나요!',
    },
    {
      label: 'Host',
      labelColor: 'var(--color-purple-800)',
      originText: ` The winner will receive a Fast Pass for lunch. `,
      translation: '우승자는 점심 패스트 패스(점심시간에 줄을 서지 않고 바로 급식을 먹을 수 있는 표)를 받게 됩니다.',
    },
    {
      originText: ` Today’s topic is amazing facts about the world.`,
      translation: `오늘 주제는 세상에 관한 놀라운 사실들이에요. `,
      inLine: true,
    },
    {
      originText: ` I’m going to ask you three questions.`,
      translation: `여러분에게 세 문제를 낼 거예요. `,
      inLine: true,
    },
    {
      originText: ` Are you ready?`,
      translation: `준비됐나요?`,
      inLine: true,
    },
    {
      label: 'Namjun & Sara',
      originText: ` Yes, I’m ready!`,
      translation: `네, 준비됐습니다!`,
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
              {value?.label && (value?.label === 'Host' || value?.label === 'Namjun' || value?.label === 'Sara') && (
                <Box fontWeight={'var(--font-weight-bold)'}>
                  <Typography color={value?.labelColor}>{value?.label}</Typography>
                </Box>
              )}
              {value?.label && value?.label === 'Namjun & Sara' && (
                <Box fontWeight={'var(--font-weight-bold)'}>
                  <Typography color={'#EB6707'} weight={'var(--font-weight-bold)'}>
                    Namjun
                  </Typography>
                  <Typography useGap={false} color={'var(--color-blue-800)'} weight={'var(--font-weight-bold)'}>
                    &
                  </Typography>
                  <Typography color={'var(--color-green-800)'} weight={'var(--font-weight-bold)'}>
                    Sara
                  </Typography>
                </Box>
              )}
              <Box marginLeft={value?.inLine ? '95px' : '0px'}>
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

export default P02;
