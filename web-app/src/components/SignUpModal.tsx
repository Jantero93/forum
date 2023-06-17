import { Dispatch, SetStateAction, useState } from 'react';
import { useAuth } from '~/hooks/useAuth';
import { useFetch } from '~/hooks/useFetch';
import env from '~/util/env';

type SignUpModalProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

type RegisterResponse = { token: string };

const SignUpModal = ({ setShowModal }: SignUpModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { logInUser } = useAuth();

  const url = `${env.API_URL}/auth/register` as const;
  const payload = { email, password } as const;

  const { callApi, response } = useFetch<RegisterResponse>(
    url,
    'POST',
    payload,
    false
  );

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    callApi();

    if (response?.token) {
      logInUser(response.token);
    }
  };

  return (
    <form className="px-4">
      <div>
        <input
          className="w-full p-1 mb-2 border rounded appearance-none mshadow"
          placeholder="Username"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          className="w-full p-1 mb-3 border rounded appearance-none mshadow"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex gap-3">
        <button
          className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:text-slate-200 hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Register
        </button>
        <button
          className="px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:text-slate-200 hover:bg-red-700"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SignUpModal;
