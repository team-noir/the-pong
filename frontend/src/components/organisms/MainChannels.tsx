import Button from 'components/atoms/Button';

export default function MainChannels() {
  const handleClickCreateChannel = (e: React.MouseEvent<HTMLElement>) => {
    // TODO: call api to create channel
  };

  return (
    <section>
      <h2>Channels</h2>
      <Button type="button" onClick={handleClickCreateChannel}>
        채널 만들기
      </Button>
    </section>
  );
}
