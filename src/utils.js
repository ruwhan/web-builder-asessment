export const mapSavedPages = (slice) => {
  return slice.entities.ids.map((id) => {
    return slice.entities.byId[id];
  });
}

export const findSavedPages = (id, entities) => {
  return entities.byId[id];
}

/**
 * Generate random id when user click `create new`.
 * 
 * @returns {String}
 */
export const generateRandomId = () => {
  return Math.round(new Date().getTime() * Math.random()).toString();
}
