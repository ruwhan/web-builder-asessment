export const mapSavedPages = (slice) => {
  return slice.entities.ids.map((id) => {
    return slice.entities.byId[id];
  });
}

export const findSavedPages = (id, entities) => {
  return entities.byId[id];
}
