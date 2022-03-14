import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params._id);
	}

	onSubmit = () => {
		this.props.deleteStream(this.props.match.params._id);
	};

	renderActions() {
		return (
			<>
				<button to="/" onClick={this.onSubmit} className="ui button negative">
					Delete
				</button>
				<Link to="/" className="ui button">
					Cancel
				</Link>
			</>
		);
	}

	renderContent() {
		if (!this.props.stream) {
			return 'Are you sure you want to delete this stream?';
		}
		return `Are you sure you wan to delete the stream with title: ${this.props.stream.title}`;
	}

	render() {
		return (
			<Modal
				title="Delete Stream"
				content={this.renderContent()}
				actions={this.renderActions()}
				onDismiss={() => history.push('/')}
			/>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return { stream: state.streams[ownProps.match.params._id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
	StreamDelete
);
