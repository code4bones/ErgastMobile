import React, { Component } from 'react';
import {Subject,ReplaySubject} from 'rxjs';

//import {} from './Cursors';

export const AppContext = React.createContext({});

class AppContextProvider extends Component {

    state = {
        //
    }

    componentDidMount () {
        
    }

    updateCache = (cursorObj) => {
        /*
         use sqlite or whatever
        */
       console.log("Updating cache for",cursorObj.api,cursorObj.result.items.length)
    }

    cacheExists = (cursorObj) => {
        console.log("Lookup cache for",cursorObj.api,cursorObj.cursor)
        return false;
    }
    
    lookupCache = (cursorObj) => {
        if ( !this.cacheExists(cursorObj) )
            return false;
        cursorObj.subj.next({cursor:cursorObj.cursor,items:[]});
        return true;
    }

    render () {
        return (
            <AppContext.Provider
                value={{
                     updateCache:this.updateCache
                    ,lookupCache:this.lookupCache                    
                }}>
                {this.props.children}
            </AppContext.Provider>
        )
    }    
}

export const withAppContext = ChildComponent => props => (
    <AppContext.Consumer>
        {context => <ChildComponent app={context} {...props} />}
    </AppContext.Consumer>
)

export const withAppContextProvider = ChildComponent => props => {
    return (
        <AppContextProvider {...props} >
            <ChildComponent {...props} />
        </AppContextProvider>
    );
}