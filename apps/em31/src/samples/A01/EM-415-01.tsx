import { Box, BoxWrap, EImageType, IQuestionProps, Image, Label, OverlayTooltip, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';
import brownArrow from '../../assets/icon/brown_arrow.svg';
import otter from '../../assets/icon/otter.png';
import styled from '@emotion/styled';

const EM41501 = () => {
  const [isShow, setShow] = useState(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '각도의 합 알아보기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' color='var(--color-white)' background='#969590' />
        가와 나의 각을 이어 붙여 보세요.
      </>
    ),
  };

  const [button1, setButton1] = useState<boolean>(false);
  const [button2, setButton2] = useState<boolean>(false);
  const getTitle = () => {
    if (button1 && button2) {
      return '각 가, 나 둘 다 선택됨';
    } else if (button1) {
      return '각 가 선택됨';
    } else if (button2) {
      return '각 나 선택됨';
    }
    return undefined;
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
      vAlign='start'
    >
      <BoxWrap justifyContent='center'>
        <BoxWrap height='113px' width='fit-content'>
          <button type='button' onClick={() => setButton1(true)}>
            <Box display='flex' opacity={button1 ? '10%' : 1}>
              <Typography useGap={false}>가</Typography>
              <Box marginLeft='7px' display='flex' alignSelf='flex-end'>
                <Image src='/example/EM-415-01/MC41215_1.png' alt='주황색으로 각도가 표시된 각 가가 있습니다.' width='137px' height='105px' />
              </Box>
            </Box>
          </button>
          <button type='button' onClick={() => setButton2(true)}>
            <Box display='flex' opacity={button2 ? '10%' : 1}>
              <Typography useGap={false}>나</Typography>
              <Box marginLeft='7px' display='flex' alignSelf='flex-end'>
                <Image src='/example/EM-415-01/MC41215_2.png' alt='파란색으로 각도가 표시된 각 나가 있습니다.' width='204px' height='109px' />
              </Box>
            </Box>
          </button>
        </BoxWrap>

        <Box display='flex'>
          <SvgIcon src={brownArrow} width='28px' height='23px' />
          <Box marginLeft='43px' position='relative' title={getTitle()}>
            {button1 && (
              <Box position='absolute'>
                <Image type={EImageType.IMG_BG} src='/example/EM-415-01/MC41215_1.png' width='146px' height='119px' />
              </Box>
            )}
            {button2 && (
              <Box position='absolute' right='0' top='-6px' transform='rotate(357deg)'>
                <Image type={EImageType.IMG_BG} src='/example/EM-415-01/MC41215_2.png' width='219px' height='123px' />
              </Box>
            )}
            <Image
              src='/example/EM-415-01/MC41215_3.jpg'
              alt='화살표와 점선으로 표시된 각 가와 각 나가 합쳐진 그림이 있습니다.'
              width='272px'
              height='100%'
            />
          </Box>
        </Box>

        <Box width='93px' height='93px' padding='5px' backgroundColor='var(--color-grey-100)' hAlign='center' flexDirection='column'>
          <Typography useGap={false} fontSize='18px' lineHeight='30px'>
            교구버튼
          </Typography>
          <Typography useGap={false} fontSize='10px' lineHeight='18px' align='center'>
            (고객 검토 후 반영 예정)
          </Typography>
        </Box>
      </BoxWrap>
      <OtterSpeak>
        <OverlayTooltip type='cloud' place='top'>
          각의 꼭짓점과 <br />
          한 변이 겹치도록 <br />
          이어 붙여야 해요.
        </OverlayTooltip>
      </OtterSpeak>
    </Container>
  );
};

const OtterSpeak = styled.div`
  position: absolute;
  bottom: 6px;
  right: 41px;
  display: block;
  background: url(${otter}) bottom center no-repeat;
  background-size: 126px 150px;
  width: 162px;
  height: 230px;
`;

export default EM41501;
