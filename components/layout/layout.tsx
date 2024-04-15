export default function Layout ({ children }) {
  return (
    <>
      <main>
        {children}
      </main>
      <footer>
        <div className='flex justify-between items-center text-sm mx-auto h-full w-[640px] color-sub'>
          <div>Find flow.</div>
          <div>2024</div>
        </div>
      </footer>
    </>
  )
}
