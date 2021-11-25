export var __esModule: boolean;
export default _default;
/**
 * @example
 *     const basicTextQueue = new QueueStorage({ key: 'Storage-basic-text'})
 *     basicTextQueue.enqueue('a')  // queue: ['a']
 *     basicTextQueue.front() // => 'a'
 *     basicTextQueue.enqueue('b') // queue: ['a', 'b']
 *     basicTextQueue.enqueue(['c', 'd']) // queue: ['a', 'b', 'c', 'd']
 *     basicTextQueue.front() // => 'a'
 *
 *     basicTextQueue.dequeue()  // queue: ['b', 'c', 'd']
 *     basicTextQueue.front() // => 'b'
 * @template T
 */
export class QueueStorage<T> {
    constructor({ key }: {
        key: any;
    });
    /** @type {string} */
    storageKey: string;
    /** @type {T[]} */
    queue: T[];
    /** @type {boolean | null | undefined} */
    initialized: boolean | null | undefined;
    /**
     * @private
     */
    private syncToStorage;
    /**
     * @private
     */
    private migration;
    /**
     * @public
     */
    public initialize(): Promise<any>;
    clear(): Promise<void>;
    /**
     * @returns {T[]}
     */
    getAll(): T[];
    /**
     * get the first element of the queue
     * @returns {T|undefined}
     */
    front(): T | undefined;
    /**
     * adding element(s) to the back of the queue
     * @param {T|[T]} element
     */
    enqueue(element: T | [T]): void;
    /**
     * remove an element from the front of the queue
     * @returns {T|undefined}
     */
    dequeue(): T | undefined;
}
declare var _default: typeof QueueStorage;
