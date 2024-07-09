import HE03701SELECT from './HE-037-01-SELECT'

const P05 = () => {


  return (
    <HE03701SELECT selectList={[
      {
        text: '자동으로',
        id: 1,
      },
      {
        text: '걱정하여',
        id: 2,
      },
      {
        text: '편리하게​',
        id: 3,
      },
    ]}
      word='automatically'
      _page='P05'
    />
  );
};

export default P05;
