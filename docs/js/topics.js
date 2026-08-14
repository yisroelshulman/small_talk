new_line = '0';
chars_single = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
chars_double = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '<', '=', '>', '?', '@'];
const result_count = 10;
const lines = blob.split(new_line);
const rand = autoSeededLcg();

function autoSeededLcg() {
	const milliInDay = 24 * 60 * 60 * 1000;
	const seedDay = Math.floor((Date.now() - 5 * 60 * 60 * 1000) / milliInDay);
	let x = seedDay
	return function (min, max) {
		const mod = 2147483648;
		x = (1103515245 * x + 12345) % mod;
		return Math.floor(min + ((x / mod) * max));
	};
}

function decode(line) {
	const topic = [];
	var i = 0;
	while (i < line.length) {
		i++;
		if (chars_single.includes(line[i - 1])) {
			topic.push(words[chars_single.indexOf(line[i - 1])]);
			continue;
		}
		i++;
		first = chars_double.indexOf(line[i - 2]);
		second = 0;
		if (chars_single.includes(line[i - 1])) {
			second = chars_single.indexOf(line[i - 1]);
		} else {
			second = chars_double.indexOf(line[i - 1]) + chars_single.length;
		}
		topic.push(words[(first * (chars_single.length + chars_double.length)) + second + chars_single.length]);
	}
	return [topic[0], topic.slice(1).join(" ") + '?'];
}

function getTopics() {
	const result = [];

	while (result.length < 10) {
		index = rand(0, lines.length);
		if (!result.includes(index)) {
			result.push(index);
		}
	}

	const topics = [];
	result.forEach(val => {
		topics.push(decode(lines[val]));
	});

	return topics;
}

function addTopics() {
	t = getTopics();
	const topicsList = document.getElementById('topicsList');
	t.forEach(elem => {
		const topic = document.createElement('li');
		topic.classList.add("topics-list-elem");

		const div1 = document.createElement('div');
		div1.classList.add("topics-list-elem");
		div1.classList.add("topic");
		div1.textContent = elem[0];

		const div2 = document.createElement('div');
		div2.classList.add("topics-list-elem");
		div2.classList.add("prompt");
		div2.textContent = elem[1];

		topic.append(div1, div2);
		topicsList.appendChild(topic);
	});

	const rTopic = decode(lines[Math.floor(Math.random() * lines.length)]);

	const randTopic = document.createElement('li');
	randTopic.classList.add("topics-list-elem");
	randTopic.classList.add("random");
	randTopic.id = 'rand';

	const rdiv1 = document.createElement('div');
	rdiv1.classList.add("topics-list-elem");
	rdiv1.classList.add("topic");
	rdiv1.textContent = rTopic[0];

	const rdiv2 = document.createElement('div');
	rdiv2.classList.add("topics-list-elem");
	rdiv2.classList.add("prompt");
	rdiv2.textContent = rTopic[1];

	const button = document.createElement('button');
	button.className = 'refresh-button';
	button.textContent = 'new topic';
	button.addEventListener('click', (e) => {
		newTopic();
	});

	randTopic.append(button);
	randTopic.append(rdiv1, rdiv2);
	topicsList.appendChild(randTopic);
}

function newTopic() {
	const rTopic = decode(lines[Math.floor(Math.random() * lines.length)]);
	const randTopic = document.getElementById('rand');
	const left = randTopic.querySelector('.topic');
	left.textContent = rTopic[0];
	const right = randTopic.querySelector('.prompt');
	right.textContent = rTopic[1];
}

document.addEventListener("DOMContentLoaded", addTopics());
