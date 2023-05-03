import Spinner from 'components/atoms/Spinner';

export default function LoadingFallback() {
  return (
    <div className="container mx-auto max-w-xl min-h-screen py-24 px-4">
      <div className="vh-center w-full h-32" role="status">
        <Spinner />
      </div>
    </div>
  );
}
