import {
	FETCH_STREAM,
	FETCH_STREAMS,
	CREATE_STREAM,
	EDIT_STREAM,
	DELETE_STREAM,
} from '../actions/types';

import _ from 'lodash';

const streamReducer = (state = {}, action) => {
	switch (action.type) {
		case FETCH_STREAMS:
			return { ...state, ..._.mapKeys(action.payload, '_id') };
		case FETCH_STREAM:
			return { ...state, [action.payload._id]: action.payload };
		case CREATE_STREAM:
			return { ...state, [action.payload._id]: action.payload };
		case EDIT_STREAM:
			return { ...state, [action.payload._id]: action.payload };
		case DELETE_STREAM:
			return _.omit(state, action.payload);
		default:
			return state;
	}
};

export default streamReducer;
