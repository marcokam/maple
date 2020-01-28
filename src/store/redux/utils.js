export function normalizeById(entities = []) {
    const ids = entities.map(e => e.id);
    const byId = entities.reduce((acc, entity) => {
        acc[entity.id] = entity;
        return acc;
    }, {});
    return { ids, byId };
};

export function denormalizeById({ ids = [], byId = {} }) {
    return ids.map(id => byId[id] || {});
};