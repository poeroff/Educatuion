import { useState, useEffect } from 'react';
import { Scroll, SvgIcon, ESvgType, BoxWrap, Box, TMainHeaderInfoTypes, Typography, EStyleFontSizes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import DownArrow from '@/assets/icon/down_arrow.svg';
import { tokenAtom } from '@maidt-cntn/stores/token';
import { useRecoilState } from 'recoil';
import { getFileFromCDNWithToken } from '@maidt-cntn/util/FileUtil';

const P07 = () => {
  const cdnPath = import.meta.env.VITE_CDN_PATH;
  const src = '/L03/SP03-1/HE1-L03-SP03-1-P07.jpg';
  const [{ accessToken }] = useRecoilState(tokenAtom);
  const [imageSrcHref, setImageSrcHref] = useState<string>('');

  useEffect(() => {
    setImageSrcHref(getFileFromCDNWithToken(cdnPath + src, accessToken));
  }, [accessToken]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <BoxWrap useFull>
        <Box useFull>
          <Scroll height='460px'>
            <Box background='gray' border='none' hAlign='center' margin='0 80px'>
              <Typography useGap={false} weight={700} style={{ width: '100%', textAlign: 'center' }}>
                The Principle of Sound Waves and Interference
                <br />
                음파와 간섭의 원리 1
              </Typography>
            </Box>
            <Box
              height='168px'
              margin='0 80px'
              backgroundImage={`url(${imageSrcHref})`}
              backgroundSize='cover'
              backgroundRepeat='no-repeat'
              backgroundPosition='90%'
            ></Box>
            <Box background='white' useRound margin='8px 80px 0 80px' padding='8px'>
              <Typography color='var(--color-grey-900)'>{`Sound is produced through vibrations that occur from a sound source, when the strings of a guitar are played, for instance.`}</Typography>
              <Typography
                color='var(--color-blue-900)'
                size={EStyleFontSizes['X-MEDIUM']}
              >{`소리는 예를 들어 기타의 줄이 연주될 때처럼, 음원에서 발생하는 진동을 통해 만들어진다.`}</Typography>
              <Typography
                style={{ marginTop: 16 }}
                color='var(--color-grey-900)'
              >{`The vibrations of the sound source cause the air to vibrate and the sound to travel as waves, similar to the ripples created in a lake when you throw a stone.`}</Typography>
              <Typography
                color='var(--color-blue-900)'
                size={EStyleFontSizes['X-MEDIUM']}
              >{`음원의 진동으로 인해 공기가 진동하고 소리가 파도처럼 이동하게 되는데, 이는 돌을 던질 때 호수에 생성되는 잔물결과 유사하다.`}</Typography>
            </Box>
            <Box hAlign='center' margin='16px 0'>
              <SvgIcon src={DownArrow} type={ESvgType.IMG} alt='아래를 향한 화살표' />
            </Box>
            <Box background='white' useRound margin='8px 80px 0 80px' padding='8px'>
              <Typography color='var(--color-grey-900)'>{`When these sound waves reach our ears, the brain interprets them as sound.`}</Typography>
              <Typography
                color='var(--color-blue-900)'
                size={EStyleFontSizes['X-MEDIUM']}
              >{`이 음파가 우리 귀에 도달하면 뇌는 그것들을 소리로 해석한다.`}</Typography>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P07;
