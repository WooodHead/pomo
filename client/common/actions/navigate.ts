
import { push } from 'connected-react-router';
import { dispatch } from 'Store';

export const navigate = (url: string) => dispatch(push(url));
