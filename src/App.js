import { useEffect, useRef, useState } from 'react';

const data = [
  {
    id: 1,
    title: "test 1"
  },
  {
    id: 2,
    title: "Test 2"
  },
  {
    id: 3,
    title: "deneme 1"
  },
  {
    id: 4,
    title: "Deneme 2"
  }
]

function App() {
  const [search, setSearch] = useState('')
  const [result, setResult] = useState(false)
  const searchRef = useRef()

  const isTyping = search.replace(/\s+/, '').length > 0;

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return  () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)){
      setSearch('')
    }
  }

  useEffect(() => {
    if (isTyping) {
      const filteredResult = data.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
      setResult(filteredResult.length > 0 ? filteredResult : false)
    } else {
      setResult(false)
    }
  }, [search])

  return (
    <>
      <div className='search' ref={searchRef}>
        <input placeholder='bir seyler ara...' value={search} className={isTyping ? 'typing' : null} type='text' onChange={(e) => setSearch(e.target.value)}/> 
        {isTyping && (
          <div className='search-result'>
            {result && result.map(item => (
              <div key={item.id} className='search-result-item'>
                {item.title}
              </div>
            ))}
            {!result && (
              <div className='result-not-found'>
                "{search}" ile ilgili bir şey bulunamadı
              </div>
            )}
          </div>
        )}    
      </div>
    </>
  );
}

export default App;
