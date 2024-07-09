import { useEffect, useState } from 'react';
import { Image, BoxWrap, Box, TMainHeaderInfoTypes, Textarea, PinchZoom, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useRecoilState } from 'recoil';
import { alertAtom } from '@maidt-cntn/stores/alert';

const HE00303 = () => {
  const [isShow, setShow] = useState(false);
  const [_, setAlert] = useRecoilState(alertAtom);
  const [value, setValue] = useState<string>('');
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listening Strategy',
    headerPattern: 'icon',
    iconType: 'listeningStrategy',
  };
  const questionInfo: IQuestionProps = {
    text: 'Looking at the picture, predict the content.',
    mark: 'incorrect',
  };

  useEffect(() => {
    setAlert(props => ({
      ...props,
      isShow,
      message: '녹음이 완료되지 않았어요.',
      subMessage: '이미 제출하셨습니다. \n다시 제출하시겠습니까?',
      description: `'예' 버튼 클릭 시 \n이전에 제출한 내용은 삭제됩니다.`,
      closeLabel: '확인',
      onClose: () => {
        setShow(false);
      },
    }));
  }, [isShow]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      onSubmit={() => {
        setShow(true);
      }}
    >
      <BoxWrap useFull>
        <Box hAlign={'center'} useFull>
          <PinchZoom>
            <Image
              src={'/A01/0001/01/P1-IMG-1.png'}
              width='450px'
              height='280px'
              alt='여학생이 연단에 서서 연설을 하는 모습'
              title='여학생이 연단에 서서 연설을 하는 모습'
            />
          </PinchZoom>
        </Box>
        <Box useFull>
          <Textarea value={value} onChange={event => setValue(event.target.value)} placeholder='내용을 넣어 주세요.' />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default HE00303;
