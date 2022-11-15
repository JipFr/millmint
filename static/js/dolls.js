const palette = ["#A74553", "#494DCB", "#8C533C", "#D99E52", "#8F9A6B", "#000"];
const dataUrls = {};
const imgs = {};
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
let delayGeneration = 2e3;
let groupColors = {};
let dollAssets = [];
let uniqueGroups = [...new Set(dollAssets.map((t) => t.group))];
let currentGroup;
let gender = "f";
let redrawDebounce;
let colorDebounce;
let maskCounter = 0;

// Set download label
if (!isSafari) {
	document
		.querySelectorAll(".download-link .text")
		.forEach((span) => (span.textContent = "Download Image"));
}

// Base doll
const groupSelections = {
	skintone: ["1a"],
	face: ["Zelda"],
	shoes: ["Sandals"],
	bottoms: ["Pleated skirt"],
	jumper: ["Color jumper"],
	socks: ["Folded socks"],
	top: ["Pleated shirt"],
	hair: ["Bluey"],
};

// All groups
const groups = {
	background: {
		label: "Background",
		icon: "🌲",
		noColor: true,
	},
	skintone: {
		label: "Skin tone",
		icon: "🎨",
		forceOne: true,
		noColor: true,
	},
	shirt: {
		label: "Shirts",
		icon: "V",
	},
	outerwear: {
		label: "Outerwear",
		icon: "🧥",
	},
	bottoms: {
		label: "Bottoms",
		icon: "👖",
	},
	top: {
		label: "Shirts",
		icon: "👚",
	},
	socks: {
		label: "Socks",
		icon: "🧦",
	},
	shoes: {
		label: "Shoes",
		icon: "👞",
	},
	hair: {
		label: "Hair",
		icon: "✂️",
	},
	face: {
		label: "Face",
		icon: "☺️",
		forceOne: true,
		noColor: true,
	},
	accessories: {
		label: "Accessories",
		icon: "👒",
		multiple: true,
	},
	jumper: {
		label: "Jumpers",
		icon: "🧣",
	},
	outfits: {
		label: "Outfits",
		icon: "👗",
	},
};

