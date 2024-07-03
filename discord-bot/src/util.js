export const parse = (val, all) => {
    val = val.replaceAll(',', '');
    if (val === 'all' && all) val = all;
    if (val.toLowerCase().includes('k') || val.toLowerCase().includes('m')) {
        let multiplier = val.toString().substr(-1).toLowerCase();
        val = parseFloat(val) * (multiplier === 'k' ? 1000 : (multiplier === 'm' ? 1000000 : 1));
    };
    if (isNaN(val)) val = 0;
    val = Math.round(val);
    return val;
}

export const getUser = async (client, id) => {
    try {
        let cached = client.users.cache.get(id);
        if (cached) return cached;
        return await client.users.fetch(id);
    } catch {
        try {
            return await client.users.fetch(id);
        } catch {
            return null
        }
    }
}

export const getChannel = async (client, id) => {
    try {
        let cached = client.channels.cache.get(id);
        if (cached) return cached;
        return await client.channels.fetch(id);
    } catch {
        try {
            return await client.channels.fetch(id);
        } catch {
            return null
        }
    }
}

export const relativeTime = (dateNumber, prefix = true) => {
    let date = new Date(dateNumber);
    let now = new Date();
    let diff = date - now;
    let inFuture = false;
    let timeUnits = {
        year: 31536000000,
        month: 2592000000,
        day: 86400000,
        hour: 3600000,
        minute: 60000,
        second: 1000
    };

    if (diff < 0) diff = -diff;
    else inFuture = true;

    for (let unit in timeUnits) {
        if (diff >= timeUnits[unit]) {
            let count = Math.floor(diff / timeUnits[unit]);
            return `${inFuture && prefix ? 'in ' : ''}${count} ${unit}${count > 1 ? 's' : ''}${!inFuture ? ' ago' : ''}`;
        }
    }

    return 'right now';
}

export const parseEnv = (name) =>
    process.env[name].slice(1, -1).match(/'([a-zA-Z0-9]+)'/g).map(res => res.slice(1, -1));