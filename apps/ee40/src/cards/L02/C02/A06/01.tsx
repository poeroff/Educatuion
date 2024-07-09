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
import { useRecoilState } from 'recoil';
import { Container } from '@maidt-cntn/ui/en';
import { tokenAtom } from '@maidt-cntn/stores/token';
import { getFileFromCDNWithToken } from '@maidt-cntn/util/FileUtil';

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
    headerText: 'Play Together 2 ',
    headerPattern: 'text',
  },
  questionInfo: {
    text: `활동 방법을 보고, ‘마이크 돌리기’ 활동을 해 봅시다.`,
  },
  data: [
    { question: '학생들은 4명씩 한 모둠을 이루고, 둥글게 둘러앉는다. 교사는 각 모둠에 마이크를 한 개씩 나누어 준다.' },
    {
      question: `학생들은 그림 카드 4세트를 섞은 후, 책상에 엎어 놓는다.`,
    },
    {
      question: `교사는 〈Story Song〉을 재생하고, 학생들은 노래를 부르며 마이크를 옆으로 돌린다.`,
    },
    {
      question: `교사가 노래를 멈추면 나머지 모둠원은 이름을 묻고 마이크를 든 학생(S1)이 대답한다.
Ss: What’s your name?
S1: My name is Jenny.`,
    },
    {
      question: `대답한 학생(S1)은 카드 한 장을 뒤집어 그림에 맞게 가족을 소개한다. 바르게 소개하면 카드를 가져간다.
S1:  is is my mom.`,
    },
    {
      question: `놀이를 계속하여 가장 많이 카드를 모은 학생이 이긴다.`,
    },
  ],
  srtFile: `1
            00:00:00,000 --> 00:00:03,500
          `,
  video: '/L02/C02/A06/EE4-L02-C02-A06-P01.mp4',
  pdf: '/L02/C02/A06/EE4-L02-C02-A06-P01.pdf',
};

const prefix = import.meta.env.VITE_CDN_PATH;
const iconInfo = ['/ico_download_white.png', '/ico_label01.png'];

const Component = () => {
  const { headerInfo, questionInfo, video, srtFile, pdf, data } = pageInfo;

  const [isShow, setIsShow] = useState<boolean>(false);
  const [iconSrc, setIconSrc] = useState<string[]>([]);

  const [{ accessToken }] = useRecoilState(tokenAtom);

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
              background: `#9747ff url(${iconSrc[0]}) no-repeat 23px 12px`,
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
                <Label background={`url(${iconSrc[1]}) no-repeat 100%`} color='var(--color-white)' type='paint' value={index} />
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
