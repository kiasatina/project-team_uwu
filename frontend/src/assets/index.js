export { default as logo } from './logo.png';
export { default as placeholder } from './placeholder.gif';
export const stickers = importAll(
    require.context('./stickers/', false, /\.(png|jpe?g|svg)$/),
);

function importAll(r) {
    return r.keys().map(r);
}
