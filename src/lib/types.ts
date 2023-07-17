const enum Status {
	Idle,
	Loading,
	Success,
	Error,
	Invalid,
	CustomShortExists,
	CustomShortIsSomethingElse
}

type Mode = 'simple' | 'advanced';

export { Status, type Mode };
