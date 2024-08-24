import { ElementNotFound } from './errors';
import { TransactionType } from './types';

const createWidget = async (
	widgetUrl: string,
	el: string | HTMLIFrameElement
): Promise<TransactionType> => {
	if (typeof el === 'string') {
		const element = document.querySelector(el);
		if (element && element.tagName === 'iframe') {
			el = element as HTMLIFrameElement;
		} else {
			throw new ElementNotFound(el);
		}
	}

	el.src = widgetUrl;
	return new Promise((resolve) => {
		const messageHandler = (event: MessageEvent<TransactionType>) => {
			resolve(event.data);
		};

		window.addEventListener('message', messageHandler);
	});
};

export default createWidget;
