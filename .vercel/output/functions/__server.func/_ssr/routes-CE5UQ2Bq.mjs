import { i as __toESM } from "../_runtime.mjs";
import { g as require_react, h as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CE5UQ2Bq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const [View, setView] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let live = true;
		import("./Client-ChCEwgBV.mjs").then((m) => {
			if (live) setView(() => m.AtelierClient);
		});
		return () => {
			live = false;
		};
	}, []);
	if (!View) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex h-dvh items-center justify-center bg-ink text-paper",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-3xl",
			children: "مهرخط"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(View, {});
}
//#endregion
export { Home as component };
