import { derived, writable } from "svelte/store";
export const storeA = writable(5);
export const storeB = writable(10);

export const suma = derived(
    [storeA, storeB],
    ([$storeA , $storeB]) => $storeA + $storeB
)