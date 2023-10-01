export default function getBackgroundColor(color: string) {
    switch (color) {
        case 'yellow':
            return 'bg-yellow-300';
        case 'pink':
            return 'bg-pink-300';
        case 'red':
            return 'bg-red-300';
        case 'purple':
            return 'bg-purple-300';
        case 'gray':
            return 'bg-gray-300';
        case 'orange':
            return 'bg-orange-300';
        default:
            return '';
    }
}