function defineAssets() {
	dollAssets = [
		{
			group: "background",
			name: "Beach",
			layers: [
				{
					layer: 1,
					img: img("/doll-assets/bg/beach.jpg"),
				},
			],
		},
		{
			group: "background",
			name: "Country",
			layers: [
				{
					layer: 1,
					img: img("/doll-assets/bg/country.jpg"),
				},
			],
		},
		{
			group: "skintone",
			name: "1a",
			layers: [
				{
					layer: 10,
					img: maskImg("/doll-assets/f/1.figure/1a/"),
					gender: "f",
				},
			],
		},
		{
			group: "skintone",
			name: "1b",
			layers: [
				{
					layer: 10,
					img: maskImg("/doll-assets/f/1.figure/1b/"),
					gender: "f",
				},
			],
		},
		{
			group: "skintone",
			name: "1c",
			layers: [
				{
					layer: 10,
					img: maskImg("/doll-assets/f/1.figure/1c/"),
					gender: "f",
				},
			],
		},
		{
			group: "face",
			name: "Zelda",
			layers: [
				{
					layer: 11,
					img: maskImg("/doll-assets/f/2.face/2a/"),
					gender: "f",
				},
			],
		},
		{
			group: "face",
			name: "Cobian",
			layers: [
				{
					layer: 11,
					img: maskImg("/doll-assets/f/2.face/2b/"),
					gender: "f",
				},
			],
		},
		{
			group: "face",
			name: "Mora",
			layers: [
				{
					layer: 11,
					img: maskImg("/doll-assets/f/2.face/2c/"),
					gender: "f",
				},
			],
		},
		{
			group: "face",
			name: "Tzafi",
			layers: [
				{
					layer: 11,
					img: maskImg("/doll-assets/f/2.face/2d/"),
					gender: "f",
				},
			],
		},
		{
			group: "face",
			name: "Gemma",
			layers: [
				{
					layer: 11,
					img: maskImg("/doll-assets/f/2.face/2e/"),
					gender: "f",
				},
			],
		},
		{
			group: "face",
			name: "Vo",
			layers: [
				{
					layer: 11,
					img: maskImg("/doll-assets/f/2.face/2f/"),
					gender: "f",
				},
			],
		},
		{
			group: "face",
			name: "Zhi",
			layers: [
				{
					layer: 11,
					img: maskImg("/doll-assets/f/2.face/2g/"),
					gender: "f",
				},
			],
		},
		{
			group: "hair",
			name: "Bluey",
			layers: [
				{
					layer: 12,
					img: maskImg("/doll-assets/f/3.hair/3a/"),
					gender: "f",
				},
			],
		},
		{
			group: "hair",
			name: "Prim",
			layers: [
				{
					layer: 12,
					img: maskImg("/doll-assets/f/3.hair/3b/"),
					gender: "f",
				},
			],
		},
		{
			group: "hair",
			name: "Curly",
			layers: [
				{
					layer: 12,
					img: maskImg("/doll-assets/f/3.hair/3c/"),
					gender: "f",
				},
			],
		},
		{
			group: "hair",
			name: "Braids",
			layers: [
				{
					layer: 12,
					img: maskImg("/doll-assets/f/3.hair/3d/"),
					gender: "f",
				},
			],
		},
		{
			group: "hair",
			name: "Clipped",
			layers: [
				{
					layer: 12,
					img: maskImg("/doll-assets/f/3.hair/3e/"),
					gender: "f",
				},
			],
		},
		{
			group: "hair",
			name: "Alternative",
			layers: [
				{
					layer: 12,
					img: maskImg("/doll-assets/f/3.hair/3f/"),
					gender: "f",
				},
			],
		},
		{
			group: "hair",
			name: "Locks",
			layers: [
				{
					layer: 12,
					img: maskImg("/doll-assets/f/3.hair/3g/"),
					gender: "f",
				},
			],
		},
		{
			group: "hair",
			name: "Princeling",
			layers: [
				{
					layer: 12,
					img: maskImg("/doll-assets/f/3.hair/3h/"),
					gender: "f",
				},
			],
		},
		{
			group: "socks",
			name: "Folded socks",
			layers: [
				{
					layer: 13,
					img: maskImg("/doll-assets/f/4.socks/4a/"),
					gender: "f",
				},
			],
		},
		{
			group: "socks",
			name: "Athletic socks",
			layers: [
				{
					layer: 13,
					img: maskImg("/doll-assets/f/4.socks/4b/"),
					gender: "f",
				},
			],
		},
		{
			group: "socks",
			name: "Everyday socks",
			layers: [
				{
					layer: 13,
					img: maskImg("/doll-assets/f/4.socks/4c/"),
					gender: "f",
				},
			],
		},
		{
			group: "socks",
			name: "Knee Socks",
			layers: [
				{
					layer: 13,
					img: maskImg("/doll-assets/f/4.socks/4d/"),
					gender: "f",
				},
			],
		},
		{
			group: "socks",
			name: "Nylon Socks",
			layers: [
				{
					layer: 13,
					img: maskImg("/doll-assets/f/4.socks/4e/"),
					gender: "f",
				},
			],
		},
		{
			group: "socks",
			name: "Nylons",
			layers: [
				{
					layer: 13,
					img: maskImg("/doll-assets/f/4.socks/4f/"),
					gender: "f",
				},
			],
		},
		{
			group: "shoes",
			name: "Penny loafers",
			layers: [
				{
					layer: 14,
					img: maskImg("/doll-assets/f/5.shoes/5a/"),
					gender: "f",
				},
			],
		},
		{
			group: "shoes",
			name: "Sandals",
			layers: [
				{
					layer: 14,
					img: maskImg("/doll-assets/f/5.shoes/5b/"),
					gender: "f",
				},
				{
					layer: 2,
					img: img("/doll-assets/f/0.bg/mask.5b.bg.png"),
					gender: "f",
				},
			],
		},
		{
			group: "shoes",
			name: "Strap shoes",
			layers: [
				{
					layer: 14,
					img: maskImg("/doll-assets/f/5.shoes/5c/"),
					gender: "f",
				},
			],
		},
		{
			group: "shoes",
			name: "Trainers",
			layers: [
				{
					layer: 14,
					img: maskImg("/doll-assets/f/5.shoes/5d/"),
					gender: "f",
				},
			],
		},
		{
			group: "shoes",
			name: "School Shoes",
			layers: [
				{
					layer: 14,
					img: maskImg("/doll-assets/f/5.shoes/5e/"),
					gender: "f",
				},
			],
		},
		{
			group: "shoes",
			name: "Nurse Shoes",
			layers: [
				{
					layer: 14,
					img: maskImg("/doll-assets/f/5.shoes/5f/"),
					gender: "f",
				},
			],
		},
		{
			group: "bottoms",
			name: "Pleated skirt",
			layers: [
				{
					layer: 15,
					img: maskImg("/doll-assets/f/6.bottom/6a/"),
					gender: "f",
				},
			],
		},
		{
			group: "bottoms",
			name: "Trousers",
			layers: [
				{
					layer: 15,
					img: maskImg("/doll-assets/f/6.bottom/6b/"),
					gender: "f",
				},
			],
		},
		{
			group: "bottoms",
			name: "Pencil skirt",
			layers: [
				{
					layer: 15,
					img: maskImg("/doll-assets/f/6.bottom/6c/"),
					gender: "f",
				},
			],
		},
		{
			group: "bottoms",
			name: "Shorts",
			layers: [
				{
					layer: 15,
					img: maskImg("/doll-assets/f/6.bottom/6d/"),
					gender: "f",
				},
			],
		},
		{
			group: "bottoms",
			name: "Short Trousers",
			layers: [
				{
					layer: 15,
					img: maskImg("/doll-assets/f/6.bottom/6e/"),
					gender: "f",
				},
			],
		},
		{
			group: "bottoms",
			name: "Rouisha Pants",
			layers: [
				{
					layer: 15,
					img: maskImg("/doll-assets/f/6.bottom/6f/"),
					gender: "f",
				},
			],
		},
		{
			group: "top",
			name: "Pleated shirt",
			layers: [
				{
					layer: 16,
					img: maskImg("/doll-assets/f/7.top/7a/"),
					gender: "f",
				},
			],
		},
		{
			group: "top",
			name: "Prissy Shirt",
			layers: [
				{
					layer: 16,
					img: maskImg("/doll-assets/f/7.top/7b/"),
					gender: "f",
				},
			],
		},
		{
			group: "top",
			name: "Tee Shirt",
			layers: [
				{
					layer: 16,
					img: maskImg("/doll-assets/f/7.top/7c/"),
					gender: "f",
				},
			],
		},
		{
			group: "top",
			name: "Hanfu shirt",
			layers: [
				{
					layer: 16,
					img: maskImg("/doll-assets/f/7.top/7d/"),
					gender: "f",
				},
			],
		},
		{
			group: "outfits",
			name: "Gymslip",
			layers: [
				{
					layer: 20,
					img: maskImg("/doll-assets/f/8.outfits/8a/"),
					gender: "f",
				},
			],
		},
		{
			group: "outfits",
			name: "Nurse Uniform",
			layers: [
				{
					layer: 21,
					img: maskImg("/doll-assets/f/8.outfits/8b/", undefined, "maskb"),
					gender: "f",
				},
				{
					layer: 20,
					img: maskImg(
						"/doll-assets/f/8.outfits/8b/",
						undefined,
						"maska",
						true
					),
					gender: "f",
					noColor: true,
				},
			],
		},
		{
			group: "jumper",
			name: "Jumper",
			layers: [
				{
					layer: 21.1,
					img: maskImg("/doll-assets/f/9.jumpers/9a/"),
					gender: "f",
				},
			],
		},
		{
			group: "jumper",
			name: "Revolutionary Coat",
			layers: [
				{
					layer: 21,
					img: maskImg("/doll-assets/f/9.jumpers/9b/"),
					gender: "f",
				},
			],
		},
		{
			group: "accessories",
			name: "Spectacles",
			noColor: true,
			layers: [
				{
					layer: 22,
					img: maskImg("/doll-assets/f/10.accessories/10a/", undefined, null),
					gender: "f",
				},
			],
		},
		{
			group: "accessories",
			name: "School Armband",
			noColor: true,
			layers: [
				{
					layer: 22,
					img: maskImg("/doll-assets/f/10.accessories/10b/"),
					gender: "f",
				},
			],
		},
		{
			group: "accessories",
			name: "School Beret",
			layers: [
				{
					layer: 22,
					img: maskImg("/doll-assets/f/10.accessories/10c/"),
					gender: "f",
				},
			],
		},
		{
			group: "accessories",
			name: "School Tie",
			layers: [
				{
					layer: 17,
					img: maskImg("/doll-assets/f/10.accessories/10d/"),
					gender: "f",
				},
			],
		},
		{
			group: "accessories",
			name: "Red Tie",
			layers: [
				{
					layer: 17,
					img: maskImg("/doll-assets/f/10.accessories/10e/"),
					gender: "f",
				},
			],
		},
		{
			group: "accessories",
			name: "Girls' Tie",
			layers: [
				{
					layer: 17,
					img: maskImg("/doll-assets/f/10.accessories/10f/"),
					gender: "f",
				},
			],
		},
		{
			group: "accessories",
			name: "School Badge",
			layers: [
				{
					layer: 17,
					img: maskImg("/doll-assets/f/10.accessories/10g/"),
					gender: "f",
				},
			],
		},
		{
			group: "accessories",
			name: "Red Guard Hat",
			layers: [
				{
					layer: 17,
					img: maskImg("/doll-assets/f/10.accessories/10h/"),
					gender: "f",
				},
			],
		},
	];
	uniqueGroups = [...new Set(dollAssets.map((t) => t.group))];
	if (!currentGroup) currentGroup = uniqueGroups[0];
}

