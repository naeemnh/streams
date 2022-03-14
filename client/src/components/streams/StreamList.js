import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

class StreamList extends Component {
	componentDidMount() {
		this.props.fetchStreams();
	}

	renderAdmin({ userId, _id }) {
		if (this.props.currentUser) {
			if (userId === this.props.currentUser.userId) {
				return (
					<div className="right floated content">
						<Link to={`/streams/edit/${_id}`} className="ui button primary">
							Edit
						</Link>
						<Link to={`/streams/delete/${_id}`} className="ui button negative">
							Delete
						</Link>
					</div>
				);
			}
		}
	}

	renderList() {
		console.log(this.props.streams);
		return this.props.streams.map((stream) => {
			return (
				<div className="item" key={stream._id}>
					{this.renderAdmin(stream)}
					<i className="large middle aligned icon camera" />
					<div className="content">
						<Link to={`/streams/${stream._id}`} className="header">
							{stream.title}
						</Link>
						<div className="description">{stream.description}</div>
					</div>
				</div>
			);
		});
	}

	renderCreate() {
		if (this.props.isSignedIn) {
			return (
				<div style={{ textAlign: 'right' }}>
					<Link to="/streams/new" className="ui button primary">
						Create Stream
					</Link>
				</div>
			);
		}
	}

	render() {
		return (
			<div>
				<h2>Streams</h2>
				<div className="ui celled list">{this.renderList()}</div>
				{this.renderCreate()}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		streams: Object.values(state.streams),
		currentUser: state.auth.user,
		isSignedIn: state.auth.isSignedIn,
	};
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
