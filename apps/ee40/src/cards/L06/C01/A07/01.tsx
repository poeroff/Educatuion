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
    headerText: 'Play Together 1',
    headerPattern: 'text',
  },
  questionInfo: {
    text: `활동 방법을 보고, ‘여섯 코너 놀이’ 활동을 해 봅시다. `,
  },
  data: [
    { question: '교사는 교실 여섯 구역에 그림 카드를 한 장씩 붙인다.' },
    { question: '교사는 자신의 그림 카드 여섯 장 중 한 장을 골라 책상에 엎어 놓는다.' },
    {
      question: `교사가 출발 신호를 하면, 학생들은 원하는 구역을 선택하여 그림 카드 앞에 선다.`,
    },
    {
      question: `교사가 학생들에게 무엇을 하고 있는지 질문하면, 학생들은 선택한 그림에 맞게 대답한다.
	T: What are you doing?
	Ss: (‘로봇 만들기’ 카드 구역 학생들) I’m making a robot.`,
    },
    {
      question: `모든 구역의 학생들이 대답하고, 교사에게 무엇을 하고 있는지 질문한다. 교사는 자신이 고른 	그림 카드를 보여주며 대답한다.
Ss: What are you doing?
T: (‘로봇 만들기’ 카드를 보여주며) I’m making a robot.`,
    },
    { question: '교사의 그림 카드와 같은 그림 카드의 구역에 있는 학생들은 점수를 얻는다.' },
    { question: '같은 방법으로 놀이를 계속하여 가장 많은 점수를 얻은 학생이 이긴다.' },
  ],
  srtFile: `1
            00:00:00,000 --> 00:00:03,500
          `,
  video: '/L06/C01/A07/EE4-L06-C01-A07-P01.mp4',
  pdf: '/L06/C01/A07/EE4-L06-C01-A07.pdf',
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