function renderNav() {
	// Populate navigation
	const nav = document.querySelector(".dolls-nav");
	nav.querySelector(".nav-inner").innerHTML = "";

	for (const groupName of uniqueGroups) {
		// Create new node
		const el = document
			.importNode(
				document.querySelector(".dolls-nav-item-template").content,
				true
			)
			.querySelector("*");

		// Provide labels
		const group = groups[groupName];

		el.querySelector(".text").textContent = group?.label ?? groupId;
		if (group?.icon) el.querySelector(".icon").textContent = group.icon;

		// Add event listeners
		el.addEventListener("click", () => {
			currentGroup = groupName;
			dollsMain();
		});

		// Add active class
		if (groupName === currentGroup) el.classList.add("active");
		nav.querySelector(".nav-inner").appendChild(el);
	}

	// Set tab title
	document.querySelector(".current-page").innerText =
		groups[currentGroup]?.label ?? currentGroup;

	// Determine active states for next/previous buttons
	const currentIndex = uniqueGroups.indexOf(currentGroup);
	document
		.querySelector(".nav-nav-button.nav-previous")
		.classList[currentIndex > 0 ? "remove" : "add"]("disabled");
	document
		.querySelector(".nav-nav-button.nav-next")
		.classList[currentIndex < uniqueGroups.length - 1 ? "remove" : "add"](
			"disabled"
		);

	// Draw colors
	const colorWrapper = document.querySelector(".color-options");
	colorWrapper.classList.remove("color-hidden");
	colorWrapper
		.querySelectorAll(".color-circle[style]")
		.forEach((el) => el.remove());
	document.querySelector(".reset-circle").classList.remove("active");

	// Add a circle for each color
	for (const color of palette) {
		const circle = document.createElement("div");
		circle.classList.add("color-circle");
		circle.setAttribute("style", `--color: ${color}`);

		circle.addEventListener("click", () => {
			setColor(color);
		});

		if (groupColors[currentGroup] === color) {
			circle.classList.add("active");
		}

		colorWrapper.appendChild(circle);
	}

	// Add it to the reset button if there isn't an active color
	if (!colorWrapper.querySelector(".active"))
		document.querySelector(".reset-circle").classList.add("active");

	// Check if the color editor should be visible
	if (groups[currentGroup]?.noColor) colorWrapper.classList.add("color-hidden");
}

