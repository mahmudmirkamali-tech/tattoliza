import { i as __toESM } from "../_runtime.mjs";
import { a as useFrame, c as BufferAttribute, d as Line, f as LineBasicMaterial, g as require_react, h as require_jsx_runtime, i as Canvas, l as BufferGeometry, m as Vector3, n as Float, p as Vector2, r as OrbitControls, t as ContactShadows, u as LatheGeometry } from "../_libs/@react-three/drei+[...].mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Client-ChCEwgBV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function curve(samples, fn) {
	const pts = [];
	for (let i = 0; i <= samples; i++) {
		const [x, y] = fn(i / samples);
		pts.push(new Vector3(x, y, .03));
	}
	return pts;
}
function motifPoints(kind) {
	if (kind === "bloom") return curve(280, (u) => {
		const t = u * Math.PI * 8;
		const r = .11 * Math.abs(Math.sin(4 * t));
		return [Math.cos(t) * r * 1.15, Math.sin(t) * r];
	});
	if (kind === "moon") return curve(160, (u) => {
		const t = Math.PI * .25 + u * Math.PI * 1.35;
		const r = .13;
		return [Math.cos(t) * r, Math.sin(t) * r * 1.05];
	});
	if (kind === "vine") return curve(220, (u) => {
		const y = (u - .5) * .42;
		return [Math.sin(u * Math.PI * 3.2) * .07, y];
	});
	if (kind === "seed") return curve(180, (u) => {
		const t = u * Math.PI * 2;
		const r = .05 + .07 * Math.pow(Math.sin(t / 2), 2);
		return [Math.cos(t) * r * .72, Math.sin(t) * r * 1.25];
	});
	return curve(200, (u) => {
		return [(u - .5) * .42, Math.sin(u * Math.PI * 3) * .06];
	});
}
function lineFrom(kind) {
	return new BufferGeometry().setFromPoints(motifPoints(kind));
}
var MOTIFS = [
	{
		id: "bloom",
		fa: "شکوفه",
		en: "Bloom"
	},
	{
		id: "moon",
		fa: "هلال",
		en: "Crescent"
	},
	{
		id: "vine",
		fa: "تاک",
		en: "Vine"
	},
	{
		id: "seed",
		fa: "دانه",
		en: "Seed"
	},
	{
		id: "wave",
		fa: "موج",
		en: "Wave"
	}
];
var ZONES = [
	{
		id: "collar",
		fa: "ترقوه",
		whisper: "جایی که نفس دیده می‌شود"
	},
	{
		id: "nape",
		fa: "پس‌گردن",
		whisper: "رازی فقط برای خودت"
	},
	{
		id: "rib",
		fa: "پهلو",
		whisper: "زیر پارچه، کنار قلب"
	},
	{
		id: "wrist",
		fa: "مچ",
		whisper: "خطی که هر روز می‌بینی"
	},
	{
		id: "ankle",
		fa: "مچ پا",
		whisper: "قدمی که سبک‌تر می‌شود"
	}
];
var KEY = "mehrkhat-bookings";
var useAtelier = create((set, get) => ({
	entered: false,
	motif: "bloom",
	zone: "collar",
	stitch: 0,
	panel: "loom",
	name: "",
	handle: "",
	note: "",
	enter: () => set({
		entered: true,
		stitch: 1
	}),
	setMotif: (motif) => set({
		motif,
		stitch: get().stitch + 1,
		panel: "loom"
	}),
	setZone: (zone) => set({
		zone,
		stitch: get().stitch + 1
	}),
	setField: (k, v) => set({ [k]: v }),
	openReserve: () => set({ panel: "reserve" }),
	backToLoom: () => set({ panel: "loom" }),
	submit: () => {
		const s = get();
		const row = {
			name: s.name.trim() || "بی‌نام",
			handle: s.handle.trim(),
			note: s.note.trim(),
			motif: s.motif,
			zone: s.zone,
			at: (/* @__PURE__ */ new Date()).toISOString()
		};
		try {
			const prev = JSON.parse(localStorage.getItem(KEY) || "[]");
			localStorage.setItem(KEY, JSON.stringify([row, ...prev].slice(0, 20)));
		} catch {}
		set({ panel: "done" });
	}
}));
var ZONE_POS = {
	collar: [
		.2,
		.78,
		.2
	],
	nape: [
		0,
		1.05,
		-.12
	],
	rib: [
		.32,
		.22,
		.14
	],
	wrist: [
		.58,
		.02,
		.26
	],
	ankle: [
		.16,
		-1.12,
		.2
	]
};
function Dust() {
	const ref = (0, import_react.useRef)(null);
	const geo = (0, import_react.useMemo)(() => {
		const g = new BufferGeometry();
		const n = 160;
		const arr = /* @__PURE__ */ new Float32Array(480);
		for (let i = 0; i < n; i++) {
			const a = Math.random() * Math.PI * 2;
			const r = .7 + Math.random() * 1.5;
			arr[i * 3] = Math.cos(a) * r;
			arr[i * 3 + 1] = (Math.random() - .5) * 3.1;
			arr[i * 3 + 2] = Math.sin(a) * r;
		}
		g.setAttribute("position", new BufferAttribute(arr, 3));
		return g;
	}, []);
	useFrame((_, dt) => {
		if (ref.current) ref.current.rotation.y += dt * .035;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("points", {
		ref,
		geometry: geo,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointsMaterial", {
			color: "#c4a265",
			size: .012,
			transparent: true,
			opacity: .5,
			sizeAttenuation: true
		})
	});
}
function DressForm() {
	const geo = (0, import_react.useMemo)(() => {
		const pts = [
			new Vector2(.01, -1.45),
			new Vector2(.16, -1.4),
			new Vector2(.2, -1.05),
			new Vector2(.28, -.55),
			new Vector2(.22, -.05),
			new Vector2(.16, .28),
			new Vector2(.27, .58),
			new Vector2(.2, .86),
			new Vector2(.08, 1.08),
			new Vector2(.045, 1.28)
		];
		return new LatheGeometry(pts, 48);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry: geo,
		castShadow: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#fff6ec",
			roughness: .42,
			metalness: .06
		})
	});
}
function InkLine({ zone }) {
	const motif = useAtelier((s) => s.motif);
	const stitch = useAtelier((s) => s.stitch);
	const line = (0, import_react.useMemo)(() => {
		const geo = lineFrom(motif);
		const mat = new LineBasicMaterial({ color: "#6e2e32" });
		const l = new Line(geo, mat);
		l.scale.set(2.6, 2.6, 2.6);
		l.geometry.setDrawRange(0, 2);
		return l;
	}, [motif, stitch]);
	(0, import_react.useEffect)(() => {
		const count = line.geometry.getAttribute("position").count;
		let raf = 0;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) line.geometry.setDrawRange(0, count);
		else {
			const start = performance.now();
			const tick = (now) => {
				const t = Math.min(1, (now - start) / 1200);
				const eased = 1 - Math.pow(1 - t, 3);
				line.geometry.setDrawRange(0, Math.max(2, Math.floor(eased * count)));
				if (t < 1) raf = requestAnimationFrame(tick);
			};
			raf = requestAnimationFrame(tick);
		}
		return () => cancelAnimationFrame(raf);
	}, [line]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("primitive", {
		object: line,
		position: ZONE_POS[zone]
	});
}
function Pearls() {
	const zone = useAtelier((s) => s.zone);
	const setZone = useAtelier((s) => s.setZone);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: Object.keys(ZONE_POS).map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: ZONE_POS[z],
		onClick: (e) => {
			e.stopPropagation();
			setZone(z);
		},
		onPointerOver: () => {
			document.body.style.cursor = "pointer";
		},
		onPointerOut: () => {
			document.body.style.cursor = "";
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			z === zone ? .035 : .028,
			16,
			16
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: z === zone ? "#6e2e32" : "#c4a265",
			emissive: z === zone ? "#6e2e32" : "#000000",
			emissiveIntensity: .35,
			roughness: .35,
			metalness: .4
		})]
	}, z)) });
}
function Rig() {
	const controls = (0, import_react.useRef)(null);
	const idle = (0, import_react.useRef)(true);
	(0, import_react.useEffect)(() => {
		const stop = () => {
			idle.current = false;
		};
		window.addEventListener("pointerdown", stop, { once: true });
		return () => window.removeEventListener("pointerdown", stop);
	}, []);
	useFrame((_, dt) => {
		const c = controls.current;
		if (!c || !idle.current) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		c.setAzimuthalAngle(c.getAzimuthalAngle() + dt * .15);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
		ref: controls,
		enablePan: false,
		minDistance: 2.2,
		maxDistance: 5.2,
		minPolarAngle: .75,
		maxPolarAngle: 1.55,
		target: [
			0,
			.15,
			0
		]
	});
}
function World() {
	const zone = useAtelier((s) => s.zone);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
			attach: "background",
			args: ["#14110f"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fog", {
			attach: "fog",
			args: [
				"#14110f",
				4.5,
				9
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .38 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				2.4,
				3.2,
				2
			],
			intensity: 1.4,
			color: "#fff4e6"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				-1.6,
				1.2,
				-1
			],
			intensity: 5,
			color: "#c4897c",
			distance: 6
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("spotLight", {
			position: [
				0,
				3.4,
				1.2
			],
			angle: .5,
			penumbra: .85,
			intensity: 10,
			color: "#f4ebdf"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Float, {
			speed: 1.1,
			rotationIntensity: .04,
			floatIntensity: .12,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DressForm, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						1.48,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						.16,
						32,
						24
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#f3e9dc",
						roughness: .48,
						metalness: .02
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pearls, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InkLine, { zone })
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dust, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				-1.5,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [3.2, 48] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#1c1816",
				roughness: .92
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactShadows, {
			position: [
				0,
				-1.49,
				0
			],
			opacity: .42,
			scale: 6,
			blur: 2.4,
			far: 3
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rig, {})
	] });
}
function AtelierScene() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
		camera: {
			position: [
				.95,
				.35,
				2.15
			],
			fov: 34
		},
		dpr: [1, 1.6],
		gl: { antialias: true },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(World, {})
	});
}
function Dock() {
	const motif = useAtelier((s) => s.motif);
	const zone = useAtelier((s) => s.zone);
	const panel = useAtelier((s) => s.panel);
	const name = useAtelier((s) => s.name);
	const handle = useAtelier((s) => s.handle);
	const note = useAtelier((s) => s.note);
	const setMotif = useAtelier((s) => s.setMotif);
	const setZone = useAtelier((s) => s.setZone);
	const setField = useAtelier((s) => s.setField);
	const openReserve = useAtelier((s) => s.openReserve);
	const backToLoom = useAtelier((s) => s.backToLoom);
	const submit = useAtelier((s) => s.submit);
	const zoneMeta = ZONES.find((z) => z.id === zone);
	const motifMeta = MOTIFS.find((m) => m.id === motif);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "pointer-events-auto max-h-80 w-full max-w-xl overflow-y-auto rounded-3xl border border-gold/30 bg-veil/80 p-4 text-paper shadow-2xl backdrop-blur-md sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-3 flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-sm tracking-[0.28em] text-gold",
					children: "MEHRKHAT"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-medium leading-tight",
					children: "مهرخط"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-40 text-left text-xs leading-relaxed text-mist",
					children: zoneMeta.whisper
				})]
			}),
			panel === "loom" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm leading-relaxed text-paper/90",
					children: "فرم را بچرخان. یک نقطهٔ طلایی را لمس کن، بعد نقش را انتخاب کن تا خط، زنده روی پوست کشیده شود."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-3 flex flex-wrap gap-2",
					children: ZONES.map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setZone(z.id),
						className: "min-h-11 rounded-full border px-3 text-sm " + (zone === z.id ? "border-blush bg-blush text-ink" : "border-gold/40 bg-transparent text-paper"),
						children: z.fa
					}, z.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-4 grid grid-cols-5 gap-2",
					children: MOTIFS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setMotif(m.id),
						className: "flex min-h-14 flex-col items-center justify-center rounded-2xl border text-xs " + (motif === m.id ? "border-gold bg-gold/15 text-gold" : "border-paper/15 text-mist"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MotifGlyph, { id: m.id }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1",
							children: m.fa
						})]
					}, m.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: openReserve,
					className: "min-h-12 w-full rounded-full bg-paper text-sm font-medium text-ink",
					children: "این نقش را برای جلسه نگه دار"
				})
			] }),
			panel === "reserve" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-3",
				onSubmit: (e) => {
					e.preventDefault();
					submit();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-mist",
						children: [
							motifMeta.fa,
							" روی ",
							zoneMeta.fa,
							". جلسه خصوصی است؛ فقط خانم‌ها، فقط فاین‌لاین."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs text-mist",
						children: ["نام", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							value: name,
							onChange: (e) => setField("name", e.target.value),
							className: "mt-1 min-h-11 w-full rounded-xl border border-gold/30 bg-ink px-3 text-sm text-paper outline-none"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs text-mist",
						children: ["اینستاگرام", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: handle,
							onChange: (e) => setField("handle", e.target.value),
							placeholder: "@username",
							className: "mt-1 min-h-11 w-full rounded-xl border border-gold/30 bg-ink px-3 text-sm text-paper outline-none"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs text-mist",
						children: ["این خط باید چه حسی داشته باشد؟", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: note,
							onChange: (e) => setField("note", e.target.value),
							rows: 3,
							className: "mt-1 w-full rounded-xl border border-gold/30 bg-ink px-3 py-2 text-sm text-paper outline-none"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: backToLoom,
							className: "min-h-12 flex-1 rounded-full border border-gold/40 text-sm",
							children: "برگشت"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "min-h-12 flex-1 rounded-full bg-blush text-sm font-medium text-ink",
							children: "درخواست جلسه"
						})]
					})
				]
			}),
			panel === "done" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl text-gold",
						children: "نگه داشته شد."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm leading-relaxed",
						children: [
							name || "تو",
							"، نقش ",
							motifMeta.fa,
							" روی ",
							zoneMeta.fa,
							" در دفتر آتلیه نشست. این یک پیش‌نویس خصوصی است تا روز جلسه."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: backToLoom,
						className: "mt-4 min-h-12 w-full rounded-full bg-paper text-sm text-ink",
						children: "یک نقش دیگر"
					})
				]
			})
		]
	});
}
function MotifGlyph({ id }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className: "h-5 w-5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: id === "bloom" ? "M12 13c2-4 6-4 6 0s-4 5-6 5-6-1-6-5 4-4 6 0z" : id === "moon" ? "M14 6a6 6 0 1 0 4 10 5 5 0 1 1-4-10z" : id === "vine" ? "M12 18c0-4 2-5 2-8a3 3 0 1 0-3 3c2 0 3-1 4-3" : id === "seed" ? "M12 6c3 3 3 9 0 12-3-3-3-9 0-12z" : "M4 13c2-3 4 3 6 0s4 3 6 0 4 3 4 0",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.2",
			className: "stitch-line"
		})
	});
}
function AtelierClient() {
	const entered = useAtelier((s) => s.entered);
	const enter = useAtelier((s) => s.enter);
	const [booting] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative h-dvh w-full overflow-hidden bg-ink text-paper",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0",
				children: entered && !booting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AtelierScene, {}) : null
			}),
			!entered && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex items-center justify-center px-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-md text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-sm tracking-[0.35em] text-gold",
							children: "ATELIER"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 font-display text-6xl leading-none text-paper",
							children: "مهرخط"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-4 max-w-sm text-sm leading-7 text-mist",
							children: "اینجا تتو فروخته نمی‌شود. یک خط ظریف، روی پوست یک زن، توسط یک زن طراحی می‌شود. فرم را بچرخان و ببین خط چطور متولد می‌شود."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: enter,
							className: "mt-8 min-h-12 rounded-full bg-paper px-8 text-sm font-medium text-ink",
							children: "وارد اتاقِ خط شو"
						})
					]
				})
			}),
			entered && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-x-0 bottom-0 flex justify-center p-3 sm:p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dock, {})
			})
		]
	});
}
//#endregion
export { AtelierClient };
