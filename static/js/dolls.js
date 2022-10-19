const imgs = {};
let dollAssets = [];
let uniqueGroups = [...new Set(dollAssets.map((t) => t.group))];
let currentGroup;
let gender = "f";
let redrawDebounce;

// Base doll
const groupSelections = {
	skintone: ["1a"],
	face: ["Zelda"],
	shoes: ["Sandals"],
	bottoms: ["Pleated skirt"],
	socks: ["Folded socks"],
	top: ["Pleated shirt"],
	hair: ["Bluey"],
};

// All groups
const groups = {
	figure: {
		label: "Figure",
		emoji: "W",
	},
	background: {
		label: "Background",
		emoji: "v",
	},
	skintone: {
		label: "Skin tone",
		emoji: "←",
		forceOne: true,
	},
	shirt: {
		label: "Shirts",
		emoji: "V",
	},
	outerwear: {
		label: "Outerwear",
		emoji: "X",
	},
	bottoms: {
		label: "Bottoms",
		emoji: "M",
	},
	top: {
		label: "Shirts",
		emoji: "B",
	},
	socks: {
		label: "Socks",
		emoji: "P",
	},
	shoes: {
		label: "Shoes",
		emoji: "y",
	},
	hair: {
		label: "Hair",
		emoji: "h",
	},
	face: {
		label: "Face",
		emoji: "H",
		forceOne: true,
	},
	accessories: {
		label: "Accessories",
		emoji: "U",
		multiple: true,
	},
	jumper: {
		label: "Jumpers",
		emoji: "T",
	},
	outfits: {
		label: "Outfits",
		emoji: "j",
	},
};

