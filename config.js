export const config = {
    apiKey: "AIzaSyASHzxnfJ5L4nLTQrsV0B76aVgF1aYP1gY",
    authDomain: "calendar-2238b.firebaseapp.com",
    databaseURL: "https://calendar-2238b.firebaseio.com",
    projectId: "calendar-2238b",
    storageBucket: "calendar-2238b.appspot.com",
    messagingSenderId: "938607542697"
};

/**
 * this is a simple hash function for password
 * @param {*} str 
 */
export function hashCode(str){
    var hash = 0;
    if (str.length === 0) return hash;
    for (var i = 0; i < str.length; i++) {
        var character  = str.charCodeAt(i);
        hash  = ((hash<<5)-hash)+character;
        hash = hash & hash; 
    }
    return hash;
}
