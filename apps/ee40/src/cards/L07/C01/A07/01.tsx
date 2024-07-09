import { useEffect, useState } from 'react';
import {
  Box,
  BoxWrap,
  Button,
  Dialog,
  EStyleButtonTypes,
  IQuestionProps,
  Label,
  List,
  NameTag,
  TMainHeaderInfoTypes,
  Typography,
  VideoPlayer,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useRecoilState } from 'recoil';
import { getFileFromCDNWithToken } from '@maidt-cntn/util/FileUtil';
import { tokenAtom } from '@maidt-cntn/stores/token';

export type PageProps = {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  data: { question: string; t?: string; s?: string }[];
  srtFile: string;
  video: string;
  pdf: string;
};

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Play Together 1',
    headerPattern: 'text',
  },
  questionInfo: {
    text: `활동 방법을 보고, ‘Up & Down 시각 맞히기’ 활동을 해 봅시다.`,
  },
  data: [
    { question: '4명씩 한 모둠을 이루고, 교과서의 시계 그림에 각자 시각을 표시한다.' },
    {
      question: `가위바위보로 순서를 정하고, 첫 번째 학생(S1)이 시각을 묻는다. 모둠원들은 돌아가면서 S1의 	첫 번째 시계가 몇 시인지 추측하여 말한다.
S1: What time is it?
S2: It’s 2 o’clock.`,
    },
    {
      question: `S1은 모둠원들이 추측한 시각을 들을 때마다 Up(엄지손가락을 위로), Down(엄지손가락을 	아래로) 표시를 하며 단서를 준다. 가장 먼저 정답을 맞힌 학생이 점수를 얻는다.`,
    },
    {
      question: `돌아가며 같은 방법으로 놀이를 계속하여 가장 많은 점수를 얻은 학생이 이긴다.`,
    },
  ],
  srtFile: `1
            00:00:00,000 --> 00:00:03,500
          `,
  video: '/L07/C01/A07/EE4-L07-C01-A07-P01.mp4',
  pdf: '/L07/C01/A07/EE4-L07-C01-A07.pdf',
};

const Component = () => {
  const { headerInfo, questionInfo, video, srtFile, pdf, data } = pageInfo;

  const [isShow, setIsShow] = useState<boolean>(false);
  const [{ accessToken }] = useRecoilState(tokenAtom);
  const [iconSrc, setIconSrc] = useState<string[]>([]);

  const prefix = import.meta.env.VITE_CDN_PATH;
  const iconInfo = ['/ico_label01.png', '/ico_download_white.png'];

  useEffect(() => {
    if (accessToken) {
      setIconSrc(iconInfo.map(icon => getFileFromCDNWithToken(prefix + icon, accessToken)));
    }
  }, [accessToken]);

  const downloadPDF = (url: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'file.pdf'; // 다운로드될 파일명
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleDownload = () => {
    const prefix = import.meta.env.VITE_CDN_PATH;
    const pdfUrl = prefix + pdf; // PDF 파일의 URL
    downloadPDF(pdfUrl);
  };

  const closeModal = () => {
    setIsShow(false);
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='top' useExtend={false}>
      <BoxWrap useFull {...{ width: '684px', height: '248px', margin: '0 auto' }}>
        <Box useFull height='306px'>
          <VideoPlayer srtFile={srtFile} videoSrc={video} />
        </Box>
      </BoxWrap>

      <Box hAlign={'center'} useFull {...{ width: '684px', margin: '20px auto 0' }}>
        <Button color={EStyleButtonTypes.NORMAL} onClick={() => setIsShow(true)}>
          <NameTag
            label='활동 방법'
            style={{
              width: '200px',
              height: '48px',
              backgroundColor: '#0091ff',
              color: '#fff',
              fontSize: '32px',
              cursor: 'pointer',
            }}
          />
        </Button>
        <Button color={EStyleButtonTypes.NORMAL} onClick={handleDownload}>
          <NameTag
            label='활동 방법'
            style={{
              width: '200px',
              height: '48px',
              padding: '0 0 0 30px',
              background: `#9747ff url(${iconSrc[1]}) no-repeat 23px 12px`,
              color: '#fff',
              fontSize: '32px',
              cursor: 'pointer',
            }}
          />
        </Button>
      </Box>

      <Dialog width={984} height={525} isShow={isShow} useHeader={true} onClose={closeModal} closeLabel='확인'>
        <NameTag
          label='활동 방법'
          style={{
            width: '200px',
            height: '48px',
            backgroundColor: '#0091ff',
            color: '#fff',
            fontSize: '32px',
            cursor: 'pointer',
          }}
        />
        <Box tabIndex={103} {...{ marginTop: '30px' }}>
          <List
            data={data}
            row={({ value, index = 1 }) => (
              <BoxWrap>
                <Label background={`url(${iconSrc[0]}) no-repeat 100%`} color='var(--color-white)' type='paint' value={index} />
                <Box>
                  <Typography>{value?.question}</Typography>
                  {value?.t && (
                    <Box>
                      <Typography>{value?.t}</Typography>
                    </Box>
                  )}
                  {value?.s && (
                    <Box>
                      <Typography>{value?.s}</Typography>
                    </Box>
                  )}
                </Box>
              </BoxWrap>
            )}
          />
        </Box>
      </Dialog>
    </Container>
  );
};

export default Component;
