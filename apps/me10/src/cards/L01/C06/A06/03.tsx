import { useState } from 'react';
import {
  Scroll,
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  List,
  ListHeader,
  Typography,
  ToggleButton,
  EStyleFontSizes,
  IQuestionProps,
} from '@maidt-cntn/ui';
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
    headerText: `What's in Your School Survival Kit? (3)`,
  };

  const questionInfo: IQuestionProps = {
    text: '해석을 확인해 봅시다.',
    size: 'medium',
  };

  const data: IListenAndAnswer[] = [
    {
      label: 'Mrs.Seo',
      labelColor: 'var(--color-green-500)',
      originText: 'Now, what do you want in your school survival kit?',
      translation: '자, 여러분의 학교 생존 키트에는 무엇을 원하나요?',
    },
    {
      label: 'Somin',
      labelColor: 'var(--color-purple-400)',
      originText: 'A mirror! I look in the mirror and say, “Just be you!”',
      translation: '거울이요! 저는 거울을 보고 “그냥 너답게 해!”라고 말해요.',
    },
    {
      label: 'Jiwon',
      labelColor: 'var(--color-red-500)',
      originText: 'For me, a stress ball. I hold the ball tightly. Then my stress goes away.',
      translation: '저는, 스트레스 푸는 공이요. 저는 공을 꽉 쥐어요. 그러면 스트레스가 사라져요.',
    },
    {
      label: 'Mike',
      labelColor: 'var(--color-blue-900)',
      originText: 'An eraser! It erases my mistakes. I start all over again!',
      translation: '지우개요! 그것은 저의 실수를 지워 줘요. 저는 처음부터 다시 시작해요!',
    },
    {
      label: 'Emily',
      labelColor: 'var(--color-purple-900)',
      originText: `I need a Band-Aid! My feelings get hurt sometimes. But with the Band-Aid, I'm okay.`,
      translation: '저는 반창고가 필요해요! 저의 감정이 때때로 상처받아요. 그러나 반창고가 있어서, 저는 괜찮아요.',
    },
    {
      label: 'Mrs.Seo',
      labelColor: 'var(--color-green-500)',
      originText: `Great! Now make your own survival kit. Let's have a great year!`,
      translation: '좋아요! 이제 여러분 자신의 생존 키트를 만들어 보세요. 좋은 한 해를 보내도록 합시다!',
    },
  ];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='center'>
      <ListHeader>
        <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
      </ListHeader>
      <Scroll tabIndex={0}>
        <List<IListenAndAnswer>
          data={data}
          row={({ value, index = 1 }) => (
            <BoxWrap boxGap={10}>
              <Box minWidth='145px' textAlign='left' color={value?.labelColor} height='fit-content' borderRadius='8px'>
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
