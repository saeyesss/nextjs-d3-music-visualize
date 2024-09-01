import { getSpotifyAuthUrl } from '@/app/api/spotify';

const Login = () => {
  const handleLogin = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  return (
    <div>
      <button
        className='bg-green text-white px-4 py-2 rounded-full'
        onClick={handleLogin}
      >
        Login with Spotify
      </button>
    </div>
  );
};

export default Login;
