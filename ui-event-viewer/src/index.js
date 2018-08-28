import EventLogger from './components/EventLogger';
import EventListenerRaw from './components/EventListenerRaw';
import EventListenerReact from './components/EventListenerReact';
import serializeEvent from './utils/serialize-event';
import { getNextKey, resetKey } from './utils/generate-key';
import getContent from './utils/getContent';
import React from 'react';
import ReactDOM from 'react-dom';
import { Stack } from 'immutable';
import pretty from 'pretty';

let logs = new Stack();
const STACK_LIMIT = 100;

const add_log = item => {
	console.log('item', item);
	logs = logs.push(item).slice(0, STACK_LIMIT);
};

// This method is called every time an event is logged. Added inspection of
// the DOM to this call.
const log_event = (e, callbackName) => {
	if (e.nativeEvent) {
		add_log(serializeEvent(e.nativeEvent, null, true));
	}
	const range = window.getSelection().getRangeAt(0);
	const editable = document.querySelector('#rte--raw');
	const content = getContent(editable, range).join('⏎');
	const item = Object.assign({ content }, serializeEvent(e, callbackName));

	add_log(item);
	render_logs();
};

const clear_log = () => {
	logs = new Stack();
	resetKey();
	render_logs();
};

const insert_separator = () => {
	add_log({ index: getNextKey(), kind: 'separator' });
	render_logs();
};

const logger_el = document.querySelector('.logger');

const render_logs = () => {
	ReactDOM.render(
		<EventLogger logs={logs} clearLog={clear_log} insertSeparator={insert_separator} />,
		logger_el
	);
};

ReactDOM.render(
	<EventListenerReact onevent={log_event} />,
	document.querySelector('#rte__wrapper--react')
);

new EventListenerRaw(document.querySelector('#rte--raw'), log_event);
