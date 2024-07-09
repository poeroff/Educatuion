import { useCallback, useState, useEffect } from 'react';
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
    text: '활동 방법을 보고, ‘기분 출석부 만들기’ 놀이를 해봅시다.',
  },
  data: [
    { question: '교사가 기분을 물어보면, 각자 자신의 기분을 대답한다.' },
    {
      question: '출석부 첫 번째 줄에 대답에 맞게 자신의 이름을 쓴다.',
      t: 'How are you?',
      s: 'I’m great. (첫 번째 줄 great 칸에 자신의 이름을 쓴다.)',
    },
    { question: '학생들은 교과서를 들고 교실을 돌아다니며 친구들과 서로의 안부를 묻고 답한다.', t: 'How are you?', s: 'I’m good.' },
    { question: '출석부의 알맞은 표정 칸에 친구의 이름을 쓴다.' },
    { question: '3 명의 친구 이름을 써서 출석부를 완성하면 제자리로 돌아와 앉는다.' },
    { question: '모든 학생이 출석부를 완성할 때까지 놀이를 계속한다.' },
  ],
  srtFile: `1
            00:00:00,000 --> 00:00:03,500
          `,
  video: '/L01/C01/A07/EE4-L01-C01-A07-P01.mp4',
  pdf: '/L01/C01/A07/EE4-L01-C01-A07.pdf',
};

const prefix = import.meta.env.VITE_CDN_PATH;
const iconInfo = ['/ico_download_white.png', '/ico_label01.png'];

const Component = () => {
  const { headerInfo, questionInfo, video, srtFile, pdf, data } = pageInfo;
  const [isShow, setIsShow] = useState<boolean>(false);
  const pdfFile = import.meta.env.VITE_CDN_PATH + pdf;
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

  const onClickImgLink = useCallback((srcUrl: string, name: string) => {
    fetch(srcUrl, { method: 'GET' })
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        setTimeout(_ => {
          window.URL.revokeObjectURL(url);
        }, 1000);
        a.remove();
      })
      .catch(err => {
        console.error('err', err);
      });
  }, []);

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='top' useExtend={false}>
      <BoxWrap useFull {...{ width: '576px', height: '306px', margin: '0 auto' }}>
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
        <Button color={EStyleButtonTypes.NORMAL} onClick={() => onClickImgLink(pdfFile, 'EE4-L01-C01-A07')}>
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