function nextNav() {
	let newIndex = uniqueGroups.indexOf(currentGroup) + 1;
	if (uniqueGroups[newIndex]) {
		currentGroup = uniqueGroups[newIndex];
		dollsMain();
	}
}

function previousNav() {
	let newIndex = uniqueGroups.indexOf(currentGroup) - 1;
	if (uniqueGroups[newIndex]) {
		currentGroup = uniqueGroups[newIndex];
		dollsMain();
	}
}

function setColor(color) {
	groupColors[currentGroup] = color;
	if (color === null) delete groupColors[currentGroup];
	renderNav();

	// Update visible components
	if (groupSelections[currentGroup]) {
		for (const assetName of groupSelections[currentGroup]) {
			setMaskColor(assetName, color);
		}
	}

	updateColors();
}

function updateColors() {
	if (colorDebounce) clearTimeout(colorDebounce);

	colorDebounce = setTimeout(() => {
		for (const asset of dollAssets) {
			const color = groupColors[asset.group] || undefined;
			setMaskColor(asset.name, color);
		}
		drawCharacter();
	}, 100);
}

function setMaskColor(name = "Color jumper", newColor, layer = 0) {
	const item = dollAssets.find((a) => a.name === name);
	if (item) item.layers[layer]?.img?.setColor?.(newColor);
}

