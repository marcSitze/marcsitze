type ID = string | number;

export type ISocialLink = {
	id?: ID,
	link: string,
	name?: string
}

export type IService = {
	id?: ID;
	title: string;
	description: string;
}

export type IUser = {
	title: string,
	description: string,
	name: string,
	cvLink?: string
}

export type ISkills = string

export enum MAIN_TYPE {
	EDUCATION = "EDUCATION",
	EXPERIENCE = "EXPERIENCE"
}

export type IResume = {
	id?: ID,
	mainType: MAIN_TYPE,
	title: string,
	place: string,
	link?: string,
	yearStart?: string,
	yearEnd?: string,
	description: string
}

export type ICertificate = {
	id?: ID,
	title: string,
	abrev: string,
	yearStart?: string,
	yearEnd?: string,
	link: string
}

export enum PROJECT_TYPE {
	WEB = "WEB",
	MOBILE = "MOBILE"
}
export type IPortfolio = {
	id?: ID,
	title: string,
	mainType: PROJECT_TYPE,
	link?: string,
	imageLink: string[],
	technos: ISkills,
	description?: string
}