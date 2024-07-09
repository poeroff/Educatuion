import { useState } from 'react';
import { Scroll, BoxWrap, Box, TMainHeaderInfoTypes, List, ListHeader, Typography, ToggleButton, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P03 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  interface IListenAndAnswer {
    label?: string;
    labelColor?: string;
    originText: string;
    translation: string;
  }

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: `Amazing Facts About the World (4)`,
  };

  const questionInfo: IQuestionProps = {
    text: '해석을 확인해 봅시다.',
  };

  const data: IListenAndAnswer[] = [
    {
      label: 'Host',
      labelColor: 'var(--color-purple-700)',
      originText: 'Now, here comes the final question.',
      translation: '이제 마지막 문제 나갑니다.',
    },
    {
      originText: 'Which country has the most pyramids in the world?',
      translation: '세계에서 어느 나라에 피라미드가 가장 많이 있을까요?',
    },
    {
      label: 'Sara',
      labelColor: 'var(--color-green-500)',
      originText: 'I’m sure it’s Egypt!',
      translation: '그것은 이집트인 것이 확실합니다!',
    },
    {
      label: 'Namjun',
      labelColor: 'var(--color-red-500)',
      originText: 'It’s Sudan.',
      translation: '그것은 수단입니다.',
    },
    {
      label: 'Host',
      labelColor: 'var(--color-purple-700)',
      originText: 'The answer is … Sudan!',
      translation: '정답은… 수단입니다!',
    },
    {
      label: 'Sara',
      labelColor: 'var(--color-green-500)',
      originText: 'Oh, really?',
      translation: '오, 정말요?',
    },
    {
      label: 'Host',
      labelColor: 'var(--color-purple-700)',
      originText: 'I’m surprised, too.',
      translation: '저도 놀랐습니다.',
    },
    {
      originText: 'Hey Joe, tell us more about it.',
      translation: '이봐요, Joe, 그것에 대해 좀 더 말해 주세요.',
    },
    {
      label: 'AI Joe',
      labelColor: 'var(--color-blue-400)',
      originText: 'Please look at this map.',
      translation: '이 지도를 보세요.',
    },
    {
      originText: 'Sudan and Egypt are close to each other.',
      translation: '수단과 이집트는 서로 가까이 있습니다.',
    },
    {
      originText: 'Egypt is more famous for its pyramids, but Sudan has more pyramids than Egypt.',
      translation: '이집트가 피라미드로 더 유명하지만, 수단에는 이집트보다 더 많은 피라미드가 있어요.',
    },
  ];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='center'>
      <ListHeader>
        <ToggleButton
          id='toggle'
          isChecked={isOpen}
          isTranslation
          onClick={() => setIsOpen(!isOpen)}
          ariaLabel={isOpen ? '해석 숨기기' : '해석 보기'}
        />
      </ListHeader>
      <Scroll tabIndex={0}>
        <List<IListenAndAnswer>
          data={data}
          row={({ value, index = 1 }) => (
            <BoxWrap boxGap={10}>
              <Box minWidth='120px' textAlign='right' color={value?.labelColor} height='fit-content' borderRadius='8px'>
                <Typography weight='var(--font-weight-bold)'>{value?.label || ``}</Typography>
              </Box>
              <Box>
                <Typography>{value?.originText}</Typography>
                <Box height='72px'>
                  <Typography color={'var(--color-blue-900)'} fontSize='22px' lineHeight='32px'>
                    {isOpen && value?.translation}
                  </Typography>
                </Box>
              </Box>
            </BoxWrap>
          )}
        />
      </Scroll>
    </Container>
  );
};

export default P03;
