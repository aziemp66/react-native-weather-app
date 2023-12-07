export interface GetCurrentWeather {
	current: {
		temperature : number
		weather_descriptions: string[]
	},
	location: {
		name: string
		country: string
		region:string
		localtime:string
	}
}