/**
 * @description simple queue operation, and sync to async storage with designated key
 */
import { loadData, removeData } from './Storage';
import encryptedStorage from './encrypted-storage';
import { head, tail, append } from 'ramda';
/**
 * @param {() => boolean} check
 * @returns
 */

const waitUntil = async check => {
  let round = 0;
  return new Promise(resolve => {
    const timeout = () => {
      round++;
      setTimeout(() => {
        if (check() || round >= 20) {
          resolve();
          return;
        } else {
          timeout();
        }
      }, 300);
    };

    timeout();
  });
};
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


export class QueueStorage {
  constructor({
    key
  }) {
    /** @type {string} */
    this.storageKey = key;
    /** @type {T[]} */

    this.queue = [];
    /** @type {boolean | null | undefined} */

    this.initialized = null; // null -> not start yet, undefined -> in progress, true -> finished
  }
  /**
   * @private
   */


  async syncToStorage() {
    if (this.initialized === null) return;

    if (typeof this.initialized === 'undefined') {
      await waitUntil(() => this.initialized === true);
    }

    try {
      await encryptedStorage.setItemT(this.storageKey, this.queue);
    } catch (err) {
      console.log('##### syncToStorage error, err', err);
    }
  }
  /**
   * @private
   */


  async migration() {
    const queuedElements = await loadData(this.storageKey);

    if (!queuedElements || !queuedElements.length) {
      // console.log('### no data in', this.storageKey)
      return;
    }

    await encryptedStorage.setItemT(this.storageKey, queuedElements);
    await removeData(this.storageKey);
  }
  /**
   * @public
   */


  async initialize() {
    // only initialize once
    if (this.initialized === true) return;

    if (typeof this.initialized === 'undefined') {
      return waitUntil(() => this.initialized === true);
    }

    this.initialized = undefined;
    await this.migration();
    const queuedElements = await encryptedStorage.getItemT(this.storageKey, []);
    this.queue = queuedElements.concat(this.queue);
    this.initialized = true;
    await this.syncToStorage();
  }

  async clear() {
    this.queue = [];
    await this.syncToStorage();
  }
  /**
   * @returns {T[]}
   */


  getAll() {
    return this.queue;
  }
  /**
   * get the first element of the queue
   * @returns {T|undefined}
   */


  front() {
    return head(this.queue);
  }
  /**
   * adding element(s) to the back of the queue
   * @param {T|[T]} element
   */


  enqueue(element) {
    // if element is an array, use array concat, otherwise, use append
    if (Array.isArray(element)) {
      this.queue = this.queue.concat(element);
    } else {
      this.queue = append(element, this.queue);
    }

    this.syncToStorage();
  }
  /**
   * remove an element from the front of the queue
   * @returns {T|undefined}
   */


  dequeue() {
    const firstElement = head(this.queue);
    this.queue = tail(this.queue);
    this.syncToStorage();
    return firstElement;
  }

}
export default QueueStorage;
//# sourceMappingURL=QueueStorage.js.map