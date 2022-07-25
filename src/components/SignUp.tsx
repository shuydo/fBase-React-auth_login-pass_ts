// import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Form } from './Form';
import { setUser } from 'store/slices/userSlice';
import { useAppDispatch } from 'hooks/redux-hooks';

const SignUp = () => {
  const dispatch = useAppDispatch();
  const { push } = useHistory();

  //ф-я рег-ии
  const handleRegister = (email: string, password: string) => {
    const auth = getAuth(); 

    console.log('email in handleRegister: ', email);
    console.log('password in handleRegister: ', password);

    console.log('auth: ', auth);
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then(console.log)
    //   .catch(console.error);
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
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
      .catch(console.error);
  };

  return <Form title="register" handleClick={handleRegister} />;
};

export { SignUp };
