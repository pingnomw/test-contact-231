import { useEffect, useState } from 'react';
import './App.css';
import { Contact } from './contactUtils';

function App() {
  const [contactsList, setContactsList] = useState<Contact[]>([])

  useEffect(() => {
    
  }, [])

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
