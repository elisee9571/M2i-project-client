function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}

export function stringAvatar(name) {
    const initials = name
        .split(' ')
        .map((part) => part[0].toUpperCase())
        .join('');

    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: initials,
    };
}

export function stringAvatarSquare(name) {
    const initials = name
        .split(' ')
        .map((part) => part[0].toUpperCase())
        .join('');

    return {
        sx: {
            width: 100,
            height: 100,
            borderRadius: "5px",
            mr: 3,
            bgcolor: stringToColor(name),
            fontSize: "36px"
        },
        children: initials,
    };
}