function defineAssets() {
	dollAssets = [
		{
			group: "skintone",
			name: "1a",
			layers: [
				{
					layer: 10,
					img: img("/doll-assets/f/1.figure/1a.png"),
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
					img: img("/doll-assets/f/1.figure/1b.png"),
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
					img: img("/doll-assets/f/1.figure/1c.png"),
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
					img: img("/doll-assets/f/2.face/2a.png"),
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
					img: img("/doll-assets/f/2.face/2b.png"),
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
					img: img("/doll-assets/f/2.face/2c.png"),
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
					img: img("/doll-assets/f/2.face/2d.png"),
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
					img: img("/doll-assets/f/2.face/2e.png"),
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
					img: img("/doll-assets/f/2.face/2f.png"),
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
					img: img("/doll-assets/f/3.hair/3a.png"),
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
					img: img("/doll-assets/f/3.hair/3b.png"),
					gender: "f",
				},
			],
		},
		{
			group: "hair",
			name: "Pink hair",
			layers: [
				{
					layer: 12,
					img: maskImg("/doll-assets/f/3.hair/3d/", "pink"),
					gender: "f",
				},
			],
		},
		{
			group: "hair",
			name: "Green hair",
			layers: [
				{
					layer: 12,
					img: maskImg("/doll-assets/f/3.hair/3d/", "green"),
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
					img: img("/doll-assets/f/3.hair/3c.png"),
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
					img: img("/doll-assets/f/4.socks/4a.png"),
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
					img: img("/doll-assets/f/4.socks/4b.png"),
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
					img: img("/doll-assets/f/4.socks/4c.png"),
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
					img: img("/doll-assets/f/4.socks/4d.png"),
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
					img: img("/doll-assets/f/5.shoes/5a.png"),
					gender: "f",
				},
			],
		},
		{
			group: "shoes",
			name: "Sandals",
			layers: [
				{
					layer: 0,
					img: img("/doll-assets/f/0.bg/5b.bg.png"),
					gender: "f",
				},
				{
					layer: 14,
					img: img("/doll-assets/f/5.shoes/5b.png"),
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
					img: img("/doll-assets/f/5.shoes/5c.png"),
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
					img: img("/doll-assets/f/5.shoes/5d.png"),
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
					img: img("/doll-assets/f/5.shoes/5e.png"),
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
					img: img("/doll-assets/f/5.shoes/5f.png"),
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
					img: img("/doll-assets/f/6.bottom/6a.png"),
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
					img: img("/doll-assets/f/6.bottom/6b.png"),
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
					img: img("/doll-assets/f/6.bottom/6c.png"),
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
					img: img("/doll-assets/f/6.bottom/6d.png"),
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
					img: img("/doll-assets/f/6.bottom/6e.png"),
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
					img: img("/doll-assets/f/7.top/7a.png"),
					gender: "f",
				},
			],
		},
		{
			group: "top",
			name: "Prissy shirt",
			layers: [
				{
					layer: 16,
					img: img("/doll-assets/f/7.top/7b.png"),
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
					img: img("/doll-assets/f/8.outfits/8a.png"),
					gender: "f",
				},
			],
		},
		{
			group: "outfits",
			name: "Nurse Uniform",
			layers: [
				{
					layer: 20,
					img: img("/doll-assets/f/8.outfits/8b.png"),
					gender: "f",
				},
			],
		},
		{
			group: "jumper",
			name: "Jumper",
			layers: [
				{
					layer: 21,
					img: img("/doll-assets/f/9.jumpers/9a.png"),
					gender: "f",
				},
			],
		},
		{
			group: "accessories",
			name: "Spectacles",
			layers: [
				{
					layer: 22,
					img: img("/doll-assets/f/10.accessories/10a.png"),
					gender: "f",
				},
			],
		},
		{
			group: "accessories",
			name: "School Armband",
			layers: [
				{
					layer: 22,
					img: img("/doll-assets/f/10.accessories/10b.png"),
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
					img: img("/doll-assets/f/10.accessories/10c.png"),
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
					img: img("/doll-assets/f/10.accessories/10d.png"),
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
					img: img("/doll-assets/f/10.accessories/10e.png"),
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
					img: img("/doll-assets/f/10.accessories/10f.png"),
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
					img: img("/doll-assets/f/10.accessories/10g.png"),
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
	nav.innerHTML = "";
	for (const groupId of uniqueGroups) {
		// Create new node
		const el = document
			.importNode(
				document.querySelector(".dolls-nav-item-template").content,
				true
			)
			.querySelector("*");

		// Provide labels
		const group = groups[groupId];

		el.querySelector(".text").textContent = group?.label ?? groupId;
		if (group?.emoji) el.querySelector(".doll-emoji").textContent = group.emoji;

		// Add event listeners
		el.addEventListener("click", () => {
			currentGroup = groupId;
			dollsMain(false);
		});

		// Add active class
		if (groupId === currentGroup) el.classList.add("active");
		nav.appendChild(el);
	}
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
		div.innerHTML = `<!--<img src="https://c.tenor.com/jQfmNt7bNyoAAAAd/squirrel.gif">--><span>${asset.name}</span>`;

		// Add click event
		div.addEventListener("click", () => {
			// Depending on whether the group allows multiple or not,
			// add or remove it from the list, or set the list to be the single item
			const group = groups[asset.group];
			if (!groupSelections[asset.group]) groupSelections[asset.group] = [];

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
			dollsMain(true);
		});

		wrapper.appendChild(div);
	}
}

function drawCharacter() {
	// Real canvas
	const canvas = document.querySelector(".dolls-canvas");
	canvas.width = (canvas.scrollWidth || 230) * 2;
	canvas.height = (canvas.scrollHeight || 690) * 2;
	render(canvas);
}

function downloadDoll() {
	// Download link canvas:
	const downloadableCanvas = document.createElement("canvas");
	const img = dollAssets[0].layers[0].img;
	downloadableCanvas.width = img.full.width / 2;
	downloadableCanvas.height = img.full.height / 2;
	render(downloadableCanvas, true);

	const a = document.createElement("a");
	a.href = downloadableCanvas.toDataURL();
	a.download = "character.png";
	a.click();
}

function render(canvas, fullRes = false) {
	const ctx = canvas.getContext("2d");

	// Find all layers for every single selected asset and sort them by their z-index
	const allLayers = Object.entries(groupSelections)
		.flatMap(([group, itemNames]) => {
			const allItems = dollAssets.filter(
				(asset) => asset.group === group && itemNames.includes(asset.name)
			);
			return allItems.flatMap((t) => t.layers);
		})
		.filter(Boolean)
		.sort((a, b) => a.layer - b.layer);

	// Draw all layers
	for (const layer of allLayers) {
		/// draw the shape we want to use for clipping

		ctx.drawImage(
			layer.img[fullRes ? "full" : "resized"],
			0,
			0,
			canvas.width,
			canvas.height
		);
	}
}

function dollsMain(redraw = true) {
	renderNav();
	renderOptions();
	if (redraw) drawCharacter();
}

function maskImg(path, color = "pink") {
	const outline = img(`${path}/outline.png`);
	const mask = img(`${path}/mask.png`);

	const canvasFull = document.createElement("canvas");
	
	const canvasSmall = document.createElement("canvas");
	canvasSmall.width = (canvasSmall.scrollWidth || 230) * 2;
	canvasSmall.height = (canvasSmall.scrollHeight || 690) * 2;


	Promise.all([promiseify(outline.full), promiseify(mask.full)]).then(() => {
		canvasFull.width = mask.full.width;
		canvasFull.height = mask.full.height;

		maskImgSize(canvasFull, color, outline, mask, true);
		maskImgSize(canvasSmall, color, outline, mask, false);
	});

	return {
		full: canvasFull,
		resized: canvasSmall,
	};
}

function maskImgSize(canvas, color, outline, mask, full) {
	const ctx = canvas.getContext("2d");
	ctx.drawImage(
		mask[full ? "full" : "resized"],
		0,
		0,
		canvas.width,
		canvas.height
	);

	// Draw desired background
	ctx.globalCompositeOperation = "source-in";
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Add outline
	ctx.globalCompositeOperation = "source-over";
	ctx.drawImage(
		outline[full ? "full" : "resized"],
		0,
		0,
		canvas.width,
		canvas.height
	);
}

function img(src) {
	if (imgs[src]) return imgs[src];
	const img = new Image();
	img.src = src;

	const offscreenCanvas = document.createElement("canvas");

	promiseify(img).then(() => {
		console.log("JA");
		// Re-scale image on offscreen canvas for future use
		const canvas = document.querySelector(".dolls-canvas");
		const offscreenCtx = offscreenCanvas.getContext("2d");
		offscreenCanvas.width = canvas.width;
		offscreenCanvas.height = canvas.height;
		offscreenCtx.drawImage(img, 0, 0, canvas.width, canvas.height);

		// Set a debounce for re-drawing after image load
		if (redrawDebounce) clearTimeout(redrawDebounce);
		redrawDebounce = setTimeout(drawCharacter, 100);
	});

	imgs[src] = {
		full: img,
		resized: offscreenCanvas,
	};

	return imgs[src];
}

function promiseify(img) {
	return new Promise((resolve) => {
		if (img.complete) resolve(img);
		img.addEventListener("load", () => {
			resolve(img);
		});
	});
}

// Wait for all images to load, then remove the loading screen and seed the nav and stuff
const allImages = Object.values(imgs);
const promises = allImages.map((img) => {
	return new Promise((resolve) => {
		if (img.loaded) return true;
		img.addEventListener("load", resolve);
	});
});

window.addEventListener("load", () => {
	defineAssets();
	dollsMain();
	document.querySelector(".dolls").classList.add("loaded");
});
