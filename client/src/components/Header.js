import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import GoogleAuth from './GoogleAuth';

const Header = ({ user }) => {
	const renderUsername = () => {
		if (user) {
			return (
				<Link to="#" className="item">
					<img className="ui avatar image" src={user.profileUrl} alt="" />
					{user.userName}
				</Link>
			);
		} else return null;
	};

	return (
		<div className="ui primary pointing menu">
			<Link to="/" className="item">
				Stream
			</Link>
			<div className="right menu">
				<Link to="/" className="item">
					All Streams
				</Link>
				<div className="item">
					<GoogleAuth />
				</div>
				{renderUsername()}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return { user: state.auth.user };
};

export default connect(mapStateToProps)(Header);
