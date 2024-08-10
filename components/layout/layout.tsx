export default function Layout ({ children }) {
  return (
    <>
      <main>
        {children}
      </main>
      <footer style={{ '--index': 6 }} data-blur-in-animation>
        <div className='flex justify-between items-center text-sm mx-auto h-full color-sub'>
          <div>Be the goat ツ</div>
        </div>
      </footer>
    </>
  )
}
