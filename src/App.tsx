export default function App() {
  return <main className="w-screen h-screen p-5">
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-2xl font-bold p-2">YTM Remote</h1>
      <p className="text-lg bg-yellow-200 border border-yellow-500 p-2 rounded-md">title of the song</p>
      <span className="flex flex-row gap-2 justify-center">
        <button className="bg-gray-200 border border-gray-500 p-2 rounded-md">
          previous
        </button>
        <button className="bg-gray-200 border border-gray-500 p-2 rounded-md">
          play/pause
        </button>
        <button className="bg-gray-200 border border-gray-500 p-2 rounded-md">
          next
        </button>
      </span>
    </div>
  </main>
}