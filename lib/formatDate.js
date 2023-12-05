export default function formatDate(isoDate) {
    const date = new Date(isoDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const newDateFormat = date.toLocaleDateString('en-US', options);
    return newDateFormat;
}