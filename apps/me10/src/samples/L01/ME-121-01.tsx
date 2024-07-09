import { useState } from 'react';
import { Box, Typography, TMainHeaderInfoTypes, IQuestionProps, IAudioPlayerProps, Label, BoxWrap, SvgIcon, ETagLine, Tag } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import connectorLineBig from '../../assets/icon/connector_line_big.svg';
import connectorLineSmall from '../../assets/icon/connector_line_small.svg';

const ME10301 = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Talk to Play: Guess Who?',
  };

  const questionInfo: IQuestionProps = {
    text: '어떻게 말하면 좋을지 확인해 봅시다.',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: 'audioSrc',
  };

  return (
    <Container
      useExtend
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <BoxWrap useFull>
        <BoxWrap width='calc(50% - 33px)' marginRight='0'>
          <BoxWrap
            borderRadius='16px'
            backgroundColor='var(--color-grey-50)'
            padding='12px'
            flexDirection='column'
            height='fit-content'
            margin='auto'
          >
            <BoxWrap flexDirection='row' marginBottom='4px'>
              <Label
                size='number'
                type='line'
                marginRight={11}
                background='var(--color-blue-100)'
                cssStyle={{ border: 0, marginTop: '5px', minWidth: '38px', height: '38px' }}
              >
                <Typography useGap={false} weight='var(--font-weight-bold)' fontSize='var(--font-size-24)' align='center' lineHeight='42px'>
                  A
                </Typography>
              </Label>

              <Box>
                <Typography fontSize='var(--font-size-24)' lineHeight='36px'>
                  Do you know about this person?
                </Typography>
                <Typography color='var(--color-required)' fontSize='var(--font-size-24)' weight='var(--font-weight-bold)' lineHeight='36px'>
                  She is a famous writer.
                </Typography>
              </Box>
            </BoxWrap>

            <BoxWrap flexDirection='row' marginBottom='4px'>
              <Label
                size='number'
                type='line'
                marginRight={11}
                background='var(--color-yellow-100)'
                cssStyle={{ border: 0, marginTop: '5px', minWidth: '38px', height: '38px' }}
              >
                <Typography useGap={false} weight='var(--font-weight-bold)' fontSize='var(--font-size-24)' align='center' lineHeight='42px'>
                  B
                </Typography>
              </Label>

              <Box>
                <Typography fontSize='var(--font-size-24)' lineHeight='36px'>
                  Umm. Can you tell me more about{' '}
                  <Typography
                    useGap={false}
                    color='var(--color-required)'
                    weight='var(--font-weight-bold)'
                    fontSize='var(--font-size-24)'
                    lineHeight='36px'
                  >
                    her
                  </Typography>
                  ?
                </Typography>
              </Box>
            </BoxWrap>

            <BoxWrap flexDirection='row'>
              <Label
                size='number'
                type='line'
                marginRight={11}
                background='var(--color-blue-100)'
                cssStyle={{ border: 0, marginTop: '5px', minWidth: '38px', height: '38px' }}
              >
                <Typography useGap={false} weight='var(--font-weight-bold)' fontSize='var(--font-size-24)' align='center' lineHeight='42px'>
                  A
                </Typography>
              </Label>

              <Box>
                <Typography color='var(--color-required)' fontSize='var(--font-size-24)' weight='var(--font-weight-bold)' lineHeight='36px'>
                  She is from the UK.
                </Typography>
              </Box>
            </BoxWrap>
          </BoxWrap>
        </BoxWrap>

        <BoxWrap width='66px' marginRight='0'>
          <BoxWrap flexDirection='column' justifyContent='center' position='relative'>
            <SvgIcon
              src={connectorLineBig}
              width='64px'
              height='136px'
              style={{ position: 'absolute', top: '15%', left: '-2px', transform: 'translateY(-1px)' }}
            />
            <SvgIcon
              src={connectorLineSmall}
              width='64px'
              height='85px'
              style={{ position: 'absolute', top: 'calc(48% - 4px)', left: '-3px', transform: 'rotate(180deg) scaleX(-1);' }}
            />
          </BoxWrap>
        </BoxWrap>

        <BoxWrap width='calc(50% - 33px)' marginRight='0' flexDirection='column'>
          <BoxWrap
            minHeight='145px'
            borderRadius='16px'
            border='1px solid var(--color-m-en-bg)'
            marginBottom='24px'
            justifyContent='space-between'
            flexDirection='column'
          >
            <BoxWrap flexDirection='row' padding='12px'>
              <Label
                size='number'
                type='line'
                marginRight={11}
                background='var(--color-yellow-100)'
                cssStyle={{ border: 0, marginTop: '5px', minWidth: '38px', height: '38px' }}
              >
                <Typography useGap={false} weight='var(--font-weight-bold)' fontSize='var(--font-size-24)' align='center' lineHeight='42px'>
                  B
                </Typography>
              </Label>

              <Box>
                <Typography fontSize='var(--font-size-24)' lineHeight='36px'>
                  I know!{' '}
                  <Typography
                    useGap={false}
                    color='var(--color-required)'
                    fontSize='var(--font-size-24)'
                    weight='var(--font-weight-bold)'
                    lineHeight='36px'
                  >
                    She is J. K. Rowling.
                  </Typography>
                </Typography>
              </Box>
            </BoxWrap>

            <Box hAlign='flex-end' marginBottom='12px' marginRight='12px'>
              <Tag
                type={ETagLine.BLUE}
                label='3점'
                width='45px'
                height='32px'
                fontSize='var(--font-size-16)'
                style={{ padding: 0, borderWidth: '1px' }}
              />
            </Box>
          </BoxWrap>

          <BoxWrap borderRadius='16px' border='1px solid var(--color-m-en-bg)' flexDirection='column'>
            <BoxWrap flexDirection='row' padding='12px 12px 0 12px'>
              <Label
                size='number'
                type='line'
                marginRight={11}
                background='var(--color-yellow-100)'
                cssStyle={{ border: 0, marginTop: '5px', minWidth: '38px', height: '38px' }}
              >
                <Typography useGap={false} weight='var(--font-weight-bold)' fontSize='var(--font-size-24)' align='center' lineHeight='42px'>
                  B
                </Typography>
              </Label>

              <Box>
                <Typography fontSize='var(--font-size-24)' lineHeight='36px'>
                  Can you tell me more about{' '}
                  <Typography
                    useGap={false}
                    color='var(--color-required)'
                    fontSize='var(--font-size-24)'
                    weight='var(--font-weight-bold)'
                    lineHeight='36px'
                  >
                    her?
                  </Typography>
                </Typography>
              </Box>
            </BoxWrap>

            <BoxWrap flexDirection='row' marginRight='0' paddingLeft='12px'>
              <Label
                size='number'
                type='line'
                marginRight={11}
                background='var(--color-blue-100)'
                cssStyle={{ border: 0, marginTop: '5px', minWidth: '38px', height: '38px' }}
              >
                <Typography useGap={false} weight='var(--font-weight-bold)' fontSize='var(--font-size-24)' align='center' lineHeight='42px'>
                  A
                </Typography>
              </Label>

              <Box>
                <Typography fontSize='var(--font-size-24)' lineHeight='36px'>
                  Do you know about this person?
                </Typography>
                <Typography color='var(--color-required)' weight='var(--font-weight-bold)' fontSize='var(--font-size-24)' lineHeight='36px'>
                  She wrote the Harry Potter series.
                </Typography>
              </Box>
            </BoxWrap>

            <BoxWrap flexDirection='row' padding='0 12px 4px 12px'>
              <Label
                size='number'
                type='line'
                marginRight={11}
                background='var(--color-yellow-100)'
                cssStyle={{ border: 0, marginTop: '5px', minWidth: '38px', height: '38px' }}
              >
                <Typography useGap={false} weight='var(--font-weight-bold)' fontSize='var(--font-size-24)' align='center' lineHeight='42px'>
                  B
                </Typography>
              </Label>
              <Box>
                <Typography fontSize='var(--font-size-24)' lineHeight='36px'>
                  I know!{' '}
                  <Typography
                    useGap={false}
                    color='var(--color-required)'
                    fontSize='var(--font-size-24)'
                    weight='var(--font-weight-bold)'
                    lineHeight='36px'
                  >
                    She is J. K. Rowling.
                  </Typography>
                </Typography>
              </Box>
            </BoxWrap>

            <Box hAlign='flex-end' marginBottom='12px' marginRight='12px'>
              <Tag
                type={ETagLine.BLUE}
                label='1점'
                width='45px'
                height='32px'
                fontSize='var(--font-size-16)'
                style={{ padding: 0, borderWidth: '1px' }}
              />
            </Box>
          </BoxWrap>
        </BoxWrap>
      </BoxWrap>
    </Container>
  );
};

export default ME10301;
