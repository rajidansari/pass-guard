

const BASE_URI = import.meta.env.MODE === "development"
				? import.meta.env.VITE_DEV_BASE_URI
				: import.meta.env.VITE_BASE_URI


export { BASE_URI };