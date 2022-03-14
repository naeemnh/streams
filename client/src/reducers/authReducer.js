import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
	isSignedIn: null,
	user: { userId: null, userName: null, profileUrl: null },
};

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SIGN_IN:
			return {
				...state,
				isSignedIn: true,
				user: {
					userId: action.payload.userId,
					userName: action.payload.userName,
					profileUrl: action.payload.profileUrl,
				},
			};
		case SIGN_OUT:
			return { ...state, isSignedIn: false, user: null };
		default:
			return state;
	}
};

export default authReducer;
