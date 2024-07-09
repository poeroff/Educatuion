import { useEffect, useState } from 'react';
import { Container } from '@maidt-cntn/ui/en';
import { TMainHeaderInfoTypes, BoxWrap, Box, VideoPlayer, List, Typography, Dialog, IQuestionProps } from '@maidt-cntn/ui';
import { ButtonTypes, LabelTypes } from '@/assets/styles';
import useFile from '@/utils/fileDownLoad';

import { useRecoilState } from 'recoil';
import { tokenAtom } from '@maidt-cntn/stores/token';
import { getFileFromCDNWithToken } from '@maidt-cntn/util/FileUtil';

interface Props {
  Layout: {
    headerInfo: TMainHeaderInfoTypes;
    questionInfo: IQuestionProps;
    // audioInfo: IAudioPlayerProps;
    srtFile?: string;
    data: { question: string }[];
  };
}

const CONST: Props['Layout'] = {
  headerInfo: { headerText: 'Play Together 3' },
  questionInfo: { text: '활동 방법을 보고, ‘희망 앨범 만들기’ 활동을 해 봅시다.', size: 'large' },
  //   audioInfo: { audioSrc: './assets/audio/sample_audio.mp3' },
  data: [
    { question: '교사는 학생들에게 활동지를 한 장씩 나누어 준다.' },
    {
      question: `학생들은 원하는 캐릭터 4명을 오려서 액자 칸에 각각 붙인다. 그림 밑에 가족을 나타내는 낱말을 써서 희망 앨범을 완성한다.`,
    },
    {
      question: `교실을 돌아다니며 친구를 만나 친구에게 자신의 앨범 속 희망 가족을 소개한다.
                S1:  is is my brother.`,
    },
    { question: '5 명의 친구에게 자신의 희망 가족을 소개한다.' },
  ],
  //   srtFile: `
  // 1
  // 00:00:00,000 --> 00:00:03,500
  // Welcome to the Example Subtitle File!

  // 2
  // 00:00:03,000 --> 00:00:06,000
  // This is a demonstration of SRT subtitles.

  // 2
  // 00:00:06,000 --> 00:00:30,1000
  // video playing...
  // `,
};

const prefix = import.meta.env.VITE_CDN_PATH;
const iconInfo = ['/ico_download_white.png', '/ico_label01.png'];

const P01 = () => {
  const files = useFile('EE40', [`/L02/C03/A09/EE4-L02-C03-A09-01.mp4`, '/L02/C03/A09/EE4-L02-C03-A09-01.pdf']);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [iconSrc, setIconSrc] = useState<string[]>([]);

  const [{ accessToken }] = useRecoilState(tokenAtom);

  useEffect(() => {
    if (accessToken) {
      setIconSrc(iconInfo.map(icon => getFileFromCDNWithToken(prefix + icon, accessToken)));
    }
  }, [accessToken]);

  const closeModal = () => {
    setIsShow(false);
  };

  return (
    <Container
      headerInfo={CONST.headerInfo}
      vAlign='top'
      questionInfo={CONST.questionInfo}
      // audioInfo={CONST.audioInfo}
    >
      <BoxWrap useFull {...{ width: '684px', height: '306px', margin: '0 auto' }}>
        <Box useFull height='306px'>
          {files[0] && <VideoPlayer srtFile={''} videoSrc={files[0]} />}
        </Box>
      </BoxWrap>
      <Box hAlign={'center'} useFull {...{ width: '684px', margin: '20px auto 0' }}>
        <ButtonTypes type='method' onClick={() => setIsShow(true)}>
          활동 방법
        </ButtonTypes>
        <ButtonTypes backgroundSrc={iconSrc[0]} type='materials' gap={20}>
          <a href={files[1]} download='활동자료' style={{ color: '#fff' }}>
            활동 자료
          </a>
        </ButtonTypes>
      </Box>

      <Dialog width={984} height={525} isShow={isShow} useHeader={true} /*usePopup={true}*/ onClose={closeModal} closeLabel='확인'>
        <LabelTypes info='title' fontSize={32} background='#0091FF' color='#fff' type='paint' value='활동 방법' />
        <Box tabIndex={103} {...{ marginTop: '30px' }}>
          <List
            data={CONST.data}
            row={({ value, index = 1 }) => (
              <BoxWrap key={index}>
                <LabelTypes fontSize={16} background={`url(${iconSrc[1]}) no-repeat`} color='#fff' type='paint' value={index} />

                <Box>
                  {value?.question.split('\n').map((item: string) => {
                    return <Typography key={item}>{item}</Typography>;
                  })}
                </Box>
              </BoxWrap>
            )}
          />
        </Box>
      </Dialog>
    </Container>
  );
};

export default P01;
