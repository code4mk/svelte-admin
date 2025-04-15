import { writable } from 'svelte/store';

export const isAuthenticated = writable(false);

// Helper functions to manage authentication state
export const auth = {
    login() {
        isAuthenticated.set(true);
    },
    logout() {
        isAuthenticated.set(false);
    },
    check() {
        let authenticated = false;
        isAuthenticated.subscribe(value => {
            authenticated = value;
        })();
        return authenticated;
    }
}; 