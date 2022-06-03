// import {useSelector} from 'react-redux';
import { useAppSelector } from './redux-hooks';

export function useAuth() {
    const {email, token, id} = useAppSelector(state => state.user);
    // const {email, token, id} = useSelector(state => state.user);

    return {
        isAuth: !!email,
        email,
        token,
        id,
    };
}