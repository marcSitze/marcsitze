type ID = string | number;

export type ISocialLink = {
	id?: ID;
	link: string;
	name?: string;
};

export type IService = {
	id?: ID;
	title: string;
	description: string;
};

export type IServicePackage = {
	id: string;
	title: string;
	tagline: string;
	deliverables: string[];
	bestFor: string;
	badge: string;
	icon?: string;
};

export type IUser = {
	title: string;
	description: string;
	name: string;
	cvLink?: string;
};

export type ISkills = string;

export enum MAIN_TYPE {
	EDUCATION = "EDUCATION",
	EXPERIENCE = "EXPERIENCE",
}

export type IResume = {
	id?: ID;
	mainType: MAIN_TYPE;
	title: string;
	place: string;
	link?: string;
	logo?: string;
	yearStart?: string;
	yearEnd?: string;
	description: string;
};

export type ICertificate = {
	id?: ID;
	title: string;
	abrev: string;
	logo?: string;
	yearStart?: string;
	yearEnd?: string;
	link: string;
};

export enum PROJECT_TYPE {
	WEB = "WEB",
	MOBILE = "MOBILE",
}

export interface IImpactMetric {
	label: string;
	value: string;
}

export interface ICaseStudy {
	id: ID;
	slug: string;
	title: string;
	client: string;
	role: string;
	period: string;
	category: "ai" | "fintech" | "marketplace" | "mobile" | "web";
	mainType: PROJECT_TYPE;
	summary: string;
	problem: string;
	solution: string;
	impactMetrics: IImpactMetric[];
	technologies: string[];
	technos: ISkills;
	thumbnail: string;
	imageLink: string[];
	liveUrl?: string;
	githubUrl?: string;
	link?: string;
	featured: boolean;
	description?: string;
}

export type IPortfolio = ICaseStudy;

export interface IProjectInquiryState {
	projectType: "ai-webapp" | "fintech-portal" | "mobile-app" | "frontend-lead" | "code-audit";
	budgetRange: "<$3k" | "$3k-$10k" | "$10k-$25k" | "$25k+";
	timeline: "immediate" | "within-month" | "exploring";
	clientName: string;
	clientEmail: string;
	description: string;
}