import { useState } from 'react';

import { Box, Button, Drawing, EStyleButtonTypes, IQuestionProps, Image, Label, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EM41201 = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '각 분류하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' color='var(--color-white)' background='#969590' />
        물건에 표시한 각을 살펴보고 어떤 기준으로 분류할 수 있을지 이야기해 보세요.
      </>
    ),
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='완료하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      useRound
    >
      <Box useFull>
        <Box hAlign='center' position='relative'>
          <Image src='/example/EM-412-01/Frame 1000005369.png' width='744px' height='445px' ariaDescribedby={'img_desc'} />
          <Box type='hidden' id='img_desc'>
            어린이가 돋보기로 물건들을 보고 있습니다 . ‘ 가’에서는 집게가 각을 이루고 있습니다 . ‘ 나＇에서는 스탠드 조명이 각을 이루고 있습니다 . ‘
            다＇에서는 손톱깎이가 각을 이루고 있습니다 . ‘ 라＇ 에서는 가위의 자르는 부분이 벌어져서 각을 이루고 있습니다 . ‘ 마＇에서는 공책의 끝
            부분이 각을 이루고 있습니다 . ‘ 바＇에서는 컴퍼스가 벌어져서 각을 이루고 있습니다 . ‘ 사＇에서는 삼각자의 두 변이 만나 각을 이루고
            있습니다 . ‘ 아＇에서는 노트북이 열린 채 각을 이루고 있습니다.
          </Box>
          <Box width='93px' height='93px' backgroundColor='var(--color-grey-100)' position='absolute' top='0' right='0' hAlign='center'>
            <Button color={EStyleButtonTypes.NORMAL} onClick={() => {}} width='100%' height='100%' style={{ padding: 0 }}>
              <Typography fontSize='18px' lineHeight='18px' useGap={false}>
                교구 버튼 <br />
                <Typography fontSize='10px' lineHeight='18px' useGap={false} align='center'>
                  (고객 검토 후 반영
                  <br />
                  예정)
                </Typography>
              </Typography>
            </Button>
          </Box>
        </Box>

        <Box marginTop='24px' height='160px'>
          <Drawing />
        </Box>
      </Box>
    </Container>
  );
};

export default EM41201;
