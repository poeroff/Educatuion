import { useState } from 'react';

import { Box, BoxWrap, EImageType, IQuestionProps, Image, Input, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import heart from '../../assets/icon/heart.svg';
import star from '../../assets/icon/star.svg';
import video from '../../assets/icon/video.svg';

const ME11501 = () => {
  const [channelName, setChannelName] = useState<string>('');
  const [myName, setMyName] = useState<string>('');
  const [likes, setLikes] = useState<string>('');
  const [favorite, setFavorite] = useState<string>('');
  const [favoriteItem, setFavoriteItem] = useState<string>('');
  const [videoAbout, setVideoAbout] = useState<string>('');

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'My Video Channel: Step2',
  };

  const questionInfo: IQuestionProps = {
    text: '예시의 밑줄 친 부분을 고쳐 자신의 동영상 채널을 소개하는 프로필을 작성해 봅시다.',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} useExtend submitLabel='완료하기' onSubmit={() => {}}>
      <Image src={'/example/ME1-L01-C04-A02-P03.png'} type={EImageType.IMG_BG} height='362px'>
        <BoxWrap boxGap={52} justifyContent='center' alignItems='flex-end' width='auto' height='185px' marginLeft='46px' paddingBottom='10px'>
          <Box display='flex' flexDirection='column'>
            <Typography color='var(--color-white)' weight='var(--font-weight-bold)'>
              Channel Name:
            </Typography>
            <Input
              minWidth='283px'
              placeholder='e.g. BadminChris'
              value={channelName}
              onChange={e => setChannelName(e.target.value)}
              ariaLabel='답 입력란'
            />
          </Box>
          <Box display='flex' flexDirection='column'>
            <Typography color='var(--color-white)' weight='var(--font-weight-bold)' textDecoration='underline'>
              My Name:
            </Typography>
            <Input minWidth='283px' placeholder='e.g. Chris' value={myName} onChange={e => setMyName(e.target.value)} ariaLabel='답 입력란' />
          </Box>
        </BoxWrap>
        <Box padding='0 40px' marginTop='4px'>
          <Box vAlign='center'>
            <Box padding='12px 10px' vAlign='center'>
              <SvgIcon src={heart} size='32px' />
            </Box>
            <Typography>Likes: I like</Typography>
            <Box flex='1'>
              <Input
                minWidth='243px'
                width='100%'
                placeholder='e.g. sports'
                value={likes}
                onChange={e => setLikes(e.target.value)}
                ariaLabel='답 입력란'
              />
            </Box>
            <Typography>.</Typography>
          </Box>
          <Box vAlign='center' marginTop='4px'>
            <Box padding='12px 10px' vAlign='center'>
              <SvgIcon src={star} size='32px' />
            </Box>
            <Typography>Favorite: My Favorite</Typography>
            <Box flex='1'>
              <Input width='100%' placeholder='e.g. sports' value={favorite} onChange={e => setFavorite(e.target.value)} ariaLabel='답 입력란' />
            </Box>
            <Typography>is</Typography>
            <Box flex='1'>
              <Input
                width='100%'
                placeholder='e.g. badminton'
                value={favoriteItem}
                onChange={e => setFavoriteItem(e.target.value)}
                ariaLabel='답 입력란'
              />
            </Box>
            <Typography>.</Typography>
          </Box>
          <Box vAlign='center' marginTop='4px'>
            <Box padding='12px 10px' vAlign='center'>
              <SvgIcon src={video} size='32px' />
            </Box>
            <Typography>My video are about</Typography>
            <Box flex='1'>
              <Input
                width='100%'
                placeholder='e.g. badminton'
                value={videoAbout}
                onChange={e => setVideoAbout(e.target.value)}
                ariaLabel='답 입력란'
              />
            </Box>
            <Typography>.</Typography>
          </Box>
        </Box>
      </Image>
    </Container>
  );
};

export default ME11501;
