import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/home';
import {Link, IndexLink, browserHistory} from 'react-router';
import {connect} from 'react-redux'
import {Form, FormGroup, FormControl, ControlLabel, Col, Row, Button, HelpBlock, Well} from 'react-bootstrap'
import _ from 'lodash';
const cx = classNames.bind(styles);
import requestApi from '../../utilities/requests'
import {Editor, EditorState, convertFromHTML, ContentState, convertToRaw, RichUtils} from 'draft-js';
import backdraft from 'backDraft-js'
import draftConstants from '../../constants/draftConstants'


function mapStateToProps(state){
  return { 
  }
}

function mapDispatchToProps(dispatch){
  return {
  }
}


class NoteMain extends React.Component {


constructor(props){
		super(props)

		const sampleMarkup = this.props.defaultText || ''
		const blocksFromHTML = convertFromHTML(sampleMarkup);
		const state = ContentState.createFromBlockArray(
  			blocksFromHTML.contentBlocks,
  			blocksFromHTML.entityMap
		);
		this.state={
			editorState: EditorState.createWithContent(state),
			boldButton : false,
			italicButton: false,
			underLineButton: false,
			codeButton: false,
		}

		this.onChange = (editorState) => this.setState({editorState});
		this.handleKeyCommand = this.handleKeyCommand.bind(this);
	};

	handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    	if (newState) {
      		this.onChange(newState);
      		return 'handled';
    	}
    	return 'not-handled';
  	}

  	onBoldClick() {
  		this.setState({boldButton : !this.state.boldButton})
    	this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  	}
  	onItalicClick() {
  		this.setState({italicButton : !this.state.italicButton})
    	this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  	}
  	onUnderLineClick() {
  		this.setState({underLineButton : !this.state.underLineButton})
    	this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  	}
  	onCodeClick() {
  		this.setState({codeButton : !this.state.codeButton})
    	this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'CODE'));
  	}

	saveData(){
		const contentState = this.state.editorState.getCurrentContent();	
		var rawDraftContentBlock = convertToRaw(contentState);
		var markedUpBlocks = backdraft(rawDraftContentBlock, draftConstants.MARKUP);
		console.log('marked up blocks == ' + markedUpBlocks);

	}


	render() {
		return (
			<div> 
				<Button active = {this.state.boldButton} onClick={this.onBoldClick.bind(this)}>Bold</Button>
				<Button active = {this.state.italicButton} onClick={this.onItalicClick.bind(this)}>Italic</Button>
				<Button active = {this.state.underLineButton} onClick={this.onUnderLineClick.bind(this)}>UnderLine</Button>
				<Button active = {this.state.codeButton} onClick={this.onCodeClick.bind(this)}>Code</Button>
				<Well className='wellTransparent'><Editor editorState={this.state.editorState} onChange={this.onChange}  handleKeyCommand={this.handleKeyCommand}/></Well>
				<Button onClick = {(e) => this.saveData()}>Save</Button>
			</div>
		)
	};
};



module.exports = connect(mapStateToProps , mapDispatchToProps)(NoteMain)