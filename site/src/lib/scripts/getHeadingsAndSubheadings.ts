const getHeadingsAndSubheadings = (content: HTMLDivElement) => {
	const headers: {
		h2: string;
		h3: string[];
	}[] = [];
	let currentH2: {
		h2: string;
		h3: string[];
	} | null = null;

	const allHeadings = content.querySelectorAll('h2, h3');
	allHeadings.forEach((heading) => {
		if (heading.tagName === 'H2') {
			currentH2 = {
				h2: heading.textContent as string,
				h3: []
			};
			headers.push(currentH2);
		} else if (heading.tagName === 'H3' && currentH2) {
			currentH2.h3.push(heading.textContent as string);
		}
	});

	return headers;
};

export default getHeadingsAndSubheadings;
