const items = [
	{id:1, name:'nathan'},
	{id:2, name:'janet'},
]

exports.handler = async function (event, context) {
	return {
		statusCode: 200,
		body: JSON.stringify(items),
	};
};
