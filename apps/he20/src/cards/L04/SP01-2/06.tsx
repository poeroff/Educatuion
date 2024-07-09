import HE03701SELECT from './HE-037-01-SELECT'


const P06 = () => {


  return (
    <HE03701SELECT selectList={[
      {
        text: '~을 생각나게 하다',
        id: 1,
      },
      {
        text: '~을 대신하다',
        id: 2,
      },
      {
        text: '~을 걱정하다​',
        id: 3,
      },
    ]}
      word='take the place of'
      _page='P06'
    />
  );
};

export default P06;