function renderOptions() {
	const wrapper = document.querySelector(".doll-options");
	wrapper.innerHTML = "";

	const assetsInGroup = dollAssets.filter(
		(asset) => asset.group === currentGroup
	);
	for (const asset of assetsInGroup) {
		// TODO: turn this into a nice template :)
		const div = document.createElement("div");
		div.classList.add("doll-option");

		// Add active class if appropriate
		if (groupSelections[asset.group]?.includes?.(asset.name))
			div.classList.add("active");

		// Add content
		div.innerText = asset.name;

		// Add click event
		div.addEventListener("click", () => {
			// Depending on whether the group allows multiple or not,
			// add or remove it from the list, or set the list to be the single item
			const group = groups[asset.group];
			if (!groupSelections[asset.group]) groupSelections[asset.group] = [];

			// TODO: clean this up
			if (group?.multiple) {
				if (groupSelections[asset.group].includes(asset.name)) {
					groupSelections[asset.group] = groupSelections[asset.group].filter(
						(a) => a !== asset.name
					);
				} else {
					groupSelections[asset.group].push(asset.name);
				}
			} else {
				if (
					groupSelections[asset.group].length === 1 &&
					groupSelections[asset.group][0] === asset.name &&
					!group?.forceOne
				)
					groupSelections[asset.group] = [];
				else groupSelections[asset.group] = [asset.name];
			}

			document.querySelector(".dolls-download-stuff").classList.add("hidden");

			dollsMain(true);
		});

		wrapper.appendChild(div);
	}
}

function drawCharacter() {
	render();
}

function regenerateDollImage() {
	// delayGeneration += 2e3;
	generateDollImage(false);
}

function generateDollImage(resetTimer = true) {
	if (resetTimer) delayGeneration = 2e3;

	render();

	const downloadText = document.querySelectorAll(".download-link .text");
	for (const text of downloadText) {
		text.innerText = "Working...";
	}

	const svg = document.querySelector(".dolls-canvas-inner svg").outerHTML;

	const l = document.createElement("div");
	l.outerHTML = svg.outerHTML;
	l.querySelector('[href]').forEach(el => el.href)

	const data = encodeURIComponent(svg);
	const url = "data:image/svg+xml;utf8," + data;

	const image = document.createElement("img");
	image.src = url;
	document.querySelector(".content").appendChild(image);
	img.width = 1000;
	img.height = 1500;

	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	canvas.width = 1000;
	canvas.height = 1500;

	document.querySelector(".content").appendChild(canvas);

	image.addEventListener("load", () => {
		ctx.drawImage(image, 0, 0);
	});

	// if (isSafari)
	// 	document.querySelector(".dolls-download-stuff").classList.remove("hidden");

	// // Make "canvas" super wide, download image
	// requestAnimationFrame(() => {

	// 	const opts = {
	// 		width: node.clientWidth * scale,
	// 		height: node.clientHeight * scale,
	// 		style: {
	// 			transform: "scale(" + scale + ")",
	// 			transformOrigin: "top left",
	// 		},
	// 	};

	// 	document.querySelectorAll(".lol").forEach((t) => t.remove());

	// 	htmlToImage.getImage(node, opts).then(async (img) => {
	// 		img.width = opts.width;
	// 		img.height = opts.height;
	// 		img.classList.add("html-to-image-svg");

	// 		const canvas = document.createElement("canvas");
	// 		const ctx = canvas.getContext("2d");

	// 		canvas.width = opts.width;
	// 		canvas.height = opts.height;

	// 		ctx.drawImage(img, 0, 0, opts.width, opts.height);

	// 		const container = document.querySelector(".doll-img-container");
	// 		container.innerHTML = "";

	// 		if (isSafari) {
	// 			container.appendChild(canvas);
	// 			window.scrollTo(0, 1000);
	// 		} else {
	// 			downloadDollImage(canvas);
	// 		}

	// 		img.style.minWidth = "auto";

	// 		// Reset button label
	// 		for (const text of downloadText) {
	// 			text.innerText = isSafari
	// 				? text.parentNode.getAttribute("data-text")
	// 				: "Download Image";
	// 		}
	// 	});

	// 	document.querySelector(".dolls-canvas").removeAttribute("style");
	// });
}

