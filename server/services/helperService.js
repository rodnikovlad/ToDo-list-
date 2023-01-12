class HelperService {
    itContains(pool, contains) {
        for (const el of contains)
            if (!pool[el]) return {
                result: false,
                field: el
            };
        return { result: true };
    }
}

module.exports = new HelperService();