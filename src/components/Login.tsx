// import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Form } from './Form';
import { setUser } from 'store/slices/userSlice';
import { useAppDispatch } from 'hooks/redux-hooks';

const Login = () => {
  const dispatch = useAppDispatch();
  // const dispatch = useDispatch();
  const { push } = useHistory();

  //ф-я аут-ии
  const handleLogin = (email: string, password: string) => {
    console.log('email in handleLogin: ', email);
    console.log('password in handleLogin: ', password);

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        // console.log('user in sIwEaP: ', user);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            // token: user.accessToken
            token: user.refreshToken
          })
        );
        push('/');
      })
      .catch(() => alert('Invalid user!'));

    // signInWithEmailAndPassword(auth, email, password)
    //   .then(console.log)
    //   .catch(console.error);
  };

  return <Form title="sign in" handleClick={handleLogin} />;
};

export { Login };
