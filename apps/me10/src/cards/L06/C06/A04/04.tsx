import { TMainHeaderInfoTypes, Box, Typography, ToggleButton, ListHeader, Scroll, List, BoxWrap, Label, EStyleFontSizes } from '@maidt-cntn/ui';
import { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Who Do I Want to Be? (1)',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: '해석을 확인해 봅시다.',
  };

  const headerData: IListenAndAnswer = {
    originText: (
      <Box border='none' padding='4px 12px' hAlign='center' width={'900px'}>
        <Typography useGap={false} weight={700}>
          Who Do I Want to Be?
        </Typography>
      </Box>
    ),
    translation: (
      <Box border='none' padding='4px 12px' hAlign='center' width={'900px'}>
        <Typography useGap={false} weight={700}>
          제가 누가 되고 싶냐고요?
        </Typography>
      </Box>
    ),
  };

  const data: IListenAndAnswer[] = [
    {
      originText: `My teacher told us about tomorrow’s presentation.`,
      translation: '나의 선생님은 우리에게 내일 발표에 대해서 말씀하셨다. ',
    },
    {
      originText: `He asked us, “What do you want to be when you grow up?”`,
      translation: `선생님은 우리에게 물어보셨다. “여러분은 커서 무엇이 되고 싶은가요?” `,
    },
    {
      originText: `I said to myself, “Oh, no.`,
      translation: `나는 나 자신에게 말했다. “오, 안 돼. `,
    },
    {
      originText: `Not again!`,
      translation: `또야!`,
    },
    {
      originText: `What do I want to be?`,
      translation: `내가 뭐가 되고 싶냐고?`,
    },
    {
      originText: `I have no idea.”`,
      translation: `모르겠어.”`,
      inLine: true,
    },
    {
      originText: `At home, I asked my family about their dream jobs.`,
      translation: `집에서 나는 가족들에게 그들의 꿈의 직업에 대해 물었다. `,
    },
    {
      originText: `Dad said, “Well, I wanted to be an astronaut when I was young.`,
      translation: `아빠는 말씀하셨다. “글쎄, 나는 어렸을 때는 우주  비행사가 되고 싶었단다. `,
    },
    {
      originText: `I wanted to travel to the moon.”`,
      translation: `나는 달로 여행 가고 싶었거든.”`,
    },
    {
      originText: `“When I grow up, I’m going to be a robot designer,” said my big sister Angela.`,
      translation: `“나는 커서 로봇 디자이너가 될 거야.” 나의 누나 Angela가 말했다.`,
    },
    {
      originText: `My little sister Sophie shouted, “I’m going to be a superhero or a bird!”`,
      translation: `나의 여동생 Sophie가 소리쳤다. “나는 슈퍼 히어로나 새가 될 거야!”`,
    },
    {
      originText: `Dad asked me, “What about you, Noah?`,
      translation: `아빠가 내게 물어보셨다. “Noah, 너는 어떠니? `,
    },
    {
      originText: `What do you want to be?”`,
      translation: `너는 무엇이 되고 싶어?”`,
    },
    {
      originText: `I was stressed out.`,
      translation: `나는 스트레스가 쌓였다.`,
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

export default P04;
