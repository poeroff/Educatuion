import { useState } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  IQuestionProps,
  Button,
  EStyleButtonTypes,
  Image,
  EStyleSizes,
  EStyleShadowedButtonTypes,
  Typography,
  EStyleFontSizes,
  Radio,
} from '@maidt-cntn/ui';
import { Container, ShadowedButton } from '@maidt-cntn/ui/en';

const card_arr = [
  {
    id: 1,
    name: 'Suho',
    src: '/example/ME1-L07-C07-A03-P01-01.png',
    statement: 'Deserts are hot and sandy places, so they are only in Africa.',
    backgroundColor: 'var(--color-green-50)',
    alt: '안경 쓴 남자아이',
  },
  {
    id: 2,
    name: 'Terry',
    src: '/example/ME1-L07-C07-A03-P01-02.png',
    statement: 'Egypt has fewer pyramids than Sudan.',
    backgroundColor: 'var(--color-yellow-50)',
    alt: '노란색 셔츠를 입은 여자아이',
  },
  {
    id: 3,
    name: 'Jiwon',
    src: '/example/ME1-L07-C07-A03-P01-03.png',
    statement: 'Both Namjun and Sara will get a Fast Pass for lunch.',
    backgroundColor: 'var(--color-blue-50)',
    alt: '보라색 재킷을 입은 남자아이',
  },
];

const ME12202 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'readAndWrite',
    headerText: 'Read and Check',
    headerTextColor: 'var(--color-green-800)',
  };

  const questionInfo: IQuestionProps = {
    text: '본문 내용을 잘못 이해한 사람을 골라 봅시다.',
  };

  const [isShow, setShow] = useState<boolean>(false);
  const [radio, setRadio] = useState<number | null>(null);

  return (
    <Container
      useExtend
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <Box hAlign='flex-end' alignItems='center'>
        <Button minWidth='100px' size={EStyleSizes.SMALL} color={EStyleButtonTypes.SECONDARY} label='지문보기' useRound />
      </Box>

      <Box useFull marginTop='4px' hAlign='center' height='fit-content'>
        {card_arr.map((item, index) => (
          <Box key={index} marginLeft={index !== 0 ? '24px' : 0} flex='1 1 calc(33.333% - 48px)'>
            <Box
              padding='11px 36px'
              backgroundColor={item.backgroundColor}
              borderRadius='24px'
              height={130}
              vAlign='center'
              position='relative'
              boxShadow='0px 4px 16px 0px rgba(0, 0, 0, 0.16)'
            >
              <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']} lineHeight='36px'>
                {item.statement}
              </Typography>

              <Box
                position='absolute'
                bottom='-10px'
                left='43.5%'
                width='0'
                height='0'
                borderLeft='20px solid transparent'
                borderRight='20px solid transparent'
                borderTop={`20px solid ${item.backgroundColor}`}
              ></Box>
            </Box>

            <Box hAlign='center' vAlign='flex-start' minHeight='212px' marginTop='10px'>
              <ShadowedButton
                type='img'
                state={item.id === radio ? EStyleShadowedButtonTypes.PRIMARY : EStyleShadowedButtonTypes.DEFAULT}
                style={{ alignItems: 'center' }}
              >
                <Radio
                  type='circle'
                  name={'radio-question-A'}
                  ariaLabel={index + '번 보기'}
                  value={item.id === radio}
                  onClick={() => setRadio(item.id)}
                >
                  <Typography size={EStyleFontSizes['MEDIUM']} lineHeight='42px' weight={500} style={{ paddingLeft: '20px' }}>
                    {item.name}
                  </Typography>
                </Radio>

                <Image src={item.src} alt={item.alt} width='100px' height='130px' style={{ marginLeft: 0, marginTop: '8px' }} />
              </ShadowedButton>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default ME12202;
