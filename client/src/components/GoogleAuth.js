import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

// const GoogleAuth = (props) => {
// 	const auth = useRef('');
// 	useEffect(() => {
// 		window.gapi.load('client:auth2', () => {
// 			window.gapi.client
// 				.init({
// 					clientId:
// 						'745807092002-m0q3c0kc2g4vn2ka0eh3602ni40skg8o.apps.googleusercontent.com',
// 					scope: 'email',
// 				})
// 				.then(() => {
// 					// console.log(auth);
// 					auth.current = window.gapi.auth2.getAuthInstance();
// 					console.log(auth);
// 					onAuthChange(auth.current.isSignedIn.get());
// 					auth.current.isSignedIn.listen(onAuthChange);
// 				});
// 		});
// 	});
// 	const onAuthChange = (isSignedIn) => {
// 		if (isSignedIn) {
// 			props.signIn(
// 				auth.current.currentUser.get().getId(),
// 				auth.current.currentUser.get().getBasicProfile().getName(),
// 				auth.current.currentUser.get().getBasicProfile().getImageUrl()
// 			);
// 		} else {
// 			props.signOut();
// 		}
// 	};

// 	const onSignInClick = () => {
// 		auth.current.signIn();
// 	};

// 	const onSignOutClick = () => {
// 		auth.current.signOut();
// 	};

// 	const renderAuthButton = () => {
// 		if (props.isSignedIn === null) {
// 			return null;
// 		} else if (props.isSignedIn) {
// 			return (
// 				<button className="ui red google button" onClick={onSignOutClick}>
// 					<i className="google icon" />
// 					Sign Out
// 				</button>
// 			);
// 		} else {
// 			return (
// 				<div>
// 					<button className="ui red google button" onClick={onSignInClick}>
// 						<i className="google icon" />
// 						Sign In with Google
// 					</button>
// 				</div>
// 			);
// 		}
// 	};

// 	return <div>{renderAuthButton()}</div>;
// };

class GoogleAuth extends React.Component {
	componentDidMount() {
		console.log(this);
		window.gapi.load('client:auth2', () => {
			window.gapi.client
				.init({
					clientId:
						'745807092002-m0q3c0kc2g4vn2ka0eh3602ni40skg8o.apps.googleusercontent.com',
					scope: 'email',
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();
					this.onAuthChange(this.auth.isSignedIn.get());
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
		});
		console.log(this);
	}

	onAuthChange = (isSignedIn) => {
		if (isSignedIn) {
			this.props.signIn(
				this.auth.currentUser.get().getId(),
				this.auth.currentUser.get().getBasicProfile().getName(),
				this.auth.currentUser.get().getBasicProfile().getImageUrl()
			);
		} else {
			this.props.signOut();
		}
	};

	onSignInClick = () => {
		this.auth.signIn();
	};

	onSignOutClick = () => {
		this.auth.signOut();
	};

	renderAuthButton() {
		if (this.props.isSignedIn === null) {
			return null;
		} else if (this.props.isSignedIn) {
			return (
				<button className="ui red google button" onClick={this.onSignOutClick}>
					<i className="google icon" />
					Sign Out
				</button>
			);
		} else {
			return (
				<div>
					<button className="ui red google button" onClick={this.onSignInClick}>
						<i className="google icon" />
						Sign In with Google
					</button>
				</div>
			);
		}
	}

	render() {
		return <div>{this.renderAuthButton()}</div>;
	}
}

const mapStateToProps = (state) => {
	return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
