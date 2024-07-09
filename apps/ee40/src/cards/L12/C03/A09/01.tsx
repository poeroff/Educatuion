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
    headerText: 'Play Together 3',
    headerPattern: 'text',
  },
  questionInfo: {
    text: `활동 방법을 보고, ‘이어 쓰기 놀이’ 활동을 해 봅시다.`,
  },
  data: [
    {
      question: `4명씩 한 모둠을 이룬다. 가위바위보로 서기 역할을 할 순서를 정하고 모두 책상에 엎드린다.`,
    },

    {
      question: `교사가 신호를 하면 서기를 제외한 학생들은 차례로 고개를 들어 화면에 나오는 낱말을 보고 기억한다.`,
    },
    {
      question: `모두 낱말을 본 후, 각자 본 낱말을 서기에게 말하고 서기는 어구를 쓴다.`,
    },
    {
      question: `교사가 주말에 무엇을 하는지 물으면 모둠원은 완성한 어구를 들어 올리며 문장으로 대답한다.
T : What do you do on weekends?
Ss: (watch movies를 써서 들어올리며) I watch movies.`,
    },
    { question: `완성한 어구와 대답이 정확하면 해당 모둠은 점수를 얻는다.` },
    { question: `번갈아 가며 같은 방법으로 놀이를 계속하여 가장 많은 점수를 얻은 모둠이 이긴다.` },
  ],
  srtFile: `1
            00:00:00,000 --> 00:00:03,500
          `,
  video: '/L12/C03/A09/EE4-L12-C03-A09-01.mp4',
  pdf: '/L12/C03/A09/EE4-L12-C03-A09-01.pptx',
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
