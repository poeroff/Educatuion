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
    headerText: 'Play Together 2',
    headerPattern: 'text',
  },
  questionInfo: {
    text: `활동 방법을 보고, ‘세계 여행 말판 놀이’ 활동을 해 봅시다.  `,
  },
  data: [
    { question: '두 명씩 짝을 이루고, 교과서의 말판을 가운데 둔다.' },
    {
      question: `가위바위보를 해서 이긴 학생(S1)이 먼저 자신의 출발 칸에 지우개를 두고 손가락으로 튕긴다.`,
    },
    {
      question: `지우개가 시계가 그려진 칸에 도착하면 진 학생(S2)이 시각을 묻고 이긴 학생(S1)이 답한다.
S2: What time is it?
S1: It’s 5 o’clock.`,
    },
    {
      question: `지우개가 시계와 일과가 모두 그려진 칸에 도착하면 S2가 시각을 묻고 S1은 시각과 일과를 모두 대답한다.
S2: What time is it?
S1: It’s 6 o’clock. It’s time for dinner.`,
    },
    { question: 'S1이 바르게 대답하면 해당 칸에 자신의 기호를 표시할 수 있다.' },
    { question: '지우개가 밖으로 튕겨 나가거나 상대방이 먼저 표시한 칸에 도착하면 상대방에게 기회가 넘어간다.' },
    { question: '번갈아 가며 같은 방법으로 놀이를 계속하여 더 많은 칸에 표시를 한 사람이 이긴다.' },
  ],
  srtFile: `1
            00:00:00,000 --> 00:00:03,500
          `,
  video: '/L07/C02/A06/EE4-L07-C02-A06-P01.mp4',
  pdf: '/L07/C02/A06/EE4-L07-C02-A06-P01.pdf',
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
      <BoxWrap useFull {...{ width: '684px', height: '306px', margin: '0 auto' }}>
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
