import { useState, useEffect } from "react";

function getWindowDimensions() {
	if (typeof window !== "undefined") {
		const { innerWidth: width } = window;
		return width;
	}
	return 0;
}

export default function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
}