function downloadDollImage(
	canvas = document.querySelector(".doll-img-container canvas")
) {
	// Download image
	const a = document.createElement("a");
	a.href = canvas.toDataURL();
	a.download = "Character.png";
	a.click();
}

function getLayers() {
	const layers = Object.entries(groupSelections)
		.flatMap(([group, itemNames]) => {
			const allItems = dollAssets.filter(
				(asset) => asset.group === group && itemNames.includes(asset.name)
			);
			return allItems.flatMap((t) =>
				t.layers.map((layer) => {
					return {
						...layer,
						...t,
						layers: undefined,
					};
				})
			);
		})
		.filter(Boolean)
		.sort((a, b) => a.layer - b.layer);

	return layers;
}

function render() {
	// Find all layers for every single selected asset and sort them by their z-index
	const allLayers = getLayers();

	maskCounter = 0;

	// Clear "canvas"
	const wrapper = document.querySelector(".dolls-canvas-inner");
	wrapper.innerHTML = "";

	// Create SVG
	const svg = document.createElement("svg");
	svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	svg.setAttribute("width", "100%");
	svg.setAttribute("height", "100%");

	// Draw all layers
	for (const asset of allLayers) {
		const layer = document.createElementNS("http://www.w3.org/2000/svg", "g");
		layer.classList.add("layer");

		const layers = asset.img.layers ? asset.img.layers : [asset.img];

		for (const img of layers) {
			if (groupColors[asset.group] && !img.noColor) {
				// Mask
				const mask = document.createElementNS(
					"http://www.w3.org/2000/svg",
					"mask"
				);
				const rid = "mask-" + ++maskCounter;
				mask.id = rid;
				mask.setAttribute("mask-type", "alpha");

				// Image inside mask
				const image = document.createElementNS(
					"http://www.w3.org/2000/svg",
					"image"
				);
				image.setAttribute("href", img.src);
				image.setAttribute("width", "100%");
				image.setAttribute("height", "100%");

				mask.appendChild(image);

				// Rect
				const rect = document.createElementNS(
					"http://www.w3.org/2000/svg",
					"rect"
				);
				rect.setAttribute("width", "100%");
				rect.setAttribute("height", "100%");
				rect.setAttribute("x", "0");
				rect.setAttribute("y", "0");
				rect.setAttribute("fill", groupColors[asset.group]);
				rect.setAttribute("mask", `url(#${rid})`);

				// Append mask and rect
				layer.appendChild(mask);
				layer.appendChild(rect);
			} else {
				const image = document.createElementNS(
					"http://www.w3.org/2000/svg",
					"image"
				);
				image.setAttribute("href", img.src);

				image.setAttribute("x", 0);
				image.setAttribute("y", 0);
				image.setAttribute("width", "100%");
				image.setAttribute("height", "100%");

				layer.appendChild(image);
			}
		}

		svg.appendChild(layer);
	}
	wrapper.appendChild(svg);
	wrapper.innerHTML += ""; // lmao what the fuck
}

function getDataUrl(img) {
	if (dataUrls[img.src]) return dataUrls[img.src];
	// Get data URL from image
	const canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;

	const ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0);

	const dataUrl = canvas.toDataURL();
	dataUrls[img.src] = dataUrl;

	// Clean up canvas
	canvas.width = 1;
	canvas.height = 1;
	ctx.clearRect(0, 0, 1, 1);

	return dataUrl;
}

function dollsMain(redraw = true) {
	renderNav();
	renderOptions();
	if (redraw) drawCharacter();
}

function maskImg(path, mask, maskName = "mask", noColor = false) {
	path = `${path}${path.endsWith("/") ? "" : "/"}`;

	const layers = [];
	if (maskName) layers.push(img(`${path}${maskName}.png`, noColor));
	layers.push(img(`${path}outline.png`));

	return {
		layers,
		mask,
		setColor(t) {
			this.mask = t;
		},
	};
}

function img(src, noColor = true) {
	if (imgs[src]) return imgs[src];
	const img = new Image();
	img.src = src;
	img.setAttribute("no-color", noColor);
	img.noColor = noColor;

	imgs[src] = img;

	return imgs[src];
}

function promiseify(img) {
	return new Promise((resolve) => {
		if (img.complete && img.src) resolve(img);
		img.addEventListener("load", () => {
			resolve(img);
		});
	});
}

window.addEventListener("load", () => {
	defineAssets();
	dollsMain();
});
