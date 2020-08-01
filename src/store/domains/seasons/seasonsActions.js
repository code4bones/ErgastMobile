import commonCursorActions from 'store/domains/cursor/cursorActions';

const selectSeason = (season) => {
    return async(dispatch) => {
        return dispatch({type:'SEASONS_SELECT',season})
    }
}

export default commonCursorActions(
    {
        actionName:'SEASONS',
        reducersName:'seasonsReducers',
        cursorName:'seasons'
    },
    {
        selectSeason
    }
);

