import { Box, IAudioData, IQuestionProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L01C11A02 = atom<{
  [key: string]: {
    isSubmitted: boolean;
    answer?: string;
    audioData?: { [key in string]: IAudioData | null };
  };
}>({
  key: 'L01C11A02',
  default: {
    p02: {
      isSubmitted: false,
    },
    p03: {
      isSubmitted: false,
      answer: '',
      audioData: {
        2: {},
      },
    },
  },
});

export const L01C11A02HeaderInfo: TMainHeaderInfoTypes = {
  headerText: 'Our Dream School',
};

export const L01C11A02QuestionInfo = {
  p01: {
    type: 'text',
    text: (
      <>
        <Box marginRight='10px'>
          <Typography useGap={false} fontSize='32px' lineHeight='50px' weight={'var(--font-weight-extraBold)'}>
            Step 1.
          </Typography>
          <Typography>다니고 싶은 학교에 관해 생각해 봅시다.</Typography>
        </Box>
      </>
    ),
  } as IQuestionProps,
  p02: {
    type: 'text',
    text: (
      <>
        <Box marginRight='10px'>
          <Typography useGap={false} fontSize='32px' lineHeight='50px' weight={'var(--font-weight-extraBold)'}>
            Step 2.
          </Typography>
          <Typography>‘꿈의 학교’를 소개하는 소책자를 만들어 봅시다.(추후개발예정)</Typography>
        </Box>
      </>
    ),
  } as IQuestionProps,
  p03: {
    type: 'text',
    text: (
      <>
        <Box marginRight='10px'>
          <Typography useGap={false} fontSize='32px' lineHeight='50px' weight={'var(--font-weight-extraBold)'}>
            Step 3.
          </Typography>
          <Typography>완성한 소책자를 설명하는 글을 쓰고 말해봅시다.</Typography>
        </Box>
      </>
    ),
  } as IQuestionProps,
};

export const L01C11A02ImageInfo = {
  p01: {
    src: '/L01/C11/A02/ME1-L01-C11-A02-P01.jpg',
    alt: '학교 복도를 배경으로 세 명의 학생이 각자 노트북을 보며 앉아 있는 모습, 가장 왼쪽에 있는 학생의 말 What’s the name of the school?, 가장 오른쪽에 있는 학생의 말 What subjects do we learn?',
  },
  p02: {
    src: '/L01/C11/A02/ME1-L01-C11-A02-P02.jpg',
    alt: '4페이지의 소책자, 1페이지에는 성과 보름달 그림과 학교 이름 Hogwarts, 2페이지에는 Hogwarts의 수업 시간표와 문장 We have six lessons a day., 3페이지에는 마법 지팡이에서 빛이 뿜어져 나오는 그림과 문장 Our favorite subject is magic., 4페이지에는 검은색 모자와 검은색 망토 그림과 문장 This is our uniform. We wear all black, like magicians!',
  },
  p03: {
    src: '/L01/C11/A02/ME1-L01-C11-A02-P03.jpg',
    alt: '검은색 망토를 입고 마법 지팡이를 들고 있는 남학생',
  },
};
