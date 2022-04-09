export function removeLayer(map, id) {
  try {
    map.getLayer(id) && map.removeLayer(id)
  } catch (err) {
    
  }
}

export function removeImage(map, id) {
  try {
    map.hasImage(id) && map.removeImage(id)
  } catch (err) {
    
  }
}

export function removeSource(map, id) {
  try {
    map.getSource(id) && map.removeSource(id)
  } catch (err) {
    
  }
}
