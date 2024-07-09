import styled from '@emotion/styled';
import {
  Box,
  Typography,
  TMainHeaderInfoTypes,
  IQuestionProps,
  Table,
  TBody,
  TR,
  EStyleTableTypes,
  THead,
  Textarea,
  TableCaption,
  Image,
  SvgIcon,
  List,
  Label,
  Input,
  BoxWrap,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

import LeftLine from '@/assets/icon/left_line.svg';

const ME12602 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string[]>(Array(5).fill(''));

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mePractice',
    headerText: 'A',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: '과일 정보를 보고, 괄호 안의 말을 활용하여 비교하는 문장을 완성해 봅시다.',
  };

  const data = [
    { thText: '', size: 'size', weight: 'weight', price: 'price' },
    { thText: 'lemon', size: '/example/ME-126-02/ME1-L07-C09-A03-P01-1.png', weight: '90g', price: '1,000 won', alt: '레몬' },
    { thText: 'tomato', size: '/example/ME-126-02/ME1-L07-C09-A03-P01-2.png', weight: '160g', price: '800 won', alt: '토마토' },
    { thText: 'apple', size: '/example/ME-126-02/ME1-L07-C09-A03-P01-3.png', weight: '300g', price: '2,000 won', alt: '사과' },
    { thText: 'watermelon', size: '/example/ME-126-02/ME1-L07-C09-A03-P01-4.png', weight: '2,500g', price: '12,000 won', alt: '수박' },
  ];

  const handleInputChange = (index: number, value: string) => {
    setInputValue(prevValue => prevValue.map((prevValue, i) => (i === index ? value : prevValue)));
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      useExtend
      vAlign='flex-start'
    >
      <Table color={EStyleTableTypes.DEFAULT} sizes={['60px', '217px', '217px', '217px', '217px']}>
        <TableCaption caption='학교생활 쓰기 목록' hidden />
        <THead>
          {data.map(value => (
            <TH>
              <Typography fontSize='24px' useGap={false} lineHeight='36px' color='var(--color-black)' fontWeight='700'>
                {value.thText}
              </Typography>
            </TH>
          ))}
        </THead>
        <TBody>
          <TR>
            <TD type='main'>
              <BoxWrap height={114} alignItems='center' justifyContent='center'>
                <Typography useGap={false} fontSize='24px' lineHeight='36px' color='var(--color-black)' fontWeight='700'>
                  {data[0].size}
                </Typography>
              </BoxWrap>
            </TD>
            {data.slice(1).map((value, index) => (
              <TD>
                <BoxWrap height={114} alignItems='center' justifyContent='center'>
                  <Image src={value.size} alt={value.alt} />
                  {index != 3 && (
                    <SvgWrapper>
                      <SvgIcon size='38px' src={LeftLine} />
                    </SvgWrapper>
                  )}
                </BoxWrap>
              </TD>
            ))}
          </TR>
          <TR>
            <TD type='main'>
              <Typography useGap={false} fontSize='24px' lineHeight='36px' color='var(--color-black)' fontWeight='700'>
                {data[0].weight}
              </Typography>
            </TD>
            {data.slice(1).map(value => (
              <TD>
                <BoxWrap alignItems='center' justifyContent='center'>
                  <Typography useGap={false} fontSize='24px' lineHeight='36px' color='var(--color-black)'>
                    {value.weight}
                  </Typography>
                </BoxWrap>
              </TD>
            ))}
          </TR>
          <TR>
            <TD type='main'>
              <BoxWrap alignItems='center' justifyContent='center'>
                <Typography useGap={false} fontSize='24px' lineHeight='36px' color='var(--color-black)' fontWeight='700'>
                  {data[0].price}
                </Typography>
              </BoxWrap>
            </TD>
            {data.slice(1).map(value => (
              <TD>
                <BoxWrap alignItems='center' justifyContent='center'>
                  <Typography useGap={false} fontSize='24px' lineHeight='36px' color='var(--color-black)'>
                    {value.price}
                  </Typography>
                </BoxWrap>
              </TD>
            ))}
          </TR>
        </TBody>
      </Table>
      <Box marginTop={20}>
        <BoxWrap boxGap={4} alignItems='center'>
          <Label value='(1)' type='text' fontSize={28} marginLeft={12} marginRight={12} />
          <BoxWrap boxGap={0} alignItems='center'>
            <Typography>A lemon is</Typography>
            <Input placeholder='내용을 넣어 주세요.' width='245px' inputSize='small' />
            <Typography>
              than a watermelon.{' '}
              <Typography useGap={false} color='var(--color-blue-600)'>
                (small)
              </Typography>
            </Typography>
          </BoxWrap>
        </BoxWrap>
        <BoxWrap boxGap={4} alignItems='center' marginTop={8}>
          <Label value='(2)' type='text' fontSize={28} marginLeft={12} marginRight={12} />
          <BoxWrap boxGap={0} alignItems='center'>
            <Typography>An apple is</Typography>
            <Input placeholder='내용을 넣어 주세요.' width='245px' inputSize='small' />
            <Input placeholder='내용을 넣어 주세요.' width='245px' inputSize='small' marginLeft={4} />
            <Typography>
              a tomato.{' '}
              <Typography useGap={false} color='var(--color-blue-600)'>
                (heavy)
              </Typography>
            </Typography>
          </BoxWrap>
        </BoxWrap>
      </Box>
    </Container>
  );
};

export default ME12602;

const SvgWrapper = styled.div`
  position: absolute;
  right: -18px;
  top: calc(50% - 14px);
  z-index: 2;
`;

const TH = styled.th`
  display: table-cell;
  vertical-align: middle;
  height: 59px;
  background: var(--color-green-100);
`;

const TD = styled.td<{ type?: string }>`
  position: relative;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  height: 52px;
  background: ${({ type }) => (type == 'main' ? 'var(--color-green-100); padding-inline: 29px;' : 'var(--color-white)')};
`;
