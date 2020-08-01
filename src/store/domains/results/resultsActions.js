import commonCursorActions from 'store/domains/cursor/cursorActions';

const makeSections = (items) => {
        return items.map (race => ({
                    title:`${race.raceName} ${race.date}`,
                    data:race.QualifyingResults
                })
            );
    }

const resultsActions = commonCursorActions(
    {
        actionName:'RESULTS',
        reducersName:'resultsReducers',
        cursorName:'results',
        transformCursor:makeSections
    });

export default resultsActions;
