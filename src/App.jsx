function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>
      <h1>Hello, World!</h1>
      <p>Welcome to my React app.</p>
      <textarea
        rows={4}
        style={{ width: '400px', padding: '10px', fontSize: '16px', borderRadius: '8px', border: '1px solid #ccc', resize: 'vertical' }}
        placeholder="type here what you want this website to do and how you want it to look"
      />
    </div>
  )
}

export default App
