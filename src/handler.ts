import { Context, APIGatewayEvent, Handler } from "aws-lambda";

type Vocabulary = {
	[key: string]: string[]; // Add index signature
};

type ResultType = {
	[key: string]: number; // Add index signature
};

const vocabulary: Vocabulary = {
	noun: ["cat", "book", "table", "house", "dog", "car", "tree", "bird", "friend", "city", "computer", "chair", "sun", "flower", "music"],
	verb: ["run", "eat", "sleep", "dance", "sing", "swim", "write", "read", "play", "talk", "work", "study", "drive", "think", "create", "listen"],
	adjective: ["happy", "big", "beautiful", "small", "tall", "smart", "funny", "kind", "loud", "quiet", "clever", "brave", "friendly", "patient"],
	adverb: ["quickly", "eagerly", "silently", "happily", "slowly", "carefully", "loudly", "sharply", "softly", "quietly", "easily", "kindly"],
	preposition: ["in", "on", "at", "above", "below", "behind", "beside", "between", "under", "over", "across", "through", "into", "onto"],
	conjunction: ["and", "but", "or", "nor", "so", "yet", "for", "while", "although", "because", "if", "unless", "since", "when", "where"],
	pronoun: ["he", "she", "they", "we", "it", "I", "you", "me", "him", "her", "us", "them", "myself", "yourself", "himself", "herself", "itself"],
	interjection: ["wow", "ouch", "oops", "yay", "hurray", "bravo", "oh", "ah", "uh", "yikes", "yeah", "yes", "no", "uh-huh", "hmm", "oh"],
	determiner: ["the", "a", "this", "that", "these", "those", "my", "your", "his", "her", "its", "our", "their", "an", "any", "some", "all"],
	numeral: ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen"]
};

export const handler: Handler = async (
	event: APIGatewayEvent,
	context: Context
): Promise<any> => {
	let words = event.body?.split(' ');

	let res: ResultType = {}
	for (let word of words!) {
		for (let type in vocabulary) {
			if (vocabulary[type as keyof Vocabulary].includes(word)) {
				res[type] = (res[type] ?? 0) + 1;
			}
		}
	}

	return {
		statusCode: 200,
		body: JSON.stringify(res),
	};
};
