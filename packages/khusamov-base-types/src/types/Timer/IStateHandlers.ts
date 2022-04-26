/**
 * Карта скриптов по состояниям таймера.
 */
export default interface IStateHandlers<R> {
	started?: () => R
	paused?: () => R
	stopped?: () => R
}