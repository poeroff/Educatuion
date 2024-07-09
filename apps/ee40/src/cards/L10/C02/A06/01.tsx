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
    text: `활동 방법을 보고, ‘주인 찾기’ 활동을 해 봅시다.`,
  },
  data: [
    { question: '4명씩 한 모둠을 이루고, 교사는 모둠별로 주머니를 하나씩 나누어 준다.' },
    {
      question: `학생들은 각자 그림 카드에 자신만의 기호를 표시하여 엎어 놓는다.`,
    },
    {
      question: `가위바위보로 순서를 정하고, 첫 번째 학생(S1)이 그림 카드 한 장을 골라 물건의 이름을 말한다.
S1: Dress.`,
    },
    {
      question: `나머지 모둠원은 S1이 말한 물건에 해당하는 그림 카드 중 한 장을 골라 주머니에 넣는다.`,
    },
    {
      question: `S1은 주머니에서 그림 카드 한 장을 꺼내어 그 카드의 주인일 것 같은 학생(S2)에게 보여주며 	묻는다.
S1: Is this your dress?`,
    },
    {
      question:
        'S2는 자신의 카드가 맞으면 “Yes, it is.”라고 말한다. 자신의 카드가 아니면 “No, it isn’t. My 	dress is long.”과 같이 대답하며 자신의 카드를 묘사한다.',
    },
    {
      question:
        'S2의 카드가 아니면 S1은 주머니 속에서 다른 카드를 꺼내어 다른 모둠원(S3, S4)에게 묻고 	주인을 찾는다. 카드 한 장당 한 사람에게 질문할 수 있다.',
    },
    { question: 'S1이 카드의 주인을 찾은 만큼 점수를 얻는다.' },
    { question: '순서대로 놀이를 계속하여 가장 많은 점수를 얻은 학생이 이긴다.' },
  ],
  srtFile: `1
            00:00:00,000 --> 00:00:03,500
          `,
  video: '/L10/C02/A06/EE4-L10-C02-A06-P01.mp4',
  pdf: '/L10/C02/A06/EE4-L10-C02-A06-P01.pdf',
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
