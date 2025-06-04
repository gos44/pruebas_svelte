const greetings = {
	en: 'hello!',
	de: 'hallo!',
	fr: 'bonjour!'
};

type Lang = keyof typeof greetings;

export function load({ params }: { params: { lang?: string } }) {
    const lang = (params.lang && ['en', 'de', 'fr'].includes(params.lang))
        ? params.lang as Lang
        : 'en';
    return {
        greeting: greetings[lang]
    };
}