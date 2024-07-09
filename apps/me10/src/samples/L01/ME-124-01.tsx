import { useState } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  IQuestionProps,
  Button,
  EStyleButtonTypes,
  Image,
  EStyleSizes,
  Typography,
  EStyleFontSizes,
  BoxWrap,
  Dropdown,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const ME12202 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'readAndWrite',
    headerText: 'Read and Choose',
    headerTextColor: 'var(--color-green-800)',
  };

  const questionInfo: IQuestionProps = {
    text: '본문을 바탕으로 알맞은 단어를 골라 강아지들의 인터뷰를 완성해 봅시다.',
    mark: 'incorrect',
  };

  const [isShow, setShow] = useState<boolean>(false);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <BoxWrap>
        <Box width='327px' marginRight='24px'>
          <Box
            padding='12px 24px'
            backgroundColor='var(--color-blue-50)'
            borderRadius='24px'
            vAlign='center'
            position='relative'
            boxShadow='0px 4px 16px 0px rgba(0, 0, 0, 0.16)'
          >
            <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']} lineHeight='36px'>
              You have a cat on your team. How do you feel?
            </Typography>

            <Box
              position='absolute'
              bottom='-10px'
              left='18%'
              width='0'
              height='0'
              borderLeft='20px solid transparent'
              borderRight='20px solid transparent'
              borderTop={`20px solid var(--color-blue-50)`}
            ></Box>
          </Box>

          <Box>
            <Image src='/example/ME1-L03-C07-A03-P01.png' width='320px' height='246px' />
          </Box>
        </Box>

        <BoxWrap flexDirection='column' alignItems='flex-end'>
          <Button minWidth='100px' size={EStyleSizes.SMALL} color={EStyleButtonTypes.SECONDARY} label='지문 보기' useRound />

          <Box
            position='relative'
            borderRadius='24px'
            padding='16px 24px'
            marginTop='12px'
            backgroundColor='var(--color-yellow-50)'
            width='569px'
            boxShadow='0px 4px 16px 0px rgba(0, 0, 0, 0.16)'
          >
            <Box
              position='absolute'
              top='41%'
              left='-25px'
              width='0'
              height='0'
              borderLeft='20px solid transparent'
              borderRight='20px solid transparent'
              borderTop={`20px solid var(--color-yellow-50)`}
              transform='rotate(90deg)'
            ></Box>

            <Box hAlign='flex-start'>
              <Typography size={EStyleFontSizes['MEDIUM']} lineHeight='40px'>
                Well, we were (1)
              </Typography>
              <Dropdown width='210px' dropdownList={['선택하세요.']} />
            </Box>

            <Typography size={EStyleFontSizes['MEDIUM']} lineHeight='40px'>
              at first. We never had a cat on our team.
            </Typography>

            <Typography size={EStyleFontSizes['MEDIUM']} lineHeight='40px'>
              But Cathy was really good at playing
            </Typography>

            <Box hAlign='flex-start'>
              <Typography size={EStyleFontSizes['MEDIUM']} lineHeight='40px'>
                fetch. We were (2)
              </Typography>
              <Dropdown width='210px' dropdownList={['선택하세요.']} isError />
              <Typography size={EStyleFontSizes['MEDIUM']} lineHeight='40px'>
                .
              </Typography>
            </Box>

            <Typography size={EStyleFontSizes['MEDIUM']} lineHeight='40px'>
              Now, we all like her.
            </Typography>
          </Box>
        </BoxWrap>
      </BoxWrap>
    </Container>
  );
};

export default ME12202;
