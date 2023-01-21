import React, { useState } from 'react';
import { useEffect } from 'react';
import { DateTime } from 'luxon';


const App = function () {

    const [fooState, setFooState] = useState('');

    window.electronAPI.dirname().then((result) => setFooState(result));
    
    const nowtime = DateTime.now().toLocaleString();
    return (<div><p>Hello from React! {nowtime}</p><p>{fooState}</p></div>)

}

export default App