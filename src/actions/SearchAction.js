
export const updateSearch = (key, value) => ({
    type: "UPDATE_SEARCH",
    key,
    value
})

export const lastSearch = (value) => ({
    type: "LAST_SEARCH",
    value
})

export const addToLocationSelection = (value) => ({
    type: "ADD_TO_LOCATION_SELECTION",
    value
})

export const emptyLocationSelection = () => ({
    type: "EMPTY_LOCATION_SELECTION"
})

export const setLocationValue = (name, nis) => ({
    type: "SET_LOCATION_VALUE",
    name,
    nis
})

export const removeFromLocationSelection = (id) => ({
    type: "REMOVE_FROM_LOCATION_SELECTION",
    id
})
export const updateAsCateogy = (value) => ({
    type: "UPDATE_AS_CATEGORY",
    value
})
export const updateCategory = (value) => ({
    type: "UPDATE_CATEGORY",
    value
})

export const updateFilter = (value) => ({
    type: 'UPDATE_FILTER',
    value
})

export const setFirstMunicipality = (value) => ({
    type: 'SET_FIRST_MUNICIPALITY',
    value
})